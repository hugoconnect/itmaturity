// server/src/routes/assessment.ts (v9: right-align title, space, uppercase company, format percent)
import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { AssessmentResult, UserInfo } from '../../types/assessment';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { getActionItems, getCategoryName } from '/workspaces/itmaturity/src/utils/assessmentUtils';

const router = Router();

const downloadPdfHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('received pdf download request (using template)');
    const { results, userInfo } = req.body;

    if (!results || !userInfo) {
      console.error('missing results or user info in request body');
      res.status(400).json({ error: 'missing results or user info in request body' });
      return;
    }

    const templatePath = '/workspaces/itmaturity/server/healthcheckresultstemplate.pdf';
    console.log(`loading template from: ${templatePath}`);

    if (!fs.existsSync(templatePath)) {
      console.error(`template file not found at: ${templatePath}`);
      res.status(500).json({ error: 'pdf template file not found on server.' });
      return;
    }

    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    // --- coordinates and drawing settings (adjust as needed!) ---
    const xMargin = 72; // left margin
    const rightMargin = xMargin; // symmetric right margin
    let currentY = height - 120; // initial y position
    const lineSpacing = 18;
    const paragraphSpacing = 28; // slightly increased paragraph spacing
    const titleSize = 20;
    const headingSize = 14;
    const subHeadingSize = 12;
    const bodySize = 10;
    const listIndent = 15;
    const hugoBlue = rgb(14 / 255, 134 / 255, 153 / 255);
    const hugoGray = rgb(0.3, 0.3, 0.3);
    const black = rgb(0, 0, 0);

    // --- main title (right aligned) ---
    const titleText = 'it health check self-assessment results';
    const titleWidth = helveticaBoldFont.widthOfTextAtSize(titleText, titleSize);
    const titleX = width - rightMargin - titleWidth; // calculate x for right alignment
    firstPage.drawText(titleText, {
      x: titleX, // <--- use calculated x
      y: currentY,
      size: titleSize,
      font: helveticaBoldFont,
      color: hugoBlue,
    });
    currentY -= paragraphSpacing * 1.2; // <--- increased space below title

     // --- "report for" (uppercase company) ---
    firstPage.drawText(`report for: ${userInfo.company.toUpperCase()}`, { // <--- added .touppercase()
      x: xMargin,
      y: currentY,
      size: headingSize,
      font: helveticaBoldFont,
      color: black,
    });
    currentY -= lineSpacing;

    // --- introductory text ---
    // ... (intro text block remains the same) ...
    firstPage.drawText('this report summarizes the results of your self-assessment. it is designed to help identify', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
    currentY -= bodySize * 1.2;
     firstPage.drawText('strengths and weaknesses in your IT setup across four key areas based on your responses.', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
    currentY -= bodySize * 1.2;
     firstPage.drawText('the recommendations provided are based on common practices for the calculated maturity level.', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
    currentY -= paragraphSpacing;


    // --- draw overall score & maturity ---
    // ... (logic remains the same, spacing adjusted by variables) ...
     firstPage.drawText('overall score', { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black });
     currentY -= lineSpacing * 1.2;
     // format overall score percentage
     firstPage.drawText(`${results.overallScore.toFixed(0)}%`, { x: xMargin, y: currentY, size: titleSize + 4, font: helveticaBoldFont, color: hugoBlue });
     currentY -= paragraphSpacing * 0.8;
     firstPage.drawText(`maturity level: ${results.maturityLevel}`, { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black });
     currentY -= lineSpacing * 0.8;
     firstPage.drawText(`(${results.maturityDescription})`, { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
     currentY -= paragraphSpacing;


    // --- draw category scores (formatted) ---
    firstPage.drawText('category scores:', {
      x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black
    });
    currentY -= lineSpacing;

    if (Array.isArray(results.categoryScores)) {
       results.categoryScores.forEach(category => {
         const categoryDisplayName = getCategoryName(category.category);
         // format category percentage to 0 decimal places
         const formattedPercentage = category.percentage.toFixed(0);
         firstPage.drawText(`${categoryDisplayName}: ${formattedPercentage}%`, { // <--- use formatted percentage
           x: xMargin + listIndent, y: currentY, size: bodySize + 1, font: helveticaFont, color: black
         });
         currentY -= lineSpacing * 0.9;
       });
    } else {
       console.warn('categoryscores is not an array:', results.categoryScores);
    }
     currentY -= paragraphSpacing;


    // --- draw focus area & recommendations ---
    // ... (logic remains the same) ...
     if (results.focusArea) {
       const focusAreaName = getCategoryName(results.focusArea); const actionItems = getActionItems(results.focusArea);
       firstPage.drawText(`your focus area: ${focusAreaName}`, { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black });
       currentY -= lineSpacing * 0.8;
       firstPage.drawText('based on your answers, here are some practical next steps:', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray });
       currentY -= lineSpacing * 1.2;
       if (Array.isArray(actionItems)) {
         actionItems.forEach((item, index) => {
           const maxWidth = width - xMargin - rightMargin; const words = item.split(' '); let line = '';
           firstPage.drawText(`${index + 1}. `, { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: black });
           for (const word of words) {
              const testLine = line + (line ? ' ' : '') + word; const textWidth = helveticaFont.widthOfTextAtSize(testLine, bodySize);
              if (textWidth > maxWidth - listIndent) { // check against full width minus margins minus indent
                firstPage.drawText(line, { x: xMargin + listIndent, y: currentY, size: bodySize, font: helveticaFont, color: black }); currentY -= bodySize * 1.2; line = word;
              } else { line = testLine; }
           }
           firstPage.drawText(line, { x: xMargin + listIndent, y: currentY, size: bodySize, font: helveticaFont, color: black });
           currentY -= lineSpacing;
         });
       }
       currentY -= paragraphSpacing;
     }

    // --- draw closing cta ---
    // ... (logic remains the same, spacing adjusted by variables) ...
     const ctaHeadingSize = bodySize + 1; const ctaBodySize = bodySize;
     firstPage.drawText('ready to improve your IT health?', { x: xMargin, y: currentY, size: ctaHeadingSize, font: helveticaBoldFont, color: hugoBlue });
     currentY -= lineSpacing * 0.9;
     const ctaText = "schedule a free consultation to discuss your results and create an action plan to start improving your business IT health by emailing hugo@hugoconnect.com or visisting our website.";
     const ctaMaxWidth = width - xMargin - rightMargin; const ctaWords = ctaText.split(' '); let ctaLine = '';
     for (const word of ctaWords) {
        const testLine = ctaLine + (ctaLine ? ' ' : '') + word; const textWidth = helveticaFont.widthOfTextAtSize(testLine, ctaBodySize);
        if (textWidth > ctaMaxWidth) {
           firstPage.drawText(ctaLine, { x: xMargin, y: currentY, size: ctaBodySize, font: helveticaFont, color: hugoGray }); currentY -= ctaBodySize * 1.2; ctaLine = word;
        } else { ctaLine = testLine; }
     }
     firstPage.drawText(ctaLine, { x: xMargin, y: currentY, size: ctaBodySize, font: helveticaFont, color: hugoGray });


    // --- finalize pdf ---
    const pdfBytes = await pdfDoc.save();

    res.setHeader('content-type', 'application/pdf');
    res.setHeader('content-disposition', `attachment; filename=it-health-check-${userInfo.company}.pdf`);
    res.send(Buffer.from(pdfBytes));

    console.log('pdf generation with template completed');

  } catch (error) {
    console.error('error generating pdf with template:', error);
    next(error);
  }
};

router.post('/download-pdf', downloadPdfHandler);

export default router;