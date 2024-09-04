import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We are a team of passionate developers.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: contact@example.com</li>
              <li>Phone: +1234567890</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Facebook</a></li>
              <li><a href="#" className="text-light">Twitter</a></li>
              <li><a href="#" className="text-light">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
