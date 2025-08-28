import React from 'react';

export default function PrimaryButton({ children, className = '', ...rest }) {
  return (
    <button className={`btn-primary ${className}`} {...rest}>
      {children}
    </button>
  );
}
