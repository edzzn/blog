import React from 'react';
import PropTypes from 'prop-types';
import { getTagsFromQuery, slugify } from '../../../utils/article';

import { StaticQuery, graphql, Link } from 'gatsby';

function Tags({ tags }) {
  return (
    <>
      <h3>Tags:</h3>
      {tags.map((tag) => (
        <span className='tag mr-3' key={tag}>
          <Link to={`/articulos/tag/${slugify(tag)}`} key={tag}>
            {tag}
          </Link>
        </span>
      ))}
    </>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const RenderTags = () => (
  <StaticQuery
    query={graphql`
      query allTags {
        tags: allMdx(
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
                tags
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      return <Tags tags={getTagsFromQuery(data.tags)} />;
    }}
  />
);

export default RenderTags;
