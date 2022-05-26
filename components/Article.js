import Image from "next/image";

export default function Article({ article }) {
  const group = article.group.map((g, i) => <span key={i}>{g} </span>);
  const tagStyle =
    "inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2 mr-2";
  return (
    <div className="max-w-xl rounded overflow-hidden shadow-xl border-solid border-2 border-pink-500 bg-neutral-100 hover:bg-neutral-200">
      <a href={article.url} target="_blank" rel="noreferrer">
        <div className="h-full grid grid-cols-8 gap-1">
          <div className="grid grid-cols-8 col-start-1 col-span-9 border-b border-gray-300">
            {/* <div className="flex items-start justify-center col-start-1 col-span-3">
              <div className="border border-blue-600 relative w-full h-full">
                <img
                  src={article.thumbnail}
                  className="max-h-full absolute inset-x-0 m-auto"
                />
              </div>
            </div> */}
            <div className="flex items-start justify-center col-start-1 col-span-3 h-40">
              <div className="relative w-full h-full">
                <Image
                  src={article.thumbnail}
                  // className="absolute"
                  objectFit="contain"
                  // objectFit="cover"
                  layout="fill"
                  alt={article.group}
                />
              </div>
            </div>
            <div className="col-start-4 col-end-9 ">
              <div className="font-bold text-lg m-2 text-gray-700">
                {article.title}
              </div>
            </div>
          </div>
          <div className="col-start-1 col-end-9 mx-2 mb-2">
            <p className="text-gray-500 text-base">{article.detail}</p>
          </div>
          <div className="self-end col-start-1 col-end-9 mx-2">
            {/* <span className={tagStyle}>
              titleの長さ: {article.title.length}
            </span> */}
            <span className={tagStyle}>配信日: {article.date}</span>
            <span className={tagStyle}>配信サイト: {article.source_site}</span>
            <span className={tagStyle}>GroupTag: {group}</span>
          </div>
        </div>
      </a>
    </div>
  );
}
