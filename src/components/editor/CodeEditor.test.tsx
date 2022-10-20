import { render, screen } from '@testing-library/react';
import CodeEditor from './CodeEditor';

test('code editor renders loading screen', async () => {

    const codeEditorRef = {
        current: null
    }

    const monacoRef = {
        current: null
    }

    const doc = {
        _id: "1",
        name: "A name",
        html: "// some comment",
        allowed_users: ["jolf20@bth.se"],
        code: true,
        comments: []
    };

    const mockHandleCodeEditorChange = jest.fn();

    render(<CodeEditor codeEditorRef={codeEditorRef} monacoRef={monacoRef} handleCodeEditorChange={mockHandleCodeEditorChange} currentDoc={doc} />);

    const codeEditor = await screen.findByText("Loading...");

    expect(codeEditor).toBeInTheDocument();
    //screen.debug();

 });