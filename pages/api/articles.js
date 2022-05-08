// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  let url = "https://jsonplaceholder.typicode.com/users";

  const response = await fetch(url);
  const data = await response.json();

  // console.log(data);
  res.status(200).json(data);
}
