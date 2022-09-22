//import SaveButton from '../savebutton/Savebutton'
import CreateButton from '../createButton/CreateButton'
import DocDropDown from '../docDropDown/DocDropDown';
import "./Toolbar.css";
import docInterface from '../../../interfaces/doc';

export default function Toolbar(
    {handleClick, setLoadedDoc, setSavedDoc, setDocumentSaved, /*  setDocumentLoaded, */ docs, setCurrentDoc, currentDoc}: {handleClick(): void, setLoadedDoc(param: docInterface): void, setSavedDoc(param: docInterface): void, setDocumentSaved(param: boolean): void, /* setDocumentLoaded(param: boolean): void, */ docs: docInterface[], setCurrentDoc(param: docInterface): void, currentDoc: docInterface}) {


    return (
        <div className="App-toolbar">
            <DocDropDown setLoadedDoc={setLoadedDoc} /* setDocumentLoaded={setDocumentLoaded} */ setCurrentDoc={setCurrentDoc} docs = {docs} />
            {/* <SaveButton setCurrentDoc={setCurrentDoc} setSavedDoc={setSavedDoc} setDocumentSaved={setDocumentSaved} currentDoc={currentDoc}/> */}
            <CreateButton handleClick={handleClick} />
        </div>
    )
}
