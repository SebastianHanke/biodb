/*
*
* action creators
*
* type: actionType
* action e.g. action.state or action.primerStats
*
* @flow
*/

export function setState(state: Object): Object {
    return {
        type: 'SET_STATE',
        payload: state
    }
}

export function analyzePrimer(primerStats: Object): Object {
    return {
        type: 'ANALYZE_PRIMER',
        primerStats
    }
}

export function addPrimer(primerStats: Object): Object {
    return {
        type: 'ADD_PRIMER',
        primerStats
    }
}

export function updatePrimer(primerStats: Object): Object {
    return {
        type: 'UPDATE_PRIMER',
        payload: primerStats
    }
}

export function searchPrimer(identifier: String): Object {
    return {
        type: 'SEARCH_PRIMER',
        identifier
    }
}

export function deletePrimer(identifier: String): Object {
    return {
        type: 'DELETE_PRIMER',
        identifier
    }
}