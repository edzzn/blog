import React from 'react';

const Footer = () => (
  <footer className='bg-editor'>
    <nav className='flex justify-between max-w-6xl p-3 mx-auto text-sm md:p-3 text-white'>
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
