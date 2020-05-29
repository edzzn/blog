import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { getArticlesFromQuery } from '../../../utils/article';
import { ArticleCard } from '../../articles';

const RecentArticles = ({ articles }) => (
  <section>
    <h2>Artículos Recientes</h2>
    <Link to='/articulos'>
      <span className='category'>Ver todos ➤</span>
    </Link>
    <div className='grid grid-cols-12'>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  </section>
);

RecentArticles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const RenderRecentArticles = () => (
  <StaticQuery
    query={graphql`
      query RecentArticles {
        articles: allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "article" }
              published: { eq: true }
            }
          }
          limit: 10
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
    `}
    render={(data) => {
      return <RecentArticles articles={getArticlesFromQuery(data.articles)} />;
    }}
  />
);

export default RenderRecentArticles;
