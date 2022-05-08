export async function getAllArticlesData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_KPOPAPI_ROOT_URL}/api/articles`)
  );
  const article = await res.json();
  const staticfilteredArticles = article.sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );
  return staticfilteredArticles;
}

export async function getRecentlyArticleData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_KPOPAPI_ROOT_URL}/api/oneweek`)
  );
  const article = await res.json();
  const staticfilteredArticles = article.sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );
  return staticfilteredArticles;
}

export async function getGroupArticle(group_name) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_KPOPAPI_ROOT_URL}/api/article/${group_name}`
    )
  );
  const article = await res.json();
  const staticfilteredArticles = article.sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );
  return staticfilteredArticles;
}
