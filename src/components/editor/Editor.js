import "trix/dist/trix";
import { TrixEditor } from "react-trix";

export default function Editor() {

    const handleEditorReady = (editor) => {
      //editor.insertString("editor is ready");
    };
  
    const handleChange = (html, text) => {
  
    };
  
    return(
      <TrixEditor  autoFocus={true} onChange={handleChange} onEditorReady={handleEditorReady} />
    );
  }