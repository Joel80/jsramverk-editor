/* @ts-ignore */
import Trix from "trix/dist/trix";
import { Editor, TrixEditor } from "react-trix";
import "./trix.css";
import docInterface from '../../interfaces/doc';
/* @ts-ignore */
//import Trix from "trix"


export default function Texteditor({ handleChange, currentDoc }: {handleChange(param1: string, param2: string): void, currentDoc: docInterface} ) {

    Trix.config.textAttributes.comment = { 
      tagName: "comment",
      style: {
        backgroundColor: "purple",
        selection: {
          background: "pink"
        }
      },
    }
    
    const handleEditorReady = (editor: Editor) => {
        editor.insertString("");
    };

  


    /* const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let editedDoc = {...currentDoc};
        editedDoc.name = e.target.value;
        setCurrentDoc(editedDoc);
    }  */
  
    return(
      <div data-testid="editor">
        <TrixEditor value={currentDoc.html} className="trix-content" autoFocus={false} onChange={handleChange} onEditorReady={handleEditorReady} mergeTags={[]} />
      </div>
      
    );
}