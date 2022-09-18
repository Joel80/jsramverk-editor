//import { Editor, TrixEditor } from "react-trix";
import "./Savebutton.css";
import docInterface from '../../../interfaces/doc';
import docModel from '../../../models/docs';

export default  function SaveButton({setCurrentDoc, setSavedDoc, setDocumentSaved, currentDoc}: {setCurrentDoc(param: docInterface): void, setSavedDoc(param:docInterface): void, setDocumentSaved(param:boolean): void, currentDoc: docInterface}) {
  
    async function handleClick() {
        //console.log("Clicked");
        /* const editorElement = document.querySelector("trix-editor") as any | null;
        // Output as text
        console.log(`Content as unformatted string:  ${editorElement?.editor.getDocument().toString()}`);
        //Output as html
        console.log(`Content as html-value: ${editorElement.value}`); */

        if (currentDoc.name && currentDoc.html) {
            if (currentDoc._id === null ) {
                const result = await docModel.saveDoc(currentDoc);
                const fetchedDoc = await docModel.getOneDocById(result.id);
                setSavedDoc(fetchedDoc);
                setCurrentDoc(fetchedDoc);
                setDocumentSaved(true);
            } else {
              //currentDoc.html = editorElement?.editor.getDocument();
              docModel.updateDoc(currentDoc);
              setSavedDoc(currentDoc);
              setDocumentSaved(true);
            }
        } else {
            console.log("A document needs both a title and content to be saved!");
        }
    }

    return (
            <button className="Savebutton" onClick={handleClick}>Save</button> 
    );
};
