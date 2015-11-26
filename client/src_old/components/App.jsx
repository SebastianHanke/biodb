import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import {Map} from 'immutable';

import {DebuggerContainer} from './Debugger';

export const App = React.createClass({

    handleChange () {
        const newState = new Map({
            id: this.refs.id.value,
            name: this.refs.name.value,
            author: this.refs.author.value,
            userId: this.refs.userId.value,
            isPrivate: this.refs.isPrivate.value
        })

        this.props.setState(newState);
    },

    handleSubmit (event) {
        event.preventDefault();
        // here ajax call?
        /*const newState = new Map({
            id: this.refs.id.value,
            name: this.refs.name.value,
            author: this.refs.author.value,
            userId: this.refs.userId.value,
            isPrivate: this.refs.isPrivate.value
        })

        this.props.setState(newState);*/

    },
    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderTextInput('id', 'Primer ID')}
                    {this.renderTextInput('name', 'Primer Name')}
                    {this.renderTextInput('author', 'Author')}
                    {this.renderTextInput('userId', 'User ID')}
                    {this.renderSelectBox('isPrivate', 'Is private', ['ja', 'nein'])}
                    <div>
                        <input type="submit" value="Speichern"/>
                    </div>
                </form>
                <DebuggerContainer />
            </div>
        )
    },
    renderTextInput (id, label) {
        return (
            <div key={id}>
                <label>{label}:</label>
                <div>
                    <input type="text" ref={id} onChange={this.handleChange.bind(this, {id})}/>
                </div>
            </div>
        )
    },
    renderSelectBox (id, label, options) {
        return (
            <div ref={id}>
                <label>{label}:</label>
                <div>
                    <select  onChange={this.handleChange.bind(this, {id})}>
                        {options.map(item => {
                            console.log(item)
                            return <option key={item} value={item}>{item}</option>
                        })}
                    </select>
                </div>
            </div>
        )
    }
});

/*
*
* make action UPDATE_STATE?
* make action COMMIT_STATE (db insert)?
*
* */

function mapStateToProps(state) {
    return {
        id: state.get('id'),
        name: state.get('name')
    };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);