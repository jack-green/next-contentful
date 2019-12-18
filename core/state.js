import Contentful from './contentful';

// default state
const defaultState = {
    initialized: false,
    menu: null,
};

// reducer
export const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'INITIALIZING':
            return {
                ...state,
                initialized: true,
            };
        case 'INITIALIZED':
            return {
                ...state,
                menu: action.menu,
            };
        default:
            return state;
    }
}

// init
export async function initializeStore(store) {
    store.dispatch({ type: 'INITIALIZING' });

    // Load menus
    const menus = await Contentful.getEntries({
        'content_type': 'menu',
        'fields.title': 'Main Menu',
    });
    // todo: catch error if we can't load the menu

    // extract our main menu
    store.dispatch({
        type: 'INITIALIZED',
        menu: menus.items[0].fields.items,
    });
}
