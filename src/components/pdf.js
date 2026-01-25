import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`;

const PdfCanvasViewer = ({ fileUrl }) => {
   const canvasRef = useRef(null);
   useEffect(() => {
       const loadPdf = async () => {
           const pdf = await pdfjsLib.getDocument(fileUrl).promise;
           const page = await pdf.getPage(1);
           const viewport = page.getViewport({ scale: 1.5 });
           const canvas = canvasRef.current;
           const context = canvas.getContext('2d');
           canvas.width = viewport.width;
           canvas.height = viewport.height;
           await page.render({
               canvasContext: context,
               viewport,
           }).promise;
       };
       loadPdf();
   }, [fileUrl]);
   return <canvas ref={canvasRef} />;
};

export default PdfCanvasViewer;