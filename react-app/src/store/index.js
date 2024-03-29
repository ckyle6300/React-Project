import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import session from './session'
import dbcoins from './dbcoins'
import coins from './coins'
import onecoin from './onecoin'
import watchlist from './watchlist'
import portfolio from './portfolio'
import history from './history'
import stories from './stories'


const rootReducer = combineReducers({
    session,
    dbcoins,
    coins,
    onecoin,
    watchlist,
    portfolio,
    history,
    stories
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
