import { useEffect } from "react";
import Layout from "../components/Layout";
import { getAllArticlesData } from "../lib/articles";
import useSWR from "swr";
import Article from "../components/Article";
import { useState } from "react";
import { getGroupsName, getTagGroupsName } from "../lib/groups";

export default function ArticlePage({ staticfilteredArticles: articles }) {
  // const tagGroups = [
  //   "blackpink",
  //   "aespa",
  //   "ive",
  //   "gi-dle",
  //   "nmixx",
  //   "kep1er",
  //   "All",
  // ];
  // const groupName = [
  //   "BLACKPINK",
  //   "aespa",
  //   "IVE",
  //   "(G)I-DLE",
  //   "NMIXX",
  //   "Kep1er",
  //   "All",
  // ];
  const tagGroups = [...getTagGroupsName(), "All"];
  const groupName = [...getGroupsName(), "All"];
  // ページ参照時にCSRをする。1
  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const apiUrl = process.env.NEXT_PUBLIC_KPOPAPI_URL;
  // const { data: articles, mutate } = useSWR(apiUrl, fetcher, {
  //   fallbackData: staticfilteredArticles,
  // });
  // const filteredArticles = articles?.sort(
  //   (a, b) => new Date(b.datetime) - new Date(a.datetime)
  // );

  // ページ参照時にCSRをする。2
  // useEffect(() => {
  //   mutate();
  // }, []);

  const [tag, setTag] = useState("All");

  const tagHandler = (e) => {
    setTag(e.currentTarget.value);
  };

  const tagfilteredArticles =
    tag === "All"
      ? articles
      : articles.filter((item) => {
          return item.group.includes(tag);
        });

  const tagBaseStyle =
    "inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2";

  const selectTagColor =
    "bg-gradient-to-r from-purple-300 via-pink-400 to-red-400";

  return (
    <Layout title="Article Page" bgColor="bg-pink-100">
      <div className="px-6 pt-4">
        <span className={`${tagBaseStyle} border border-pink-500 bg-gray-200 `}>
          グループタグ
        </span>
        {tagGroups.map((group, i) => (
          <button
            key={i}
            onClick={(e) => tagHandler(e)}
            value={group}
            className={`
            ${tagBaseStyle} ${
              tag === group ? selectTagColor : "bg-gray-200"
            } rounded-full
            `}
            disabled={group === tag}
          >
            #{group === "All" ? "全てのグループ" : groupName[i]}
          </button>
        ))}
      </div>
      <div>
        <div className="inline-block m-6 text-2xl font-bold">
          <h3>Group: {groupName[tagGroups.indexOf(tag)]}</h3>
        </div>
        <div className="inline-block m-6 text-2xl font-bold">
          <h3>記事数: {tagfilteredArticles.length}</h3>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 content-start">
        {tagfilteredArticles &&
          tagfilteredArticles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const staticfilteredArticles = await getAllArticlesData();
  return {
    props: {
      staticfilteredArticles,
    },
    revalidate: 3600 * 6,
  };
}
