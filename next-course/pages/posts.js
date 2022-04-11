import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MainLayout } from '../components/MainLayout';

export default function Posts({ posts: serverPosts }) {
    const [posts, setPosts] = useState(serverPosts);

    useEffect(() => {
        async function load() {
            const response = await fetch('http://localhost:4200/posts');
            const json = await response.json();
            setPosts(json);
        }
        if (!serverPosts) {
            load();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!posts) {
        return (
            <MainLayout>
                <h1>Loading...</h1>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={'Posts page'}>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={'/post/[id]'} as={`/post/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </MainLayout>
    );
}

Posts.getInitialProps = async ({ req }) => {
    if (!req) {
        return {
            posts: null,
        };
    }
    // console.log(ctx);
    const res = await fetch(`${process.env.API_URL}/posts`);
    const posts = await res.json();
    return { posts };
};
