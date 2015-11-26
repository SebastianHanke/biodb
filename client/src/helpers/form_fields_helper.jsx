/*
import React from 'react';

// use with <RenderSelectBox selectOptions={['ja', 'nein']} selectMenuId='isPrivate' selectLabel='Is Private' />

export const RenderTextInput =  React.createClass({
    render () {
        const id = this.props.inputId;
        const label = this.props.inputLabel;
        return (
            <div key={id}>
                <label>{label}:</label>
                <div>
                    <input type="text" ref={id} />
                </div>
            </div>
        )
    }
})
export const RenderSelectBox = React.createClass({
    render () {
        const options = this.props.selectOptions;
        const id = this.props.selectMenuId;
        const label = this.props.selectLabel;
        return (
            <div>
                <label>{label}:</label>
                <div>
                    <select ref={id}>
                        {options.map(item => {
                            return <option key={item} value={item}>{item}</option>
                        })}
                    </select>
                </div>
            </div>
        )
    }
})*/

import {Map} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';

export function renderTextInput (id, label, type) {
    return (
        <li>
            <label>{label}:</label>
            <input type={type} ref={id} onChange={this.handleChange} required/>
        </li>
    )
}

export function renderSelectBox (id, label, options) {
    return (
        <li>
            <label>{label}:</label>
            <select ref={id}>
                {options.map(item => {
                    return <option key={item} value={item}>{item}</option>
                    })
                }
            </select>
        </li>
    )
}

export function renderCheckbox (id, label, options) {
    return (
        <li>
            <label>{label}:</label>
            <div className="roundedCheckbox">
                {
                    //here necessary to go functional because react cannot return multiple components inside a map
                    options.map(item => {
                        return React.DOM.div({
                            children:[
                                React.DOM.input({
                                    key: item,
                                    type: 'checkbox',
                                    name: id,
                                    value: item
                                    }),
                                React.DOM.span({
                                    key: 'label-'+item,
                                    children: [
                                        item
                                        ]
                                    })]
                            })
                        }
                        )
                    }
            </div>
        </li>
    )
}

export function renderTextarea (id, label) {
    return (
        <li>
            <label>{label}:</label>
            <textarea ref={id} cols="10" rows="5" onChange={this.props.handleChange} require></textarea>
        </li>
    )
}

export function renderRadioButton (id, label, options) {

    return (
        <li>
            <label>{label}:</label>
            {
                //here necessary to go functional because react cannot return multiple components inside a map
            options.map(item => {
                return React.DOM.div({
                    children:[
                        React.DOM.input({
                            ref: id,
                            key: item,
                            type: 'radio',
                            name: id,
                            value: item
                            }),
                        React.DOM.span({
                            key: 'label-'+item,
                            children: [
                                item
                                ]
                            })]
                    })
                }
                )
            }
        </li>
    )
}