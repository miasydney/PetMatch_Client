import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css"

const Footer = () => {
    return (
      <div className="footer">
        <Container fluid className="bg-light py-3">
          <Container>
            <p className="text-center text-muted mb-0">
              &copy; 2023 Pet Match | Adoption Agency Management
            </p>
          </Container>
        </Container>
      </div>
    );
};

export default Footer;

