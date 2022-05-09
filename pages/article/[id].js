import { getGroupArticle } from "../../lib/articles";
import { getTagGroupsName } from "../../lib/groups";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Article from "../../components/Article";

export default function GroupArticle({ articles, title, bgColor }) {
  const router = useRouter();

  if (router.isFallback || !articles) return <div>Loading...</div>;
  return (
    <Layout title={`${title} pages`} bgColor={bgColor}>
      <div className="grid grid-cols-2 gap-4 content-start">
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
    fallback: false,
  };
}
const groupColor = {
  blackpink: "bg-gray-900", // blackpink
  aespa: "bg-gradient-to-r from-violet-800 via-rose-400 to-pink-400", // aespa
  ive: "bg-sky-500", // ive
  "gi-dle": "bg-gradient-to-r from-red-600 to-violet-700", // gi-dle
  nmixx: "bg-gradient-to-r from-blue-400 via-sky-300 to-pink-300", // nmixx
  kep1er: "bg-gradient-to-r from-indigo-300 via-gray-200 to-yellow-200", // kep1er
};
export async function getStaticProps({ params }) {
  const articles = await getGroupArticle(params.id);
  return {
    props: {
      articles,
      title: params.id,
      bgColor: groupColor[params.id],
    },
    revalidate: (60 * 60) / 2, // 更新 30min/回
  };
}
