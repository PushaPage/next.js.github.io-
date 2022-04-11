import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MainLayout } from '../../components/MainLayout';

export default function Post({ post: serverPost }) {
    const { query } = useRouter();
    // console.log(router);

    const [post, setPost] = useState(serverPost);

    useEffect(() => {
        async function load() {
            const response = await fetch(`http://localhost:4200/posts/${query.id}`);
            const data = await response.json();
            setPost(data);
        }
        if (!serverPost) {
            load();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!post) {
        return (
            <MainLayout>
                <h1>Loading...</h1>
            </MainLayout>
        );
    }
    return (
        <MainLayout>
            <h1>{post.title}</h1>
            <hr />
            <p>{post.body}</p>
            <Link href={'/posts'}>
                <a>Back to all posts</a>
            </Link>
        </MainLayout>
    );
}

// Post.getInitialProps = async ({ query, req }) => {
//     if (!req) {
//         return {
//             post: null,
//         };
//     }
//     const res = await fetch(`${process.env.API_URL}/posts/${query.id}`);
//     const post = await res.json();
//     return { post };
// };

// NOTE: Only server side
export async function getServerSideProps({ query }) {
    // if (!req) {
    //     return {
    //         props: { post: null },
    //     };
    // }
    const res = await fetch(`${process.env.API_URL}/posts/${query.id}`);
    const post = await res.json();
    return {
        props: { post }, // will be passed to the page component as props
    };
}
