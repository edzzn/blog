import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/shared/layout';
import { StaticQuery, graphql } from 'gatsby';
import { getArticlesFromQuery } from '../utils/article';
import {
  ArticlesFilter,
  ArticlesContainer,
  Categories,
  Tags,
} from '../components/articles';

export class ArticlesPage extends React.Component {
  static articlesPerPage = 6;

  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      currentPage: 1,
    };

    this.filterArticles = this.filterArticles.bind(this);
    this.getPageCatOrTagFilter = this.getPageCatOrTagFilter.bind(this);
    this.infoTagCatPage = this.infoTagCatPage.bind(this);
  }

  getPageCatOrTagFilter() {
    return this.props.pageContext.category
      ? this.props.pageContext.category
      : this.props.pageContext.tag;
  }

  filterArticles(articles) {
    if (this.state.filterText !== '') {
      return articles.filter((article) => {
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

  infoTagCatPage() {
    if (this.props.isCategoryPage || this.props.isTagPage)
      return (
        <h4>
          Mostrando articulos sobre:{' '}
          <strong>{this.getPageCatOrTagFilter()}</strong>
        </h4>
      );
  }

  render() {
    const articles = getArticlesFromQuery(this.props.articles);
    const filteredArticles = this.filterArticles(articles);

    return (
      <Layout
        seo={{
          title: 'Articulos ',
          keywords: [`react`, `flutter`, `aws`],
          slug: '/articulos',
        }}
      >
        <h2>Artículos</h2>

        <div className='flex mt-3'>
          <aside className='hidden md:w-1/4 md:block xl:w-1/5'>
            <Tags />
          </aside>

          <section className='md:w-3/4 xl:w-4/5 '>
            <Categories />

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
  articles: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string,
    tag: PropTypes.string,
  }),
};

const renderArticles = () => (
  <StaticQuery
    query={graphql`
      query ArticlesPage {
        articles: allMdx(
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
      return <ArticlesPage {...data} />;
    }}
  />
);

export default renderArticles;
