import Editor from "@monaco-editor/react";

export default function CodeEditor({codeEditorRef, handleCodeEditorChange}: {codeEditorRef: any, handleCodeEditorChange(param1: string | undefined): void}) {

    function handleEditorDidMount(editor: any, monaco: any) {
        console.log("Editor did mount");
        codeEditorRef.current = editor;
        console.log(codeEditorRef);
    }

    return (
        <Editor
            height="20vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            onChange={handleCodeEditorChange}
        />
    );
}