import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:5000/api/login', { email, password }) // Correct URL
      .then(result => {
        console.log(result);
        if (result.data === 'Success') {
          navigate('/home');
        } else {
          setError(result.data);
        }
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <form onSubmit={handleOnSubmit}>
                      {error && <div className="alert alert-danger">{error}</div>}
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">Forgot password?</a>
                      </p>

                      <button className="btn btn-outline-light btn-lg px-5" type="submit">
                        Login
                      </button>
                    </form>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
