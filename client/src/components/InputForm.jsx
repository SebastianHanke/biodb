import React from 'react';
import forEach from 'lodash/collection/forEach';
import {fromJS} from 'immutable';
import Textarea from '../helpers/Textarea';
import Textinput from '../helpers/Textinput';
import Radioinput from '../helpers/Radioinput';

import {SequenceTools as Sequence} from '../helpers/calculation_helpers';
import {renderTextInput, renderSelectBox, renderCheckbox, renderTextarea, renderRadioButton} from '../helpers/form_fields_helper'

export default React.createClass({
    handleChange (event) {
        //TODO: maybe refactor so that the getIn('primer') will be at the reducer function so this just returns a simple object and keeping it pure
        const inputData = {};

        if (event.target.name === 'targetSeq') inputData[event.target.name] = event.target.value.toUpperCase()
        else if (event.target.name === 'fwdSeq') inputData[event.target.name] = event.target.value.toUpperCase()
        else if (event.target.name === 'revSeq') inputData[event.target.name] = event.target.value.toUpperCase()
        else inputData[event.target.name] = event.target.value

        var test = new Sequence('DNA', event.target.value, event.target.name)
        console.log(test)

        this.props.analyzePrimer(fromJS(inputData))
    },
    analyzeInput (event) {
        //TODO: not needed anymore, as its analyzed in realtime...
        event.preventDefault()
        console.log('analyze', event.target)
    },
    render () {
        return (
            <div className="input_form">
                <ul>
                    <Textinput name="id"
                               label="ID"
                               type="number"
                               disabled={true}
                               placeholder="set automatically, when submitting to db"
                               handleChange={this.handleChange}
                    />
                    <Textinput name="name"
                               label="Name"
                               type="text"
                               required={true}
                               handleChange={this.handleChange}
                    />
                    <Textinput name="author"
                               label="Author"
                               type="text"
                               handleChange={this.handleChange}
                    />
                    <Textinput name="userId"
                               label="User-ID"
                               type="number"
                               handleChange={this.handleChange}
                    />
                    <Textarea name="targetSeq"
                              label="targetSequence"
                              handleChange={this.handleChange}
                    />
                    <Textarea name="fwdSeq"
                              label="fwd Sequence"
                              rows="2"
                              required={true}
                              placeholder="5' to 3' direction"
                              handleChange={this.handleChange}
                    />
                    <Textarea name="revSeq"
                              label="rev Sequence"
                              rows="2"
                              required={true}
                              placeholder="3' to 5' direction"
                              handleChange={this.handleChange}
                    />
                    <Radioinput name="isPrivate"
                                label="is Private"
                                options={['ja', 'nein']}
                                handleChange={this.handleChange}
                    />
                    <button className="create"
                            onClick={this.analyzeInput}>
                        Create
                    </button>
                    <button onClick={this.analyzeInput}>Create</button>
                </ul>
            </div>
        )
    }
})