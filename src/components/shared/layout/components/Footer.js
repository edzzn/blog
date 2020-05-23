import React from 'react';

const Footer = () => (
  <footer className='bg-gray-900'>
    <nav className='flex justify-between max-w-6xl p-4 mx-auto text-sm md:p-4 text-white'>
      <p>
        © {new Date().getFullYear()}
        {` `}
        <span className='font-bold'>Edisson Reinozo</span>
      </p>

      <p>
        <a
          className='font-bold no-underline'
          href='https://github.com/edzzn'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </a>
        {' | '}
        <a
          className='font-bold  no-underline'
          href='https://twitter.com/edzznR'
          target='_blank'
          rel='noopener noreferrer'
        >
          Twitter
        </a>
      </p>
    </nav>
  </footer>
);

export default Footer;
