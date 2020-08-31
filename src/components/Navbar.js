import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import AlertMsg from './AlertMsg';
import jsPDF from 'jspdf';
import './Navbar.css'

export default function Header(props) {
  const [showAlertMsg, setShowAlertMsg] = useState(false);
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
      pdf.save("mytasks.pdf");  
    })
  }

  const handleClear = () => {
    props.clearBoard;
  }

  return (
    <Navbar className="nav" fixed="top">
      <Navbar.Brand>Good Old Kanban</Navbar.Brand>
      {showAlertMsg && <AlertMsg/>}
      <div>
        <Button variant="outline-info" onClick = {()=>setShowAlertMsg(true)} className="pdf-button">
          Clear Board
        </Button>
        <Button variant="outline-info" onClick = {savePdf} className="pdf-button">
          Save as PDF
        </Button>
      </div>
    </Navbar>
  )
}