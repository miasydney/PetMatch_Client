import React from 'react'
import { Button } from 'react-bootstrap';
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const BackBtn = () => {

  const navigate = useNavigate()
    
  return (
    <Button
      style={{ marginTop: "2.5rem" }}
      variant="outline-dark"
      onClick={() => navigate(-1)}
    >
      <MdArrowBackIos /> Back
    </Button>
  );
}

export default BackBtn