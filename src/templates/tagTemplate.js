import React from 'react';
import PropTypes from 'prop-types';

import ArticlesPage from '../pages/articulos';

const TagsRoute = (props) => {
  return <ArticlesPage {...props.data} {...props} isTagPage={true} />;
};

TagsRoute.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.string,
};

export default TagsRoute;
