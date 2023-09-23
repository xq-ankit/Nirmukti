import { useState } from 'react';
import "./gettingStarted.scss";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </span>
        <a href="/" className="navbar-logo">
          Nirmukti
        </a>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><a href="/about">About</a></li>
        <li className="navbar-item"><a href="/contact">Contact</a></li>
        {/* Add more menu items as needed */}
      </ul>
    </nav>
  );
};

const GettingStarted = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div>
      <NavBar />
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit">Login</button>
          <div className="google-login-container">
            <GoogleOAuthProvider clientId="301175040082-a9dfvqhvo6o5upsl5e16rglm2b5jbm8m.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GettingStarted;
