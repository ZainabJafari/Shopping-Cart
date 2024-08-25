import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css';

const Hero = () => {
  return (
    <header className="hero-section d-flex align-items-center justify-content-center text-light">
      <div className="hero-content text-center">
      <h1 className="hero-title mb-4">Discover the Latest Smartphones</h1>
        <p className="hero-subtitle mb-4">
          Find cutting-edge mobile phones with the latest features, performance, and design.
        </p>
        <Link to="/" className="btn btn-primary">
          Shop Now
        </Link>
      </div>
    </header>
  );
};

export default Hero;
