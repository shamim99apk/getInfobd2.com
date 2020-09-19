// eslint-disable-next-line
import React from "react";
import "./LandingPage.home.scss";

function HomeLandingPage() {
  return (
    <div>
      <div className='hero-wrapper1'>
        <div className='wrapper1'>
          <div className='hero-content1'>
            <h1>A Place Where You Get All Info </h1>
            <p className='subtitle1'>help others and create beautiful world</p>
          </div>
        </div>
      </div>

      <div className='body'>
        <div className='container'>
          <div className='box'>
            <a href='/grocery'>
              <h2>Blood</h2>
            </a>
          </div>
          <div className='box'>
            <a href='/blood'>
              <h2>Grocery</h2>
            </a>
          </div>
          <div className='box'>
            <a href='/volunteer'>
              <h2>Volunteer</h2>
            </a>
          </div>
          <div className='box'>
            <a href='/hotel'>
              <h2>Hotel</h2>
            </a>
          </div>
          <div className='box'>
            <a href='/police'>
              {" "}
              <h2>Police</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLandingPage;
