import React from 'react'

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

const Home = ({ page }) => (
    <Layout title={page.fields.title}>
        <Hero field={page.fields.heroImage} title={page.fields.title} />
        <div className="tiles">
            {page.fields.tiles.map((field) => (
                <Tile key={field.sys.id} field={field} />
            ))}
        </div>
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

Home.getInitialProps = async ({ req }) => {

    // load welcome page.
    const welcome = await Contentful.getEntries({
        'content_type': 'welcomePage'
    });

    // todo: handle a situation where the page can't be found

    return {
        page: welcome.items[0],
    };
};

export default Home
