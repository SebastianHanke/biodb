import React from 'react';

export default React.createClass({
    render () {
        return (
            <li>
                <label>{this.props.label}:</label>
                <input name={this.props.name}
                       type={this.props.type}
                       onChange={this.props.handleChange}
                       required={this.props.required || false}
                       disabled={this.props.disabled || false}
                       placeholder={this.props.placeholder}
                />
            </li>
        )
    },
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        type: React.PropTypes.oneOf(['text', 'number']),
        required: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        handleChange: React.PropTypes.func.isRequired
    }
})