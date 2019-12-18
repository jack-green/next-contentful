import Head from 'next/head';
import Header from './header';

const Layout = ({ children, title }) => (
    <div className="layout">
        <Head>
            <title>{`Contentful / Next - ${title}`}</title>
        </Head>
        
        <Header />
        {children}
        <style jsx>{`
            :global(body) {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
                Helvetica, sans-serif;
                padding: 0;
            }
            .layout {
                max-width: 1100px;
                padding: 0 50px;
                margin: 0 auto;
            }
        `}</style>
    </div>
);

export default Layout;
