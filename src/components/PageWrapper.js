import React from 'react';

function PageWrapper({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: '#e0f7fa',
        overflowX: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
