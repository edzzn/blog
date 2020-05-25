const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create Category pages
  const categoryTemplate = require.resolve(
    `./src/templates/categoryTemplate.js`
  );

  const categories = result.data.allMarkdownRemark.edges
    .map(({ node }) => {
      return slugify(node.frontmatter.category);
    })
    .filter((t, i, arr) => i + 1 === arr.length || t !== arr[i + 1]);

  categories.forEach((category) => {
    createPage({
      path: `categoria/${category}`,
      component: categoryTemplate,
      context: {
        // additional data can be passed via context
        category: category,
      },
    });
  });

  // Create Tag pages
  const tagTemplate = require.resolve(`./src/templates/tagTemplate.js`);

  const tags = result.data.allMarkdownRemark.edges
    .map(({ node }) => Object.assign({}, node.frontmatter))
    .reduce((acc, e) => acc.concat(e.tags), [])
    .map((tag) => slugify(tag))
    .sort()
    .filter((tag, i, tags) => i + 1 === tags.length || tag !== tags[i + 1]);

  tags.forEach((tag) => {
    createPage({
      path: `tag/${tag}`,
      component: tagTemplate,
      context: {
        // additional data can be passed via context
        tag: tag,
      },
    });
  });

  // Create Article pages
  const blogPostTemplate = require.resolve(
    `./src/templates/articleTemplate.js`
  );

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
      },
    });
  });
};
