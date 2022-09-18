import SaveButton from '../savebutton/Savebutton'
import DocDropDown from '../docDropDown/DocDropDown';
import "./Toolbar.css";
import docInterface from '../../../interfaces/doc';

export default function Toolbar(
    {setLoadedDoc, setSavedDoc, setDocumentSaved, /*  setDocumentLoaded, */ docs, setCurrentDoc, currentDoc}: {setLoadedDoc(param: docInterface): void, setSavedDoc(param: docInterface): void, setDocumentSaved(param: boolean): void, /* setDocumentLoaded(param: boolean): void, */ docs: docInterface[], setCurrentDoc(param: docInterface): void, currentDoc: docInterface}) {


    return (
        <div className="App-toolbar">
            <DocDropDown setLoadedDoc={setLoadedDoc} /* setDocumentLoaded={setDocumentLoaded} */ setCurrentDoc={setCurrentDoc} docs = {docs} />
            <SaveButton setCurrentDoc={setCurrentDoc} setSavedDoc={setSavedDoc} setDocumentSaved={setDocumentSaved} currentDoc={currentDoc}/>
        </div>
    )
}
