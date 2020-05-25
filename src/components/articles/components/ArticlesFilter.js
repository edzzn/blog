import React from 'react';
import PropTypes from 'prop-types';

function ArticlesFilter({ count, filterText, onChange }) {
  return (
    <div className='flex m-2 items-center'>
      <input
        className='flex-grow focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4   leading-normal'
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder='Escribe algo para filtar...'
        type='text'
        value={filterText}
      />
      <div className='ml-2 font-bold text-xl text-react'>{count}</div>
    </div>
  );
}

ArticlesFilter.propTypes = {
  count: PropTypes.number.isRequired,
  filterText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default ArticlesFilter;
