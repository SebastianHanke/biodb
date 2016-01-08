/*
* @flow
* */

import React from 'react';

/*
*
* here necessary to go functional because react
* cannot return multiple components inside a map
*
* */

export default React.createClass({
    render (): any {
        return (
            <li>
                <label>{this.props.label}:</label>
                {
                    this.props.options != undefined
                        ? this.props.options.map(option => {
                            return React.DOM.div({
                                children:[
                                    React.DOM.input({
                                        onChange: this.props.handleChange,
                                        key: 'labelinput-'+ option,
                                        type: 'radio',
                                        name: this.props.name,
                                        value: option,
                                        required: this.props.required
                                    }),
                                    React.DOM.span({
                                        key: 'label-'+ option,
                                        children: [
                                            option
                                        ]
                                    })
                                ]
                            })
                        })
                        : ''
                }
            </li>
        )
    },
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        options: React.PropTypes.arrayOf(React.PropTypes.string),
        handleChange: React.PropTypes.func.isRequired
    }
})