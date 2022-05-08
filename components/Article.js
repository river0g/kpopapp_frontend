export default function Article({ article }) {
  const group = article.group.map((g, i) => <span key={i}>{g} </span>);
  const tagStyle =
    "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2";
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border-solid border-2 border-pink-500">
      <a href={article.url}>
        <img className="w-full" src={article.thumbnail} alt="" />
        <div className="px-6 py-4">
          <div className="font-bold text-lg mb-2 h-40 text-gray-700">
            {article.title}
          </div>
          <p className="text-green-400 text-base">{article.detail}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className={tagStyle}>titleの長さ: {article.title.length}</span>
          <span className={tagStyle}>配信日: {article.date}</span>
          <span className={tagStyle}>配信サイト: {article.source_site}</span>
          <span className={tagStyle}>GroupTag: {group}</span>
        </div>
      </a>
    </div>
  );
}
