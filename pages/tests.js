// export default function Tests({ testData }) {
//   return (
//     <div>
//       {testData.map((item) => (
//         <div key={item.id}>{item.name}</div>
//       ))}
//     </div>
//   );
// }
export default function Tests({ data, updated_at }) {
  return (
    <div>
      <div>{data}</div>
      <div>最終更新: {updated_at}</div>
    </div>
  );
}

export async function getStaticProps() {
  const now = new Date();
  const Year = now.getFullYear();
  const Month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const day =
    Year + "年" + Month + "月" + date + "日" + hour + ":" + min + ":" + sec;

  return {
    props: {
      data: 1,
      updated_at: day,
    },
    revalidate: 3,
  };
}

// export async function getStaticProps() {
//   // const { data: testData } = useSWR("/api/articles", fetcher);
//   const testData = await fetch(
//     "http://127.0.0.1:3000/api/articles"
//   ).then((res) => res.json());
//   return {
//     props: {
//       testData,
//     },
//     revalidate: 3,
//   };
// }

// /*
// {
//     id: 8,
//     name: 'Nicholas Runolfsdottir V',
//     username: 'Maxime_Nienow',
//     email: 'Sherwood@rosamond.me',
//     address: {
//       street: 'Ellsworth Summit',
//       suite: 'Suite 729',
//       city: 'Aliyaview',
//       zipcode: '45169',
//       geo: [Object]
//     },
//     phone: '586.493.6943 x140',
//     website: 'jacynthe.com',
//     company: {
//       name: 'Abernathy Group',
//       catchPhrase: 'Implemented secondary concept',
//       bs: 'e-enable extensible e-tailers'
//     }
//   },
// */

// // 午後はuseContextを使って複数コンポーネントで値を使う。
