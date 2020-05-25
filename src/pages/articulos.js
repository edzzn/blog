import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/shared/layout';
import { StaticQuery, graphql, Link } from 'gatsby';
import {
  getTagsFromQuery,
  getCategoriesFromQuery,
  getArticlesFromQuery,
  slugify,
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
    this.isCategoryPage = this.isCategoryPage.bind(this);
    this.isTagPage = this.isTagPage.bind(this);
    this.getPageCatOrTagFilter = this.getPageCatOrTagFilter.bind(this);
    this.infoTagCatPage = this.infoTagCatPage.bind(this);
  }

  isCategoryPage() {
    return this.props.isCategoryPage;
  }
  isTagPage() {
    return this.props.isTagPage;
  }

  getPageCatOrTagFilter() {
    if (this.isCategoryPage()) return this.props.pageContext.category;
    if (this.isTagPage()) return this.props.pageContext.tag;
    return '';
  }

  filterArticles(articles) {
    let filteredArticles = [...articles];
    const catOrTagFilter = this.getPageCatOrTagFilter();

    if (this.isCategoryPage() && catOrTagFilter) {
      filteredArticles = filteredArticles.filter(
        (article) => slugify(article.category) === catOrTagFilter
      );
    }

    if (this.isTagPage() && catOrTagFilter) {
      filteredArticles = filteredArticles.filter((article) => {
        return article.tags.some((tag) => slugify(tag) === catOrTagFilter);
      });
    }

    if (this.state.filterText !== '') {
      return filteredArticles.filter((article) => {
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
    return filteredArticles;
  }

  infoTagCatPage() {
    if (this.isTagPage() || this.isCategoryPage())
      return (
        <h4>
          Mostrando articulos sobre:{' '}
          <strong>{this.getPageCatOrTagFilter()}</strong>
        </h4>
      );
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
        <h2>Artículos</h2>

        <div className='flex mt-3'>
          <aside className='hidden md:w-1/4 md:block xl:w-1/5'>
            <h3>Tags</h3>
            {tags.map((tag) => (
              <Link to={`/articulos/tag/${slugify(tag)}`} key={tag}>
                {' '}
                <p className='tag'>{tag}</p>
              </Link>
            ))}
          </aside>
          <section className='md:w-3/4 xl:w-4/5 '>
            <h3>Categorías:</h3>
            <span className='category mr-3'>
              <Link to={`/articulos`}>Todos</Link>
            </span>
            {categories.map((category) => (
              <span className='category mr-3' key={category}>
                <Link to={`/articulos/categoria/${slugify(category)}`}>
                  {category}
                </Link>
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
            {this.infoTagCatPage()}
            <ArticlesContainer articles={filteredArticles} />
          </section>
        </div>
      </Layout>
    );
  }
}

ArticlesPage.propTypes = {
  isCategoryPage: PropTypes.bool,
  isTagPage: PropTypes.bool,
  tags: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string,
    tag: PropTypes.string,
  }),
};

const renderArticles = (props) => (
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
      return <ArticlesPage {...props} {...data} />;
    }}
  />
);

export default renderArticles;
