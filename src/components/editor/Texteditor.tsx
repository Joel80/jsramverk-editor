import "trix/dist/trix";
import { Editor, TrixEditor } from "react-trix";
import "./trix.css";
import "./nameForm.css";
import docInterface from '../../interfaces/doc';


export default function Texteditor({ handleChange, handleNameChange, currentDoc, setCurrentDoc }: {handleChange(param1: string, param2: string): void, handleNameChange(param: React.ChangeEvent<HTMLInputElement> ): void, currentDoc: docInterface, setCurrentDoc(param: docInterface): void} ) {

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
        <input  className="document-name-form" onChange={handleNameChange} value={currentDoc.name}></input>
        <TrixEditor value={currentDoc.html} className="trix-content" /* autoFocus={true}  */onChange={handleChange} onEditorReady={handleEditorReady} mergeTags={[]} />
      </div>
      
    );
  }