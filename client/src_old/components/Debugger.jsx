import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {fromJS} from 'immutable';

export const Debugger = React.createClass({
    getItems () {
        return fromJS(this.props).toList() || [];
    },
    render () {
        //this key does the warning, when removing debugger it will be gone
        return (
            <div>

                {this.getItems().map(item => <li key={item}>{item}</li>)}
            </div>
        )
    }
})


function mapStateToProps(state) {
    return {
        id: state.get('id'),
        name: state.get('name'),
        author: state.get('author'),
        userId: state.get('userId'),
        isPrivate: state.get('isPrivate')
    };
}

export const DebuggerContainer = connect(mapStateToProps, actionCreators)(Debugger);