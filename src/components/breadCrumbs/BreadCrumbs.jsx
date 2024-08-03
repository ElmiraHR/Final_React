import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
  return (
    <div className="breadcrumb-container">
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="breadcrumb-separator"></div>
            )}
            {item.isActive ? (
              <span 
                className={`breadcrumb-item breadcrumb-active`} 
                title={item.label}
              >
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path} 
                className="breadcrumb-item" 
                title={item.label}
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))
      ) : (
        <span>No breadcrumbs available</span>
      )}
    </div>
  );
};

export default Breadcrumbs;
