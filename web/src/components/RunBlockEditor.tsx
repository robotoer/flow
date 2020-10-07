import React from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Run } from '../models/run';

export interface RunBlockEditorProps {
    run?: Run;
}

export function RunBlockEditor(props: RunBlockEditorProps) {
    switch (props.block.type) {
        case 'text-question':
            return (
                <div>
                    {props.block.question && <Form.Label>{props.block.question}</Form.Label>}
                    <Slate editor={editor} value={description} onChange={newValue => setDescription(newValue)}>
                        <Editable />
                    </Slate>
                </div>
            );
        case 'options-question':
            switch (props.block.optionType) {
                case "menu-item":
                case "user":
                    return (
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id={`formUserQuestion-${props.block.id}`}>
                                {props.block.question ? props.block.question : (props.block.optionType === "menu-item" ? "Select an item" : "Select a user")}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {props.block.options && props.block.options.map(option => <Dropdown.Item>{option}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                default:
                    return (
                        <Form.Group controlId={`formOptionsQuestion-${props.block.id}`}>
                            {props.block.question && <Form.Label>{props.block.question}</Form.Label>}
                            <Form.Check type={props.block.optionType}></Form.Check>
                        </Form.Group>
                    );
            }
        case 'plate-sampler':
            return (

            );
        case 'plate-add-reagent':
            return (

            );
        case 'plate-sequencer':
            return (

            );
        default:
            return (
                <div>
                    TODO: ProtocolBlockEditor
                </div>
            );
    }
}
