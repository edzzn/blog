const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
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
    query CategoriesAndTags {
      tags: allMdx(
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
      categories: allMdx(
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

  const categories = result.data.categories.edges
    .map(({ node }) => {
      return node.frontmatter.category;
    })
    .filter((t, i, arr) => i + 1 === arr.length || t !== arr[i + 1]);

  categories.forEach((category) => {
    createPage({
      path: `articulos/categoria/${slugify(category)}`,
      component: categoryTemplate,
      context: {
        category: category,
      },
    });
  });

  // Create Tag pages
  const tagTemplate = require.resolve(`./src/templates/tagTemplate.js`);

  const tags = result.data.tags.edges
    .map(({ node }) => Object.assign({}, node.frontmatter))
    .reduce((acc, e) => acc.concat(e.tags), [])
    .map((tag) => tag)
    .sort()
    .filter((tag, i, tags) => i + 1 === tags.length || tag !== tags[i + 1]);

  tags.forEach((tag) => {
    createPage({
      path: `articulos/tag/${slugify(tag)}`,
      component: tagTemplate,
      context: {
        tag: tag,
      },
    });
  });
};
