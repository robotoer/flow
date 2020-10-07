import React from 'react';
import { Button, Dropdown, Form, NavDropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { BlockDefinition } from '../models/block-definition';
import { ProtocolEditorPageParams } from '../pages/ProtocolEditorPage';

export interface ProtocolBlockEditorProps {
    block?: BlockDefinition;
}

// Need to support the following types of blocks:
// - Qualitative question
// - Checklist
// - 4x96 plate -> sampler -> 384 plate
// - 384 plate -> add reagent -> 384 plate
// - 384 plate -> sequencer -> 384 results lookup table
export function ProtocolBlockEditor(props: ProtocolBlockEditorProps) {
    if (!props.block) {
        return (
            <div className="row">
                <Button variant="primary">
                    Select a block type
                </Button>
            </div>
        );
    }
    
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [description, setDescription] = React.useState<Node[]>([]);

    const { id } = useParams<ProtocolEditorPageParams>();

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
                                {props.block.question ? props.block.question : "Select a user"}
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
