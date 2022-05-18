const range = (start, end) =>
  [...Array(end - start).keys()].map((idx) => idx + start);
const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];

export function getOneWeek() {
  const dateObject = () => {
    const d = new Date();
    // getXxx()は実行環境依存するのでgetUTCXxx()とすることで強制的にUTC時間を取得する。
    let year = d.getUTCFullYear();
    let month = d.getUTCMonth();
    let date = d.getUTCDate();
    let hour = d.getUTCHours();
    let minute = d.getUTCMinutes();
    let second = d.getUTCSeconds();

    // hourに数値を足しただけだとdateが合わないことがあるのでもう一回Dateオブジェクトを作成する。
    // 例: 1月1日15時(UTC)の時、1月2日24時(JST)になるはずだが、上のままだと1月1日24時(JST)と時間だけ進む。
    // いろいろやったが対策が思いつかないので、UTCのhour+18で無理やりJSTに合わせる。
    const dd = new Date(year, month, date, hour + 18, minute, second);
    // 以下は実行環境依存の日にち。
    year = dd.getUTCFullYear();
    month = dd.getUTCMonth() + 1;
    date = dd.getUTCDate();
    let dayNum = dd.getUTCDay();
    hour = dd.getUTCHours();
    minute = dd.getUTCMinutes();
    second = dd.getUTCSeconds();

    return [{ year, month, date, hour, minute, second }, dayNum];
  };

  const [t, dayNum] = dateObject();
  const dates = range(1, 8)
    .map((d) => `${t.year}.${t.month}.${t.date - d}`)
    .sort((a, b) => a.split(".")[2] - b.split(".")[2]);

  const days = range(1, 8).map((n) => {
    return `(${dayOfWeekStr[(n + dayNum - 1) % 7]})`;
  });

  return [dates, days];
}
