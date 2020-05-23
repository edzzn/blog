import React from 'react';

export default {
  subscriberCount: 5000,
  main: {
    description: (
      <span className='text-2xl'>
        Soy Edisson Reinozo, Software Developer, AWS Educate Could Ambassador.
        En mi blog enseño{' '}
        <span className=' p-1 font-bold bg-blue-600 text-white'>ReactJS</span>,{' '}
        <span className=' p-1 font-bold bg-blue-800 text-white'>Flutter</span> y{' '}
        <span className=' p-1 font-bold bg-yellow-400'>AWS</span>{' '}
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
