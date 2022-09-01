//import { Editor, TrixEditor } from "react-trix";
import "./Savebutton.css";

export default  function SaveButton() {
    function handleClick() {
        //console.log("Clicked");
        const editorElement = document.querySelector("trix-editor") as any | null;
        // Output as text
        console.log(`Content as unformatted string:  ${editorElement?.editor.getDocument().toString()}`);
        //Output as html
        console.log(`Content as html-value: ${editorElement.value}`);

      }

    return (
            <button className="Savebutton" onClick={handleClick}>Save</button> 
    );
};
