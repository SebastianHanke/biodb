import React from 'react';
import ReactDOM from 'react-dom';
import {Map, List} from 'immutable';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {setState} from './action_creators';
import reducer from './reducer';

import {AppContainer} from './components/App';

const store = createStore(reducer);

store.dispatch({
    type: 'SET_STATE',
    state: {
        id: '0001',
        name: 'Ampicilin',
        author: 'Sebastian',
        userId: '1000',
        isPrivate: 'true',
        fwd: {
            sequence: 'ACGACTGACTGACTGAC',
            annealingTemperature: '78',
            meltingTemperature: '77'
        },
        rev: {
            sequence: 'ATCTGCTGGCTTTCGA',
            annealingTemperature: '83',
            meltingTemperature: '92'
        }
    }
})

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);