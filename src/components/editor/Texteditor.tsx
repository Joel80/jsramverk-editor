import "trix/dist/trix";
import { Editor, TrixEditor } from "react-trix";
import "./trix.css";
import "./nameForm.css";
import docInterface from '../../interfaces/doc';


export default function Texteditor({ currentDoc, setCurrentDoc }: {currentDoc: docInterface, setCurrentDoc(param: docInterface): void} ) {

    //console.log("Rendering editor");

    //console.log(`Log from editor: ${currentDoc.html}`);
    //const editorElement = document.querySelector("trix-editor") as any | null;
    //editorElement?.editor.loadHTML(currentDoc.html);


    /* function setEditorContent(content, triggerChange) {
        let element = document.querySelector("trix-editor");
  
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        element.editor.insertHTML(content);
    } */


    const handleEditorReady = (editor: Editor) => {
        editor.insertString("");
    };

    const handleChange = (html: string, text: string) => {
        //console.log(html);
        //console.log(el);
        let editedDoc = {...currentDoc};
        editedDoc.html=html;
        //console.log(currentDoc.html);
        setCurrentDoc(editedDoc);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let editedDoc = {...currentDoc};
        editedDoc.name = e.target.value;
        setCurrentDoc(editedDoc);
    } 
  
    return(
      <div>
        <input  className="document-name-form" onChange={(e) => handleNameChange(e)} value={currentDoc.name}></input>
        <TrixEditor value={currentDoc.html} className="trix-content" autoFocus={true} onChange={handleChange} onEditorReady={handleEditorReady} mergeTags={[]} />
      </div>
      
    );
  }