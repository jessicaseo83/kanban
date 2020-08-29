import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';

export default function Header() {
  const savePdf = function() {
    htm2canvas(document.querySelector('#capture')).then(canvas=> {
      document.body.appendChild(canvas);
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