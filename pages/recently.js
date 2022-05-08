import { useState } from "react";
import Layout from "../components/Layout";
import Article from "../components/Article";
import { getRecentlyArticleData } from "../lib/articles";
import { getGroupsName, getTagGroupsName } from "../lib/groups";

export default function RecentlyPage({ staticfilteredArticles: articles }) {
  const tagGroups = [...getTagGroupsName(), "All"];
  const groupName = [...getGroupsName(), "All"];

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
          tagfilteredArticles.map((article, i) => (
            <Article key={i} article={article} />
          ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const staticfilteredArticles = await getRecentlyArticleData();
  return {
    props: {
      staticfilteredArticles,
    },
    revalidate: 5,
  };
}
