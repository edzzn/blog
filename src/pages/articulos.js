import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/shared/layout';
import { StaticQuery, graphql } from 'gatsby';
import {
  getTagsFromQuery,
  getCategoriesFromQuery,
  getArticlesFromQuery,
} from '../utils/article';
import ArticleCard from '../components/articles/components/ArticleCard';

class ArticlesPage extends React.Component {
  render() {
    const tags = getTagsFromQuery(this.props.tags);
    const categories = getCategoriesFromQuery(this.props.categories);
    const articles = getArticlesFromQuery(this.props.articles);

    return (
      <Layout
        seo={{
          title: 'Home',
          keywords: [`react`, `flutter`, `aws`],
        }}
      >
        <h1>Artículos</h1>
        <div className='flex mt-3'>
          <aside className='hidden md:w-1/4 md:block xl:w-1/5'>
            <h3>Tags</h3>
            {tags.map((tag) => (
              <p className='tag' key={tag}>
                {tag}
              </p>
            ))}
          </aside>
          <section className='md:w-3/4 xl:w-4/5 '>
            <h3>Categorías:</h3>
            {categories.map((category) => (
              <span className='category mr-3' key={category}>
                {category}
              </span>
            ))}
            <hr />
            <div className='grid grid-cols-12'>
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

ArticlesPage.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const renderArticles = () => (
  <StaticQuery
    query={graphql`
      query AllTags {
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
        categories: allMarkdownRemark(
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
      }
    `}
    render={(data) => {
      return <ArticlesPage {...data} />;
    }}
  />
);

export default renderArticles;
