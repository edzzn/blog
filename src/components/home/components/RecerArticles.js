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
    <div className='grid grid-cols-12'>
      {articles.map((article) => (
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
      ))}
    </div>
  </section>
);

RecentArticles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      topic: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const RenderRecentArticles = () => (
  <StaticQuery
    query={graphql`
      query RecentArticles {
        categories: allMarkdownRemark(
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
                category
              }
            }
          }
        }
        tags: allMarkdownRemark(
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
        articles: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
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
              fields {
                slug
                # readingTime {
                #   text
                # }
              }
              frontmatter {
                title
                date
                updated
                description
                tags
                category
                image
              }
            }
          }
        }
        posts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "article" }
              published: { eq: true }
            }
          }
          limit: 6
        ) {
          edges {
            node {
              fields {
                slug
                # readingTime {
                #   text
                # }
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
    }}
  />
);

export default RenderRecentArticles;
