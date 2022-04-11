import React from 'react';
import Router from 'next/router';
import { MainLayout } from '../../components/MainLayout';

export default function AboutPage({ title }) {
    const linkClickHandler = () => {
        Router.push('/');
    };
    return (
        <MainLayout title={'About Page'}>
            <h1>{title}</h1>
            <button onClick={linkClickHandler}>Go back to home</button>
            <button onClick={() => Router.push('/posts')}>Go back to posts</button>
        </MainLayout>
    );
}

AboutPage.getInitialProps = async ({ query, req }) => {
    // if (!req) {
    //     return {
    //         title: null,
    //     };
    // }
    const res = await fetch(`http://localhost:4200/about`);
    const { title } = await res.json();
    return { title };
};
