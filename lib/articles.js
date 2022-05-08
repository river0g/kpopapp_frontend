export async function getAllArticlesData() {
  const res = await fetch(new URL(process.env.NEXT_PUBLIC_KPOPAPI_URL));
  const article = await res.json();
  const staticfilteredArticles = article.sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );
  return staticfilteredArticles;
}
