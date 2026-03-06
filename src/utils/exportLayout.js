import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportFullLayoutImage() {
  const canvasArea = document.querySelector(".canvas");

  if (!canvasArea) return;

  const originalHeight = canvasArea.style.height;

  // Expand canvas to capture full layout
  canvasArea.style.height = "auto";

  const canvas = await html2canvas(canvasArea, {
    scale: 2,
    useCORS: true,
    windowHeight: canvasArea.scrollHeight,
  });

  const link = document.createElement("a");

  link.download = "full-layout.png";
  link.href = canvas.toDataURL("image/png");

  link.click();

  canvasArea.style.height = originalHeight;
}

export async function exportFullLayoutPDF() {
  const canvasArea = document.querySelector(".canvas");

  if (!canvasArea) return;

  const originalHeight = canvasArea.style.height;
  canvasArea.style.height = "auto";

  const canvas = await html2canvas(canvasArea, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();

  const pageHeight = (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

  pdf.save("full-layout.pdf");

  canvasArea.style.height = originalHeight;
}
