// server/src/routes/assessment.ts (v12: explicit return after success response)
import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { AssessmentResult, UserInfo } from '../../types/assessment';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { getActionItems, getCategoryName } from '/workspaces/itmaturity/src/utils/assessmentUtils';
import { sendEmail } from '../../utils/emailSender'; // Corrected path

const router = Router();

// --- refactored pdf generation function ---
// (this function remains the same as the previous version)
async function generateResultsPdf(results: AssessmentResult, userInfo: UserInfo): Promise<Buffer> {
  const templatePath = '/workspaces/itmaturity/server/healthcheckresultstemplate.pdf';
  if (!fs.existsSync(templatePath)) { throw new Error('pdf template file not found on server.'); }
  const templateBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages(); const firstPage = pages[0]; const { width, height } = firstPage.getSize();
  const xMargin = 72; let currentY = height - 120; const lineSpacing = 18; const paragraphSpacing = 28;
  const titleSize = 20; const headingSize = 14; const subHeadingSize = 12; const bodySize = 10; const listIndent = 15;
  const hugoBlue = rgb(14 / 255, 134 / 255, 153 / 255); const hugoGray = rgb(0.3, 0.3, 0.3); const black = rgb(0, 0, 0);
  // draw content... (same as previous version)
  const titleText = 'it health check self-assessment results'; const titleWidth = helveticaBoldFont.widthOfTextAtSize(titleText, titleSize); const titleX = width - xMargin - titleWidth; firstPage.drawText(titleText, { x: titleX, y: currentY, size: titleSize, font: helveticaBoldFont, color: hugoBlue }); currentY -= paragraphSpacing * 1.2;
  firstPage.drawText(`report for: ${userInfo.company.toUpperCase()}`, { x: xMargin, y: currentY, size: headingSize, font: helveticaBoldFont, color: black }); currentY -= lineSpacing;
  firstPage.drawText('this report summarizes the results of your self-assessment. it is designed to help identify', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray }); currentY -= bodySize * 1.2; firstPage.drawText('strengths and weaknesses in your IT setup across four key areas based on your responses.', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray }); currentY -= bodySize * 1.2; firstPage.drawText('the recommendations provided are based on common practices for the calculated maturity level.', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray }); currentY -= paragraphSpacing;
  firstPage.drawText('overall score', { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black }); currentY -= lineSpacing * 1.2; firstPage.drawText(`${results.overallScore.toFixed(0)}%`, { x: xMargin, y: currentY, size: titleSize + 4, font: helveticaBoldFont, color: hugoBlue }); currentY -= paragraphSpacing * 0.8; firstPage.drawText(`maturity level: ${results.maturityLevel}`, { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black }); currentY -= lineSpacing * 0.8; firstPage.drawText(`(${results.maturityDescription})`, { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray }); currentY -= paragraphSpacing;
  firstPage.drawText('category scores:', { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black }); currentY -= lineSpacing;
  if (Array.isArray(results.categoryScores)) { results.categoryScores.forEach(category => { const categoryDisplayName = getCategoryName(category.category); const formattedPercentage = category.percentage.toFixed(0); firstPage.drawText(`${categoryDisplayName}: ${formattedPercentage}%`, { x: xMargin + listIndent, y: currentY, size: bodySize + 1, font: helveticaFont, color: black }); currentY -= lineSpacing * 0.9; }); } else { console.warn('categoryscores is not an array:', results.categoryScores); } currentY -= paragraphSpacing;
  if (results.focusArea) { const focusAreaName = getCategoryName(results.focusArea); const actionItems = getActionItems(results.focusArea); firstPage.drawText(`your focus area: ${focusAreaName}`, { x: xMargin, y: currentY, size: subHeadingSize, font: helveticaBoldFont, color: black }); currentY -= lineSpacing * 0.8; firstPage.drawText('based on your answers, here are some practical next steps:', { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: hugoGray }); currentY -= lineSpacing * 1.2; if (Array.isArray(actionItems)) { actionItems.forEach((item, index) => { const maxWidth = width - xMargin - xMargin; const words = item.split(' '); let line = ''; firstPage.drawText(`${index + 1}. `, { x: xMargin, y: currentY, size: bodySize, font: helveticaFont, color: black }); for (const word of words) { const testLine = line + (line ? ' ' : '') + word; const textWidth = helveticaFont.widthOfTextAtSize(testLine, bodySize); if (textWidth > maxWidth - listIndent) { firstPage.drawText(line, { x: xMargin + listIndent, y: currentY, size: bodySize, font: helveticaFont, color: black }); currentY -= bodySize * 1.2; line = word; } else { line = testLine; } } firstPage.drawText(line, { x: xMargin + listIndent, y: currentY, size: bodySize, font: helveticaFont, color: black }); currentY -= lineSpacing; }); } currentY -= paragraphSpacing; }
  const ctaHeadingSize = bodySize + 1; const ctaBodySize = bodySize; firstPage.drawText('ready to improve your IT health?', { x: xMargin, y: currentY, size: ctaHeadingSize, font: helveticaBoldFont, color: hugoBlue }); currentY -= lineSpacing * 0.9; const ctaText = "schedule a free consultation to discuss your results and create an action plan to start improving your business IT health by emailing hugo@hugoconnect.com or visisting our website."; const ctaMaxWidth = width - xMargin - xMargin; const ctaWords = ctaText.split(' '); let ctaLine = ''; for (const word of ctaWords) { const testLine = ctaLine + (ctaLine ? ' ' : '') + word; const textWidth = helveticaFont.widthOfTextAtSize(testLine, ctaBodySize); if (textWidth > ctaMaxWidth) { firstPage.drawText(ctaLine, { x: xMargin, y: currentY, size: ctaBodySize, font: helveticaFont, color: hugoGray }); currentY -= ctaBodySize * 1.2; ctaLine = word; } else { ctaLine = testLine; } } firstPage.drawText(ctaLine, { x: xMargin, y: currentY, size: ctaBodySize, font: helveticaFont, color: hugoGray });
  // end drawing content
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

// --- /download-pdf route handler ---
const downloadPdfHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('received pdf download request');
    const { results, userInfo } = req.body;
    if (!results || !userInfo) { res.status(400).json({ error: 'missing results or user info' }); return; } // Added return

    const pdfBuffer = await generateResultsPdf(results, userInfo);

    res.setHeader('content-type', 'application/pdf');
    res.setHeader('content-disposition', `attachment; filename=it-health-check-${userInfo.company}.pdf`);
    res.send(pdfBuffer);
    console.log('pdf download sent successfully');
    // return; // Explicit return added here too for consistency

  } catch (error) { console.error('error handling pdf download request:', error); next(error); }
};

// --- /submit route handler ---
const submitAssessmentHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('received assessment submission');
    const { results, userInfo } = req.body;

    if (!results || !userInfo || !userInfo.email) {
      console.error('missing results, user info, or user email in submission');
      res.status(400).json({ error: 'missing required submission data' });
      return; // ensure exit
    }

    const pdfBuffer = await generateResultsPdf(results, userInfo);
    const pdfFilename = `it-health-check-${userInfo.company}.pdf`;

    const mailOptions = {
      to: userInfo.email,
      bcc: 'hugo@hugoconnect.com', // assuming bcc
      subject: `Your IT Health Check Results from HUGO CONNECT: ${userInfo.company}`,
      text: `dear ${userInfo.name},\n\nthank you for completing the HUGO CONNECT IT health check self-assessment.\n\nplease find your personalized results attached as a pdf.\n\nthis report outlines your current IT maturity score, category breakdowns, and provides actionable next steps based on your focus area.\n\nif you'd like to discuss these results further, feel free to schedule a free consultation by replying to this email or visiting our website.\n\nregards,\nthe HUGO CONNECT team`,
      attachments: [ { filename: pdfFilename, content: pdfBuffer, contentType: 'application/pdf' } ]
    };

    console.log(`sending results pdf to ${userInfo.email} (bcc: hugo@hugoconnect.com)`);
    await sendEmail(mailOptions); // returns promise<void>
    console.log('email sent successfully');

    res.status(200).json({ message: 'assessment submitted and email sent successfully.' });
    return; // <--- explicitly return void after sending success response

  } catch (error) {
    console.error('error handling assessment submission:', error);
    next(error); // passes control, implicitly returns void
  }
};


// register routes
router.post('/download-pdf', downloadPdfHandler);
router.post('/submit', submitAssessmentHandler);

export default router;