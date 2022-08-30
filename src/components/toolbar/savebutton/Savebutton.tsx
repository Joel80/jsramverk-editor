//import { Editor, TrixEditor } from "react-trix";
import "./Savebutton.css";

export default  function SaveButton() {
    function handleClick() {
        //console.log("Clicked");
        const editorElement = document.querySelector("trix-editor") as any | null;
        /* console.log(editorElement);
        console.log(editorElement.getDocument()); */
        console.log(editorElement?.editor.getDocument().toString());
      }

    return (
        <button className="Savebutton" onClick={handleClick}>Save</button> 
    );
};
