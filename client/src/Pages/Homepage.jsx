import React from 'react';
import Body from '../components/Body';
import Header from '../components/Header';

const Homepage = () => {
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(to bottom left, yellow, orange, white)',
        backgroundSize: 'cover',
        height: '100vh', // Set the height to cover the entire viewport
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Body />
    </div>
  );
};

export default Homepage;
