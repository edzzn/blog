import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { ArticlesPage } from '../pages/articulos';

const TagsRoute = (props) => {
  return <ArticlesPage {...props.data} {...props} isCategoryPage={true} />;
};

TagsRoute.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.string,
};

export default TagsRoute;

export const TagsRouteQuery = graphql`
  query TagsByCategoryPage($tag: String) {
    articles: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "article" }
          published: { eq: true }
          tags: { in: [$tag] }
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
