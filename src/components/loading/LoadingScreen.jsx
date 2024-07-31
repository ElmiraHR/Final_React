import React from 'react';
import './Loading.css';

export default function LoadingScreen() {
  return (
    <div className='loadBox'>
      <h2 className='load' aria-label="bouncing">
        <span style={{ "--i": 0 }} aria-hidden="true"><span>L</span></span>
        <span style={{ "--i": 1 }} aria-hidden="true"><span>O</span></span>
        <span style={{ "--i": 2 }} aria-hidden="true"><span>A</span></span>
        <span style={{ "--i": 3 }} aria-hidden="true"><span>D</span></span>
        <span style={{ "--i": 4 }} aria-hidden="true"><span>I</span></span>
        <span style={{ "--i": 5 }} aria-hidden="true"><span>N</span></span>
        <span style={{ "--i": 6 }} aria-hidden="true"><span>G</span></span>
      </h2>
    </div>
  );
}
