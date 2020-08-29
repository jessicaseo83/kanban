import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Header() {
  const savePdf = function() {
    html2canvas(document.querySelector('#pdf'))
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [28.48, 20]
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf");  
    })
  }

  return (
    <Navbar bg="light" fixed="top">
      <Button onClick = {savePdf}>
        Print PDF
      </Button>
      <Navbar.Brand>Brand text</Navbar.Brand>
    </Navbar>
  )
}