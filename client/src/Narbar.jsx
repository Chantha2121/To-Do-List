import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import img from './Img/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'gray'}}>
      <div className="container">
        <a className="navbar-brand me-2" href="https://mdbgo.com/">
          <img
            src={img}
            height="35"
            alt="MDB Logo"
            loading="lazy"
            style={{ marginTop: '-1px' }}
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#" style={{fontSize:'20px', fontWeight:'bold', color:'greenyellow'}}>Chantha Coding to do list</a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <a href='/' type="button" className="btn btn-primary px-3 me-2">
              Login
            </a>
            <a href='/register' type="button" className="btn btn-primary me-3">
              Sign up for free
            </a>
            <a
              className="btn btn-dark px-3"
              href="https://github.com/Chantha2121?tab=repositories"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
