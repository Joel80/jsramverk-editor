import "trix/dist/trix";
import { Editor, TrixEditor } from "react-trix";

export default function Texteditor() {

    const handleEditorReady = (editor: Editor) => {
        editor.insertString("");
    };
  
    const handleChange = (html: string, text: string) => {
        
    };
  
    return(
      <TrixEditor  autoFocus={true} onChange={handleChange} onEditorReady={handleEditorReady} mergeTags={[]}/>
    );
  }