import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { reducer, initializeStore } from '../core/state';

const makeStore = (initialState) => {
    return createStore(reducer, initialState);
};

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        // fetch initial 'global' data used on all pages
        const state = ctx.store.getState();
        if (!state.initialized) {
            await initializeStore(ctx.store);
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