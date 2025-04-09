import PDFDocument from 'pdfkit';
import { AssessmentResult, UserInfo, Answer } from '../types/assessment';

interface CategoryScores {
  [key: string]: number;
}

export const generatePDF = async ({
  results,
  userInfo,
  answers,
}: {
  results: AssessmentResult;
  userInfo: UserInfo;
  answers?: Answer[];
}): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      // Collect PDF data chunks
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add content to PDF
      doc.fontSize(20).text('IT Health Check Results', { align: 'center' });
      doc.moveDown();
      
      // Company Info
      doc.fontSize(16).text(`Report for ${userInfo.company}`);
      doc.fontSize(12).text(`Generated for: ${userInfo.name}`);
      doc.moveDown();

      // Overall Score
      doc.fontSize(16).text('Overall Score');
      doc.fontSize(14).text(`${results.overallScore}%`);
      doc.moveDown();

      // Category Scores
      doc.fontSize(16).text('Category Scores');
      Object.entries(results.categoryScores).forEach(([category, score]) => {
        doc.fontSize(12).text(`${category}: ${score}%`);
      });
      doc.moveDown();

      // Recommendations
      if (results.recommendations) {
        doc.fontSize(16).text('Recommendations');
        results.recommendations.forEach((rec, index) => {
          doc.fontSize(12).text(`${index + 1}. ${rec}`);
        });
      }

      // Finalize the PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};