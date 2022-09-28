//import SaveButton from '../savebutton/Savebutton'
import CreateButton from '../createButton/CreateButton'
import DocDropDown from '../docDropDown/DocDropDown';
import ShareForm from '../shareForm/ShareForm';
import "./Toolbar.css";
import docInterface from '../../../interfaces/doc';

export default function Toolbar(
    {handleClick, setLoadedDoc, docs, setCurrentDoc, currentDoc}: {
        handleClick(): void, 
        setLoadedDoc(param: docInterface): void, 
        setSavedDoc(param: docInterface): void, 
        setDocumentSaved(param: boolean): void,
        docs: docInterface[], 
        setCurrentDoc(param: docInterface): void, 
        currentDoc: docInterface
    }
    ){


    return (
        <div className="App-toolbar">
            <DocDropDown setLoadedDoc={setLoadedDoc} setCurrentDoc={setCurrentDoc} docs = {docs} />
            <ShareForm setCurrentDoc={setCurrentDoc} currentDoc={currentDoc}/>
            <CreateButton handleClick={handleClick} />
        </div>
    )
}
