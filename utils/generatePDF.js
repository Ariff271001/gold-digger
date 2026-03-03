import fs from "node:fs";
import pdfDocument from "pdfkit";

export async function generatePDF(textPath, outputPath) {
  try {
    const text = fs.readFileSync(textPath, "utf8");
    const doc = new pdfDocument();
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);
    doc.fontSize(12).text(text);
    doc.end();
  } catch (error) {
    throw new Error(error);
  }
}
