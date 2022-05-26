import { getGroupArticle } from "../../../lib/articles";
import { getTagGroupsName } from "../../../lib/groups";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import Article from "../../../components/Article";
import Link from "next/link";

const pageNums = [1, 2, 3, 4, 5];

export default function GroupArticle({
  filteredArticles,
  groupName,
  bgColor,
  nowPageNum,
}) {
  const router = useRouter();

  if (router.isFallback || !filteredArticles) return <div>Loading...</div>;
  let aStyle = "border border-red-300 text-pink-400 p-4 mx-1";

  return (
    <Layout title={`${groupName} pages`} bgColor={bgColor}>
      <div className="inline-block m-6 text-2xl font-bold bg-gray-100 rounded-full px-3 py-1">
        <h3>記事数: {filteredArticles.length}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 content-start">
        {filteredArticles &&
          filteredArticles.map((article) => {
            return <Article key={article.id} article={article} />;
          })}
      </div>
      <div className="m-6">
        <div className="inline">
          {pageNums.map((pageNum, idx) => (
            <Link href={`/group/${groupName}/${pageNum}`} key={idx}>
              <a
                className={
                  pageNum == Number(nowPageNum)
                    ? aStyle + " bg-pink-200"
                    : aStyle
                }
              >
                {pageNum}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const groupList = getTagGroupsName();
  // const group_list = ["blackpink", "ive", "aespa", "gi-dle", "nmixx", "kep1er"];
  // xxx:dict, yyy:dict
  // paths = [{params: xxx , yyy}, {params: ...}, ...]
  // 上記のように記載する。

  // 以下のような書き方もある。
  // const paths = group_list.map((group) => `/article/${group}`)
  // let paths = groupList.map((group) => `/group/${group}/${id}`)
  const paths = [];
  let articleNum = [1, 2, 3, 4, 5]; // 20記事/ページとして合計で100記事あるので20ページずつの5ページ
  groupList.forEach((group) => {
    articleNum.forEach((num) => {
      paths.push({ params: { group, id: String(num) } });
    });
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
  const articles = await getGroupArticle(params.group);

  // 1ページ30記事以下にする。
  const filteredArticles = articles.filter((_, idx) => {
    if ((Number(params.id) - 1) * 20 <= idx && idx < Number(params.id) * 20) {
      return true;
    }
  });

  return {
    props: {
      filteredArticles,
      groupName: params.group,
      bgColor: groupColor[params.group],
      nowPageNum: params.id,
    },
    revalidate: (60 * 60) / 2, // 更新 30min/回
  };
}
