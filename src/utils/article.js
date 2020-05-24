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

export function getTagsFromQuery(tags) {
  if (tags) {
    return tags.edges
      .map((edge) => edge.node)
      .map((node) => Object.assign({}, node.frontmatter))
      .reduce((acc, e) => acc.concat(e.tags), [])
      .sort()
      .filter(
        (t, i, arr) =>
          i + 1 === arr.length || t.toLowerCase() !== arr[i + 1].toLowerCase()
      );
  }
  return [];
}

export function getCategoriesFromQuery(categories) {
  if (categories) {
    return categories.edges
      .map((edge) => edge.node.frontmatter.category)
      .filter(
        (t, i, arr) =>
          i + 1 === arr.length || t.toLowerCase() !== arr[i + 1].toLowerCase()
      );
  }
  return [];
}
