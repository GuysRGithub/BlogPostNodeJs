// import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import promiseMiddleware from "redux-promise"
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from "redux-thunk"
import Reducer from "./_reducers/index"
import React from 'react';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
require("datejs")

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()    )}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
