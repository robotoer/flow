import React from 'react';
import { Button, Form, FormControl, InputGroup, Table } from 'react-bootstrap';
import { UpcScan } from 'react-bootstrap-icons';
import { TextQuestionBlock, OptionsQuestionBlock, PlateSamplerBlock, PlateAddReagentBlock, PlateSequencerBlock, Block } from '../models/block';
import { OptionsQuestionBlockDefinition, PlateAddReagentBlockDefinition, PlateSamplerBlockDefinition, PlateSequencerBlockDefinition, TextQuestionBlockDefinition } from '../models/block-definition';

function RunBlockTextQuestion({definition, answer, setAnswer}: {
    definition: TextQuestionBlockDefinition;
    answer?: string;
    setAnswer: (answer?: string) => void;
}) {
    return (
        <Form.Group>
            <Form.Label>{definition.name}</Form.Label>
            <Form.Control
                type="text"
                value={answer}
                onInput={(e: React.FormEvent<HTMLInputElement>) => setAnswer((e.target as HTMLInputElement).value)}
            />
        </Form.Group>
    );
}

function RunBlockOptionsQuestion({definition, answer, setAnswer}: {
    definition: OptionsQuestionBlockDefinition;
    answer?: string;
    setAnswer: (answer?: string) => void;
}) {
    switch (definition.optionType) {
        case 'switch':
        case 'radio':
        case 'checkbox':
        default:
            const optionType: 'switch' | 'radio' | 'checkbox' = definition.optionType || 'checkbox';
            return <div>
                <Form.Label>{definition.name || 'Select an option'}</Form.Label>
                {definition.options && definition.options.map((option, i) => <Form.Check
                    key={i}
                    radioGroup="run-block"
                    type={optionType}
                    id={`run-block-${i}`}
                    label={option}
                    onClick={() => setAnswer(option)}
                />)}
            </div>
        case 'menu-item':
        case 'user':
            return <Form.Group>
                <Form.Label>{definition.name || 'Select an option'}</Form.Label>
                <Form.Control
                    as="select"
                    value={answer}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAnswer((e.target as HTMLSelectElement).value)}
                >
                    {definition.options && definition.options.map((option, i) => <option key={i}>{option}</option>)}
                </Form.Control>
            </Form.Group>
    }
}

function cloneArrayToSize<T>(size: number, defaultValue: T, original?: T[]): T[] {
    const newPlateLabels = new Array<T>(size);
    for (let i = 0; i < size; i++) {
        if (original && original.length > i) {
            newPlateLabels[i] = original[i];
        } else {
            newPlateLabels[i] = defaultValue;
        }
    }
    return newPlateLabels;
}

function RunBlockPlateLabelEditor({wells, label, setLabel}: {
    wells?: number;
    label?: string;
    setLabel: (label?: string) => void;
}) {
    return <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text>{wells || 96}-well</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
            placeholder="Enter a plate label"
            aria-label="Enter a plate label"
            value={label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel((e.target as HTMLInputElement).value)}
        />
        <InputGroup.Append>
            <Button variant="secondary" disabled={true}>
                <UpcScan /> Scan
            </Button>
        </InputGroup.Append>
    </InputGroup>
}

function RunBlockPlateSamplerEditor({definition, outputPlateLabel, setOutputPlateLabel, plateLabels, setPlateLabels}: {
    definition: PlateSamplerBlockDefinition;
    outputPlateLabel?: string;
    setOutputPlateLabel: (outputPlateLabel?: string) => void;
    plateLabels?: string[];
    setPlateLabels: (plateLabels?: string[]) => void;
}) {
    const inputRows: JSX.Element[] = [];
    for (let i = 0; i < (definition.plateCount || 0); i++) {
        inputRows.push(<tr key={i}>
            <th>Input Plate {i}</th>
            <td>
                <RunBlockPlateLabelEditor
                    wells={definition.plateSize}
                    label={plateLabels ? plateLabels[i] : undefined}
                    setLabel={label => {
                        if (label !== undefined) {
                            const newPlateLabels = cloneArrayToSize(definition.plateCount || 0, '', plateLabels);
                            newPlateLabels[i] = label;
                            setPlateLabels(newPlateLabels);
                        }
                    }}
                />
            </td>
        </tr>);
    }
    const outputRows: JSX.Element[] = [
        <tr>
            <th>Output Plate</th>
            <td>
                <RunBlockPlateLabelEditor
                    wells={398}
                    label={outputPlateLabel}
                    setLabel={setOutputPlateLabel}
                />
            </td>
        </tr>
    ]
    return <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Plate Label</th>
            </tr>
        </thead>
        <tbody>
            {inputRows}
            {outputRows}
        </tbody>
    </Table>
}

function RunBlockPlateAddReagentEditor({definition, plateLabel, setPlateLabel}: {
    definition: PlateAddReagentBlockDefinition;
    plateLabel?: string;
    setPlateLabel: (plateLabel?: string) => void;
}) {
    return (
        <Form.Group>
            <Form.Label>Plate with reagent ({definition.reagentLabel}) added</Form.Label>
            <RunBlockPlateLabelEditor
                wells={definition.plateSize}
                label={plateLabel}
                setLabel={setPlateLabel}
            />
        </Form.Group>
    );
}

function RunBlockPlateSequencerEditor({definition, plateLabel, setPlateLabel}: {
    definition: PlateSequencerBlockDefinition;
    plateLabel?: string;
    setPlateLabel: (plateLabel?: string) => void;
}) {
    return (
        <Form.Group>
            <Form.Label>Sequenced plate</Form.Label>
            <RunBlockPlateLabelEditor
                wells={definition.plateSize}
                label={plateLabel}
                setLabel={setPlateLabel}
            />
        </Form.Group>
    );
}

export interface RunBlockEditorProps {
    block?: Block;
    setBlock: (block?: Block) => void;
}

export function RunBlockEditor(props: RunBlockEditorProps) {
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
        case 'text-question': {
            const block: TextQuestionBlock = props.block;
            return (
                <RunBlockTextQuestion
                    definition={block.definition}
                    answer={block.answer}
                    setAnswer={answer => props.setBlock({ ...block, type: 'text-question', answer })}
                />
            );
        }
        case 'options-question': {
            const block: OptionsQuestionBlock = props.block;
            return (
                <RunBlockOptionsQuestion
                    definition={block.definition}
                    answer={block.answer}
                    setAnswer={answer => props.setBlock({ ...block, type: 'options-question', answer })}
                />
            );
        }
        case 'plate-sampler': {
            const block: PlateSamplerBlock = props.block;
            return (
                <RunBlockPlateSamplerEditor
                    definition={block.definition}
                    outputPlateLabel={block.outputPlateLabel}
                    setOutputPlateLabel={outputPlateLabel => props.setBlock({ ...block, type: 'plate-sampler', outputPlateLabel })}
                    plateLabels={block.plateLabels}
                    setPlateLabels={plateLabels => props.setBlock({ ...block, type: 'plate-sampler', plateLabels })}
                />
            );
        }
        case 'plate-add-reagent': {
            const block: PlateAddReagentBlock = props.block;
            return (
                <RunBlockPlateAddReagentEditor
                    definition={block.definition}
                    plateLabel={block.plateLabel}
                    setPlateLabel={plateLabel => props.setBlock({ ...block, type: 'plate-add-reagent', plateLabel })}
                />
            );
        }
        case 'plate-sequencer': {
            const block: PlateSequencerBlock = props.block;
            return (
                <RunBlockPlateSequencerEditor
                    definition={block.definition}
                    plateLabel={block.plateLabel}
                    setPlateLabel={plateLabel => props.setBlock({ ...block, type: 'plate-sequencer', plateLabel })}
                />
            );
        }
        default:
            return (
                <div>
                    TODO: RunBlockEditor
                </div>
            );
    }
}
