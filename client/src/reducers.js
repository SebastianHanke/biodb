/*
*
* @flow
* */

import { Map } from 'immutable';

/*
*
* set initial state
* */

const initialState = new Map({
    primer: new Map({
    })
});

function analyzePrimer (state: Object, input: Object): Object {
    const inputToNewStateMap = new Map({
        activeWindow: 'Analyzer',
        primer : input
    })
    return state.mergeDeep(inputToNewStateMap)

}

export const primerReducer = function (state: Object = initialState, action: Object = {}): Object {
    switch (action.type) {
        case 'ANALYZE_PRIMER':
            return analyzePrimer(state, action.primerStats)
        default:
            return state
    }
}