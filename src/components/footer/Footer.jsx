import React from 'react';
import FooterGrid from './FooterGrid';
import './Footer.css';

const Footer = () => {
  return (
    <div>
      <FooterGrid />
      <div className='map'>
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d32670.908982628065!2d13.329679044814165!3d52.510274580509424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1721234355055!5m2!1sde!2sde"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Footer;