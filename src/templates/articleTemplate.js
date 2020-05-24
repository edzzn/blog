import React from 'react';

import Layout from '../components/shared/layout';

import PropTypes from 'prop-types';
// import React from 'react';
import { graphql } from 'gatsby';

function ArticleTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout
      seo={{
        title: frontmatter.title,
        keywords: [`react`, `flutter`, `aws`],
      }}
    >
      <section className='mx-32'>
        <h1>{frontmatter.title}</h1>
        {/* <h5>{frontmatter.category}</h5> */}

        <img src={frontmatter.image} />
        <br />
        <br />
        <div
          className='blog-post-content'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </Layout>
  );
}

ArticleTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        date: PropTypes.string.isRequired,
        category: PropTypes.string,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      html: PropTypes.string,
    }),
  }),
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        image
        category
      }
    }
  }
`;

export default ArticleTemplate;
