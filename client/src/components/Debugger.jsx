import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';
import {fromJS} from 'immutable';

export const Debugger = React.createClass({
    render () {
        //this key does the warning, when removing debugger it will be gone
        return (
            <div>
                <h2>Actual state....</h2>
                <p><strong>name</strong>: {this.props.name}</p>
                <p><strong>id</strong>: {this.props.id}</p>
                <p><strong>author</strong>: {this.props.author}</p>
                <p><strong>userId</strong>: {this.props.userId}</p>
                <p><strong>isPrivate</strong>: {this.props.isPrivate}</p>
                <p><strong>targetSeq</strong>: {this.props.targetSeq}</p>
                <p><strong>fwdSeq</strong>: {this.props.fwdSeq}</p>
                <p><strong>revSeq</strong>: {this.props.revSeq}</p>
                <p><strong>activeWindow</strong>: {this.props.activeWindow}</p>
            </div>
        )
    }
})


function mapStateToProps(state) {
    return {
        name: state.getIn(['primer','name']),
        id: state.getIn(['primer','id']),
        author: state.getIn(['primer','author']),
        userId: state.getIn(['primer','userId']),
        isPrivate: state.getIn(['primer','isPrivate']),
        targetSeq: state.getIn(['primer', 'targetSeq']),
        fwdSeq: state.getIn(['primer', 'fwdSeq']),
        revSeq: state.getIn(['primer', 'revSeq']),
        activeWindow: state.get('activeWindow')
    }
}

export const DebuggerContainer = connect(mapStateToProps, actionCreators)(Debugger);