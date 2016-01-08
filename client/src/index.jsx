/*
* @flow
* */

import React from 'react';
import ReactDOM from 'react-dom';
import { Map, List } from 'immutable';
import { Provider } from 'react-redux';

require('./styles/styles.styl');

import { store } from './store';
import { AppContainer } from './components/App';


ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);