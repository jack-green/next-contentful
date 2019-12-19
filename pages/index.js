import React from 'react'
import Link from 'next/link';
import Error from 'next/error';
import Contentful from '../core/contentful';
import {
    Layout,
    RichText,
    Hero,
 } from '../components';

const Tile = ({ field }) => (
    <div className="tile">
        <img src={field.fields.image.fields.file.url} />
        <h3><a href={field.fields.link}>{field.fields.title}</a></h3>
        <style jsx>{`
            .tile {
                margin-right: 25px;
            }
            .tile img {
                width: 100%;
                height: auto;
            }`}
        </style>
    </div>
)

const Home = ({ page }) => {
    if (!page) if (!page)  return <Error statusCode={404} />;

    return (
        <Layout title={page.fields.title}>
            <Hero field={page.fields.heroImage} title={page.fields.title} />
            <div className="tiles">
                {page.fields.tiles.map((field) => (
                    <Tile key={field.sys.id} field={field} />
                ))}
            </div>
            <Link href="/page/ho8ashoahds">
                <a>
                    Broken Link
                </a>
            </Link>
            <style jsx>{`
                .tiles {
                    display: flex;
                    margin-bottom: 50px;
                    margin-right: -25px;
                    align-items: flex-end;
                }`}
            </style>
            <RichText document={page.fields.body} />
        </Layout>
    );
};

Home.getInitialProps = async ({ req }) => {

    // load welcome page.
    let welcome;
    try {
        welcome = await Contentful.getEntries({
            'content_type': 'welcomePage'
        });
    } catch(e) {
        console.log('Unable to load welcome page', e.message);
    }

    return {
        page: welcome && welcome.items.length ? welcome.items[0] : null,
    };
};

export default Home
