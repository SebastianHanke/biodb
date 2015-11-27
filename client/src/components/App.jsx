import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

import InputForm from './InputForm';
import {DebuggerContainer} from './Debugger';
import {BarChart} from './Chart';
import {convertSequenceToArrayOfIntegers} from '../helpers/calculation_helpers';

console.log(convertSequenceToArrayOfIntegers('ATATWWNN'))

console.log('1: 746856836')
console.log('2: 4291593348')
1000 0100 0010 0001 1000 0100 0010 1100
1000 0100 1000 0100 1100 1100 1111 1111
1000 0100 0000 0000 1000 0100 0010 1100

export const App = React.createClass({
    render () {
        /*console.log('app props',this.props)*/
        return (
            <div>
                <InputForm {...this.props}/>
                {this.props.activeWindow === 'Analyzer'
                    ? <DebuggerContainer />
                    : 'Hello, pls type something into the input fields'}
                <BarChart />
            </div>
        )
    }
});

function mapStateToProps(state) {
    return {
        primer: {
            name: state.getIn(['primer','name']),
            id: state.getIn(['primer','id']),
            author: state.getIn(['primer','author']),
            userId: state.getIn(['primer','userId']),
            isPrivate: state.getIn(['primer','isPrivate']),
            targetSeq: state.getIn(['primer', 'targetSeq'])
        },
        activeWindow: state.get('activeWindow')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);