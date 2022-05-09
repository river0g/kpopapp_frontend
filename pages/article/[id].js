import { getGroupArticle } from "../../lib/articles";
import { getTagGroupsName } from "../../lib/groups";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Article from "../../components/Article";

export default function GroupArticle({ articles, title }) {
  const router = useRouter();

  if (router.isFallback || !articles) return <div>Loading...</div>;
  return (
    <Layout title={`${title} pages`}>
      <div className="grid grid-cols-3 gap-4 content-start">
        {articles &&
          articles.map((article) => {
            return <Article key={article.id} article={article} />;
          })}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const group_list = getTagGroupsName();
  // const group_list = ["blackpink", "ive", "aespa", "gi-dle", "nmixx", "kep1er"];
  const paths = group_list.map((group) => {
    return {
      params: {
        id: group,
      },
    };
  });
  // {paths} とすることで{paths: []}の形になる。
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const articles = await getGroupArticle(params.id);
  return {
    props: {
      articles,
      title: params.id,
    },
    revalidate: 3600 * 6,
  };
}
