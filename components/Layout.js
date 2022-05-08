import Head from "next/head";
import Link from "next/link";

const Layout = ({
  children,
  title = "Defalt Page",
  isTopPage = false,
  bgColor = "bg-gray-50",
}) => {
  const baseTopStyle = `flex items-center flex-col min-h-screen text-gray-600 text-sm ofnt-mono ${bgColor}`;
  const style1 = isTopPage ? `${baseTopStyle} justify-center` : baseTopStyle;

  const baseMainStyle = "flex flex-1 items-center w-max flex-col mb-10";
  const style2 = isTopPage ? `${baseMainStyle} justify-center` : baseMainStyle;

  return (
    <div className={style1}>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="w-full">
        <nav className="bg-gray-800 w-full">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded font-bold">
                  Home
                </a>
              </Link>
              <Link href="/article-page">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded font-bold">
                  Article
                </a>
              </Link>
              <Link href="/recently">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded font-bold">
                  Recently
                </a>
              </Link>
              <Link href="/article/blackpink">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded font-bold">
                  BLACKPINK
                </a>
              </Link>
              <Link href="/article/aespa">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded font-bold">
                  aespa
                </a>
              </Link>
              <Link href="/article/ive">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded font-bold">
                  IVE
                </a>
              </Link>
              <Link href="/article/gi-dle">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded font-bold">
                  (G)I-DLE
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className={style2}>{children}</main>
    </div>
  );
};
export default Layout;
