import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import AlertMsg from './AlertMsg';
import jsPDF from 'jspdf';
import './Navbar.css'

export default function Header(props) {
  const [showAlertMsg, setShowAlertMsg] = useState(false);
  const savePdf = function() {
    window.scrollTo(0, 0)
    html2canvas(document.querySelector('#pdf'))
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [638, 902]
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("my-kanban.pdf");  
    })
  }
  const handleClearBoard = () => {
    props.clearBoard();
    setShowAlertMsg(false);
  }

  return (
    <Navbar className="nav" fixed="top" >
      <Nav onClick={()=>alert(`This project is a kanban created by Jess and Eileen for the Aug. 28-31 2020 Mintbean JavaScript Bootcamp Olympics hackathon sponsored by FeaturePeek.`)}>
        <Nav.Link><Navbar.Brand className="brand-logo">Good Old Kanban</Navbar.Brand></Nav.Link>
      </Nav>
      <AlertMsg show={showAlertMsg} onHide={()=>setShowAlertMsg(false)} deleteComp={handleClearBoard}/>
      <div>
        <Button variant="outline-info" style={{marginRight: '10px'}}onClick = {()=>setShowAlertMsg(true)} className="reset-board-button">
          Reset Board
        </Button>
        <Button variant="outline-info" onClick = {savePdf} className="pdf-button">
          Save as PDF
        </Button>
      </div>
    </Navbar>
  )
}