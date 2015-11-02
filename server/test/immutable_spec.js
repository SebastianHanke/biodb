import {expect} from 'chai';
import {List, Map} from 'immutable';

/*
*
* get accustomed to immutability and the immutableJS library
*
* */

describe('Immutability', () => {

    describe('a number', () => {

        function increment (currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            const state = 1;
            const nextState = increment(state);

            expect(nextState).to.equal(2);
            expect(state).to.equal(1);
        });
    });

    describe('a List', () => {

        function addPrimer (currentState) {
            return currentState.push('PrimerC');
        };

        it('is immutable', () => {
            const state = List.of('PrimerA', 'PrimerB');
            const nextState = addPrimer(state);

            expect(nextState).to.equal(List.of(
                'PrimerA',
                'PrimerB',
                'PrimerC'
            ));
            expect(state).to.equal(List.of(
                'PrimerA',
                'PrimerB'
            ));
        });
    });

    describe('a Map', () => {

        function addPrimerNames (currentState) {
            return currentState.set(
                'name',
                currentState.get('name').push('PrimerC')
            )
        };

        it('is immutable', () => {
            const state = Map({
                name: List.of('PrimerA', 'PrimerB')
            });
            const nextState = addPrimerNames(state);

            expect(state).to.equal(Map({
                name: List.of('PrimerA', 'PrimerB')
            }));

            expect(nextState).to.equal(Map({
                name: List.of('PrimerA', 'PrimerB', 'PrimerC')
            }));
        })
    });
})