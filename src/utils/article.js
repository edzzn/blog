export function getArticlesFromQuery(articles) {
  if (articles) {
    return articles.edges
      .map((edge) => edge.node)
      .map((node) =>
        Object.assign({}, node.frontmatter, node.fields, {
          excerpt: node.excerpt,
        })
      );
  }

  return [];
}
