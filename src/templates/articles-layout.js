import React from 'react';

import Layout from '../components/shared/layout';

import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { slugify } from '../utils/article';

export default function ArticleTemplate({ pageContext, children }) {
  const pageInfo = pageContext.frontmatter;
  return (
    <Layout
      seo={{
        title: pageInfo.title,
        keywords: pageInfo.tags,
      }}
    >
      <section className='max-w-3xl mx-auto'>
        <h1>{pageInfo.title}</h1>

        <img src={pageInfo.image} />
        <Link to={`/articulos/categoria/${slugify(pageInfo.category)}`}>
          <span className='category'>{pageInfo.category}</span>
        </Link>
        <div className='tags my-2'>
          {pageInfo.tags.map((tag) => (
            <Link to={`/articulos/tag/${slugify(tag)}`} key={tag}>
              <span className='tag'>{tag}</span>
            </Link>
          ))}
        </div>
        <section className='blog-post-content'>{children}</section>
      </section>
    </Layout>
  );
}

ArticleTemplate.propTypes = {
  children: PropTypes.object,
  pageContext: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      date: PropTypes.string.isRequired,
      category: PropTypes.string,
      description: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }),
};
