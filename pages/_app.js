import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { reducer } from '../core/state';
import Contentful from '../core/contentful';

const makeStore = (initialState) => {
    return createStore(reducer, initialState);
};

// init
const fetchInitialData = async (store) => {
    store.dispatch({ type: 'INITIALIZING' });

    // Load menus
    let menus;
    try {
        menus = await Contentful.getEntries({
            'content_type': 'menu',
            'fields.title': 'Main Menu',
        });
    }
    catch(e) {
        console.log('Unable to load menus', e.message);
    }

    // extract our main menu
    store.dispatch({
        type: 'INITIALIZED',
        menu: menus.items.length ? menus.items[0].fields.items : [],
    });
};

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        // fetch initial 'global' data used on all pages
        const state = ctx.store.getState();
        if (!state.initialized) {
            await fetchInitialData(ctx.store);
        }
        
        // trigger the regular page's getInitialProps
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return { pageProps };

    }

    render() {
        const { Component, pageProps, store } = this.props;

        // wrap the page in a redux state provider.
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default withRedux(makeStore)(MyApp);