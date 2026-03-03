import fs from "node:fs";
import pdfDocument from "pdfkit";
import path from "node:path";

export function generatePDF() {
    const textPath = path.join("outputs", "purchases.txt");
    const outputPath = path.join("outputs", "purchases.pdf");
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
