import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { BlockDefinition } from '../models/block-definition';

function ProtocolBlockQuestionFormGroup({question, setQuestion}: {
    question?: string;
    setQuestion: (question?: string) => void;
}) {
    return (
        <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter a question"
                value={question}
                onInput={(e: React.FormEvent<HTMLInputElement>) => setQuestion((e.target as HTMLInputElement).value)}
            />
        </Form.Group>
    );
}

function ProtocolBlockOptionsFormGroup({options, setOptions}: {
    options?: string[];
    setOptions: (options?: string[]) => void;
}) {
    return ()
}

export interface ProtocolBlockEditorProps {
    block?: BlockDefinition;
    setBlock: (block?: BlockDefinition) => void;
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
    
    switch (props.block.type) {
        case 'text-question':
            return (
                <ProtocolBlockQuestionFormGroup
                    question={props.block.question}
                    setQuestion={question => props.setBlock({ ...props.block, type: 'text-question', question })}
                />
            );
        case 'options-question':
            return <>
                <ProtocolBlockQuestionFormGroup
                    question={props.block.question}
                    setQuestion={question => props.setBlock({ ...props.block, type: 'text-question', question })}
                />
                <Form.Group>
                    <Form.Label>Options</Form.Label>
                    <Form.Control type="text" placeholder="Enter a question" value={props.block.question} onInput={(e: React.FormEvent<HTMLInputElement>) => props.setBlock({
                        ...props.block,
                        type: 'text-question',
                        question: (e.target as HTMLInputElement).value,
                    })} />
                </Form.Group>
            </>;
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
