import {List, Map} from 'immutable';

primerState = Map({
    id: 'integer',
    name: 'string',
    author: 'string',
    userID: 'integer',
    isPrivate: List.of('true', 'false'),
    timeOfCreation: 'date',
    comments: Map({
        author: 'string',
        comment: 'string',
        date: 'date'
    }),
    pcrTypes: List.of('qPCR', 'Hot-start', 'Nested', 'Sequencing', 'Touchdown', 'Colony', 'Northern', 'Southern', 'Western'),
    targetSequence: Map({
        sequence: 'string',
        length: 'integer',
        containingGenes: List.of('geneName')
    }),
    customStorageID: 'string or integer',
    fwd: Map({
        sequence: 'string',
        annealingTemperature: 'float',
        meltingTemperature: 'float',
        startingPositionOnTargetSequence: 'integer',
        endPositionOnTargetSequence: 'integer',
        compatiblePrimers: List.of('compatiblePrimerIds.rev')
    }),
    rev: Map({
        sequence: 'string',
        annealingTemperature: 'float',
        meltingTemperature: 'float',
        startingPositionOnTargetSequence: 'integer',
        endPositionOnTargetSequence: 'integer',
        compatiblePrimers: List.of('compatiblePrimerIds.fwd')
    })
});