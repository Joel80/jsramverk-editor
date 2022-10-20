import Editor from "@monaco-editor/react";
import docInterface from '../../interfaces/doc';

export default function CodeEditor({codeEditorRef, monacoRef, handleCodeEditorChange, currentDoc}: {monacoRef: any, codeEditorRef: any, handleCodeEditorChange(param1: string | undefined): void, currentDoc: docInterface}) {

    function handleEditorDidMount(editor: any, monaco: any) {
        codeEditorRef.current = editor;
        monacoRef = monaco;
    }

    return (
        <Editor
            height="20vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            onChange={handleCodeEditorChange}
            value={currentDoc.html}
            theme="vs-dark"
        />
    );
}