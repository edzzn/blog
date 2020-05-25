import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import { slugify } from '../../../utils/article';

function ArticleCard({ article }) {
  return (
    <div key={article.slug} className='col-span-12 sm:col-span-6 p-3'>
      <Link to={`/${article.slug}`}>
        <img src={article.image} />
        <h3>{article.title}</h3>
      </Link>
      <Link to={`/articulos/categoria/${slugify(article.category)}`}>
        <span className='category'>{article.category}</span>
      </Link>
      <br />
      <div className='tags'>
        {article.tags.map((tag) => (
          <Link to={`/articulos/tag/${slugify(tag)}`} key={tag}>
            <span className='tag'>{tag}</span>
          </Link>
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
    topic: PropTypes.string,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default ArticleCard;
