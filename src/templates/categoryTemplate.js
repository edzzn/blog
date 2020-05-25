import React from 'react';
import PropTypes from 'prop-types';

import ArticlesPage from '../pages/articulos';

const CategoriesRoute = (props) => {
  return <ArticlesPage {...props.data} {...props} isCategoryPage={true} />;
};

CategoriesRoute.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.string,
};

export default CategoriesRoute;
