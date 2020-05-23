import React from 'react';
import prose from '../../../assets/prose';

const Hero = () => (
  <>
    <p className='intro-text'>{prose.main.description}</p>
    <div className='my-2 bg-gray-900 h-1 w-full' />
    <br />
  </>
);

export default Hero;
