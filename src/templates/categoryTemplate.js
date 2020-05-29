import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { ArticlesPage } from '../pages/articulos';

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

export const CategoriesRouteQuery = graphql`
  query ArticlesByCategoryPage($category: String) {
    articles: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "article" }
          published: { eq: true }
          category: { eq: $category }
        }
      }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            category
            image
            tags
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
