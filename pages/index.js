import Layout from "../components/Layout";
const updateLog = [
  { date: "2022.05.19", content: "RecentlyPageに日付フィルターの追加" },
];

const todoList = [
  { content: "サイトで分けるフィルターを作成。" },
  { content: "page nationを導入してパフォーマンスをあげる。" },
  { content: "レスポンシブに対応させる。" },
  { content: "サイドバーの追加" },
  { content: "対象サイトの拡張(Wow Korea)" }, // https://www.wowkorea.jp/
  { content: "対象サイトの拡張(odiodi.jp)" }, // https://www.odiodi.jp/
];
export default function Home() {
  return (
    // <Layout title="Index page" isTopPage={true}>
    <Layout title="Index page">
      <div className="pt-10">
        <h1 className="text-4xl">Welcome to K-POP APP</h1>
      </div>
      <div className="w-4/6 mt-4 px-2 min-h-40">
        <div className="text-center">
          <span className="p-2 inline-block pt-1 text-2xl border-double border-4 border-sky-700 rounded">
            アップデート記録
          </span>
        </div>
        <div className="pt-4 w-full divide-y-4 divide-slate-400/25">
          {updateLog.map((log, i) => {
            return (
              <div className="grid grid-cols-7 mt-1" key={i}>
                <div className="col-span-1">
                  <span className="inline-block text-xl align-top">
                    {log.date} :
                  </span>
                </div>
                <div className="col-span-6">
                  <span className="inline-block text-xl align-top">
                    {log.content}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-4/6 mt-4 px-2 pt-10 min-h-40">
        <div className="text-center">
          <span className="p-2 inline-block pt-1 text-2xl border-double border-4 border-sky-700 rounded">
            これからの予定
          </span>
        </div>
        <div className="pt-4 w-full divide-y-4 divide-slate-400/25">
          {todoList.map((todo, i) => {
            return (
              <div className="mt-1" key={i}>
                <div>
                  <span className="inline-block text-xl">・{todo.content}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
