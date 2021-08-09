/* eslint-disable react/jsx-indent */
import React from 'react';
import cloud1 from 'src/resources/icons/cloud1.png';
import cloud2 from 'src/resources/icons/cloud2.png';

export const CloudGradientPng = () => (
  <>
    <img
      style={{
        position: 'absolute', width: '13vh', top: 5, left: 5, zIndex: 10, opacity: 0.4,
      }}
      alt="cloud1"
      src={cloud1}
    />
    <img
      style={{
        position: 'absolute', width: '14vh', top: '6%', right: 10, zIndex: 10, opacity: 0.4,
      }}
      alt="cloud1"
      src={cloud2}
    />
  </>
);

export default CloudGradientPng;
