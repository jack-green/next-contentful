import React from 'react'
import Link from 'next/link';
import Error from 'next/error'

import Contentful from '../../core/contentful';
import {
    Layout,
    RichText,
    Hero,
} from '../../components';

const Page = ({ page }) => {
    if (!page) {
        // render a 404 if this is a react render
        if (process.browser) {
            return <Error statusCode={404} />
        }

        // trigger next.js's 404 rendering if this is SSR
        const e = new Error("Page not found");
        e.code = "ENOENT";  // Triggers a 404
        throw e;
    }
    return (
        <Layout title={page.fields.title}>
            <Link href="/"><a className="back">&lt; Home</a></Link>
            <Hero field={page.fields.heroImage} title={page.fields.title} />
            <RichText document={page.fields.body} />
            <style jsx>{`
                .back {
                    display: inline-block;
                    margin: 20px 0;
                }`}
            </style>
        </Layout>
    );
}

Page.getInitialProps = async ({ query }) => {
    const { id } = query;
    let page;
    try {
        page = await Contentful.getEntry(id);
    }
    catch(e) {
        console.log('Failed to load page: ', e.message);
    }
    return { page };
};

export default Page
