import "./CreateButton.css";
import docInterface from '../../../interfaces/doc';
import docModel from '../../../models/docs';

export default  function CreateButton({handleClick, setCurrentDoc, setSavedDoc, setDocumentSaved, currentDoc}: {handleClick(): void, setCurrentDoc(param: docInterface): void, setSavedDoc(param:docInterface): void, setDocumentSaved(param:boolean): void, currentDoc: docInterface}) {

    return (
            <button className="create-button" onClick={handleClick}>Create new doc</button> 
    );
};
