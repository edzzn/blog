import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from './ArticleCard';

function ArticlesContainer({ articles }) {
  return (
    <div className='flex m-2 items-center'>
      <div className='grid grid-cols-12'>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

ArticlesContainer.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticlesContainer;
