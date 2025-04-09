import { Router } from 'express';
import { AssessmentResult, UserInfo } from '../../types/assessment';
import PDFDocument from 'pdfkit';

const router = Router();

router.post('/download-pdf', async (req, res) => {
  try {
    console.log('Received PDF download request');
    const { results, userInfo } = req.body;
    console.log('Results:', results);
    console.log('UserInfo:', userInfo);
    
    // Create a PDF document
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=it-health-check-${userInfo.company}.pdf`);
    
    // Pipe the PDF directly to the response
    doc.pipe(res);
    
    // Add content to the PDF
    doc.fontSize(20).text('IT Health Check Results', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`For: ${userInfo.company}`);
    doc.moveDown();
    
    // Overall Score
    doc.fontSize(14).text('Overall Score:');
    doc.fontSize(24).text(`${results.overallScore}%`);
    doc.moveDown();
    
    // Maturity Level
    doc.fontSize(14).text('Maturity Level:');
    doc.fontSize(16).text(results.maturityLevel);
    doc.fontSize(12).text(results.maturityDescription);
    doc.moveDown();
    
    // Category Scores
    doc.fontSize(14).text('Category Scores:');
    results.categoryScores.forEach(category => {
      doc.fontSize(12).text(`${category.category}: ${category.percentage}%`);
    });
    
    // Finalize the PDF
    doc.end();
    console.log('PDF generation completed');
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  }
});

export default router;