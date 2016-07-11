import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './routes';
import { configureStore } from './store';
//require('es6-promise').polyfill();

const initialState = window.INITIAL_STATE || {};
const store = configureStore(initialState);


const onUpdate = () => window.scrollTo(0, 0);
const routes = (
    <Provider store={store}>
        <Router history={browserHistory} onUpdate={onUpdate}>{Routes}</Router>
    </Provider>
);

window.onload = () => {
  ReactDOM.render(routes, document.getElementById('app'));
};
