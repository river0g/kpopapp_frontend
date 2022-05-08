import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Index page" isTopPage={true}>
      <div>
        <h1 className="text-4xl">Hello Nextjs</h1>
      </div>
    </Layout>
  );
}
