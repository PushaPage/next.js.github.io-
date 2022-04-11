import Link from 'next/link';
import Head from 'next/head';

export function MainLayout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title} | Next.js</title>
            </Head>
            <nav>
                <Link href={'/'}>
                    <a>Home</a>
                </Link>
                <Link href={'/about'}>
                    <a>About</a>
                </Link>
                <Link href="/posts">
                    <a>Posts</a>
                </Link>
            </nav>
            <main>{children}</main>
            <style jsx global>{`
                nav {
                    position: fixed;
                    height: 50px;
                    top: 0;
                    right: 0;
                    left: 0;
                    background: rgb(199, 199, 204);
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                nav a {
                    color: rgb(24, 24, 30);
                    text-decoration: none;
                    font-weight: 500;
                }

                main {
                    padding-top: 60px;
                }
            `}</style>
        </>
    );
}
