import React from 'react';
import { Form } from 'react-bootstrap';
import { useRecoilValueLoadable } from 'recoil';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { protocolsQuery } from '../state/selectors';

export function ProtocolEditorPage() {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [description, setDescription] = React.useState<Node[]>([]);

    const protocols = useRecoilValueLoadable(protocolsQuery);

    return <Form>
        <Form.Group controlId="formProtocolTitle">
            <Form.Label>Protocol Title</Form.Label>
            <Form.Control type="text" />
        </Form.Group>
        <Slate editor={editor} value={description} onChange={newValue => setDescription(newValue)}>
            <Editable />
        </Slate>

        {}
    </Form>
}
