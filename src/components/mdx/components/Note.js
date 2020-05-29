import React from 'react';
import PropTypes from 'prop-types';

function Note({ children }) {
  return <div className='flex m-2 items-center'>{children}</div>;
}

Note.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Note;
