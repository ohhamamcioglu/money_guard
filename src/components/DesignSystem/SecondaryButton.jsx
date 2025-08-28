import React from 'react';

export default function SecondaryButton({ children, className = '', ...rest }) {
  return (
    <button className={`btn-secondary ${className}`} {...rest}>
      {children}
    </button>
  );
}
