import React from 'react';
import PropTypes from 'prop-types';

import { Link, StaticQuery, graphql } from 'gatsby';
import { getCategoriesFromQuery, slugify } from '../../../utils/article';

function Categories({ categories }) {
  return (
    <>
      <h3>Categorías:</h3>
      <span className='category mr-3'>
        <Link to={`/articulos`}>Todos</Link>
      </span>

      {categories.map((category) => (
        <span className='category mr-3' key={category}>
          <Link to={`/articulos/categoria/${slugify(category)}`}>
            {category}
          </Link>
        </span>
      ))}
    </>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const RenderCategories = () => (
  <StaticQuery
    query={graphql`
      query allCategories {
        categories: allMdx(
          filter: {
            frontmatter: {
              templateKey: { eq: "article" }
              published: { eq: true }
            }
          }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      return (
        <Categories categories={getCategoriesFromQuery(data.categories)} />
      );
    }}
  />
);

export default RenderCategories;
