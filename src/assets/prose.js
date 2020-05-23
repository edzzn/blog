import React from 'react';

export default {
  subscriberCount: 5000,
  main: {
    description: (
      <span className='font-sans text-4xl font-bold'>
        ¡Hola 👋! Soy Edisson Reinozo, Software Developer, AWS Educate Could
        Ambassador. En mi blog enseño{' '}
        <span className='font-mono p-1 font-extrabold bg-react text-white'>
          ReactJS
        </span>
        ,{' '}
        <span className='font-mono p-1 font-extrabold bg-flutter-dark text-white'>
          Flutter
        </span>{' '}
        y{' '}
        <span className='font-mono p-1 font-extrabold bg-aws text-white'>
          AWS
        </span>{' '}
      </span>
    ),
    'description-expanded': <span></span>,
  },
  currently: {
    book: {
      title: 'Patterns of Enterprise Application Architecture',
      author: 'Martin Fowler',
    },
    music: {
      album: "Virgo's Maze",
      artist: 'Part Time',
    },
  },
};
