import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
// import arrowForward from '../../../images/icons/arrow-forward.svg';
import { getArticlesFromQuery } from '../../../utils/article';
// import { BlogsContainer } from '../../shared/blogs';
const RecentArticles = ({ articles }) => (
  <section>
    <h2>Artículos Recientes</h2>
    {/* <Link>Ver todos</Link> */}
    <div className='grid grid-cols-12 gap-4'>
      {articles.map((article) => (
        <div key={article.slug} className='col-span-12 sm:col-span-6'>
          <Link to={article.slug}>
            <img src={article.image} />
            <h3>{article.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  </section>
);

RecentArticles.propTypes = {
  articles: PropTypes.string.isRequired,
};

const RenderRecentArticles = () => (
  <StaticQuery
    query={graphql`
      query RecentArticles {
        articles: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___updated] }
          filter: {
            frontmatter: {
              templateKey: { eq: "article" }
              published: { eq: true }
            }
          }
          limit: 4
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                date
                description
                tags
                category
                image
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      return <RecentArticles articles={getArticlesFromQuery(data.articles)} />;
      // return <p>{JSON.stringify(getArticlesFromQuery(data.articles))}</p>;
    }}
  />
);

export default RenderRecentArticles;
