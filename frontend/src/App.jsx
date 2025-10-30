import React from 'react';
import Home from './pages/Home';

const appContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '32px 12px 48px 12px',
  fontFamily: 'sans-serif',
  minHeight: '100vh',
};

function App() {
  return (
    <div style={appContainerStyle}>
      <Home />
    </div>
  );
}

export default App;
