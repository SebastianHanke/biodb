import React from 'react';
import ReactDOM from 'react-dom';
import {Map, List} from 'immutable';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

var styles = require('./styles/styles.styl');

import reducer from './reducers';

import {AppContainer} from './components/App';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);