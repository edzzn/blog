import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

function ArticleCard({ article }) {
  return (
    <div key={article.slug} className='col-span-12 sm:col-span-6 p-3'>
      <Link to={article.slug}>
        <img src={article.image} />
        <h3>{article.title}</h3>
      </Link>
      <Link to='#'>
        <span className='category'>{article.category}</span>
      </Link>
      <br />
      <div className='tags'>
        {article.tags.map((tag) => (
          <span className='tag' key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <p>{article.description}</p>
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    topic: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default ArticleCard;
