//import { Editor, TrixEditor } from "react-trix";
import "./Savebutton.css";
import docInterface from '../../../interfaces/doc';
import docModel from '../../../models/docs';

export default  function SaveButton({currentDoc}: {currentDoc: docInterface}) {
    function handleClick() {
        //console.log("Clicked");
        const editorElement = document.querySelector("trix-editor") as any | null;
        // Output as text
        console.log(`Content as unformatted string:  ${editorElement?.editor.getDocument().toString()}`);
        //Output as html
        console.log(`Content as html-value: ${editorElement.value}`);

        if (currentDoc._id === null ) {
            //currentDoc.html = editorElement?.editor.getDocument();
            docModel.saveDoc(currentDoc);
        } else {
          //currentDoc.html = editorElement?.editor.getDocument();
          docModel.updateDoc(currentDoc);
        }


      }

    return (
            <button className="Savebutton" onClick={handleClick}>Save</button> 
    );
};
