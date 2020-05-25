import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/shared/layout';
import { StaticQuery, graphql } from 'gatsby';
import {
  getTagsFromQuery,
  getCategoriesFromQuery,
  getArticlesFromQuery,
} from '../utils/article';
import {
  // ArticleCard,
  ArticlesFilter,
  ArticlesContainer,
} from '../components/articles';

class ArticlesPage extends React.Component {
  static articlesPerPage = 6;

  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      currentPage: 1,
    };

    this.filterArticles = this.filterArticles.bind(this);
  }

  filterArticles(articles) {
    if (this.state.filterText !== '') {
      return [...articles].filter((article) => {
        const lowerCasedFilteredText = this.state.filterText.toLowerCase();
        const inTitle = article.title
          .toLowerCase()
          .includes(lowerCasedFilteredText);
        const inDescription = article.description
          .toLowerCase()
          .includes(lowerCasedFilteredText);
        const inCategory = article.category
          .toLowerCase()
          .includes(lowerCasedFilteredText);
        return inTitle || inCategory || inDescription;
      });
    }
    return articles;
  }

  render() {
    const tags = getTagsFromQuery(this.props.tags);
    const categories = getCategoriesFromQuery(this.props.categories);
    const articles = getArticlesFromQuery(this.props.articles);
    const filteredArticles = this.filterArticles(articles);

    return (
      <Layout
        seo={{
          title: 'Home',
          keywords: [`react`, `flutter`, `aws`],
          slug: '/articulos',
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

            <ArticlesFilter
              count={filteredArticles.length}
              filterText={this.state.filterText ? this.state.filterText : ''}
              onChange={(text) => {
                this.setState({
                  filterText: text,
                });
              }}
            />
            <hr />

            <ArticlesContainer articles={filteredArticles} />
          </section>
        </div>
      </Layout>
    );
  }
}

ArticlesPage.propTypes = {
  tags: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
};

const renderArticles = () => (
  <StaticQuery
    query={graphql`
      query ArticlesPage {
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
