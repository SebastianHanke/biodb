/*
*
* action creators
*
* type: actionType
* action e.g. action.state or action.primerStats
*
*/

export function setState(state) {
    return {
        type: 'SET_STATE',
        payload: state
    }
}

export function analyzePrimer(primerStats) {
    return {
        type: 'ANALYZE_PRIMER',
        primerStats
    }
}

export function addPrimer(primerStats) {
    return {
        type: 'ADD_PRIMER',
        primerStats
    }
}

export function updatePrimer(primerStats) {
    return {
        type: 'UPDATE_PRIMER',
        payload: primerStats
    }
}

export function searchPrimer(identifier) {
    return {
        type: 'SEARCH_PRIMER',
        identifier
    }
}

export function deletePrimer(identifier) {
    return {
        type: 'DELETE_PRIMER',
        identifier
    }
}