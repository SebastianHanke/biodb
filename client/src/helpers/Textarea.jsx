/*
* @flow
* */

import React from 'react';

export default React.createClass({
    render (): any {
        return (
            <li>
                <label>{this.props.label}:</label>
                <textarea name={this.props.name}
                          cols="10"
                          rows={this.props.rows || 5}
                          onChange={this.props.handleChange}
                          placeholder={this.props.placeholder}
                          required={this.props.required || false}
                />
            </li>
        )
    },
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        required: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        handleChange: React.PropTypes.func.isRequired
    }
})