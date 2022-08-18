import "./Savebutton.css";

export default  function SaveButton() {
    function handleClick() {
        //console.log("Clicked");
        const editorElement = document.querySelector("trix-editor");
        console.log(editorElement.editor.getDocument().toString());
      }

    return (
        <button className="Savebutton" onClick={handleClick}>Save</button> 
    );
};
 