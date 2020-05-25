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

export function slugify(str) {
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
