import "trix/dist/trix";
import { Editor, TrixEditor } from "react-trix";
import "./trix.css";

export default function Texteditor() {

    const handleEditorReady = (editor: Editor) => {
        editor.insertString("");
    };
  
    const handleChange = (html: string, text: string) => {
        //console.log(html);
    };
  
    return(
      <TrixEditor /* className="trix-content" */ autoFocus={true} onChange={handleChange} onEditorReady={handleEditorReady} mergeTags={[]}/>
    );
  }