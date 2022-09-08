import SaveButton from '../savebutton/Savebutton'
import DocDropDown from '../docDropDown/DocDropDown';
import "./Toolbar.css";
import docInterface from '../../../interfaces/doc';

export default function Toolbar(
    {setDocumentSaved, setDocumentLoaded, docs, setCurrentDoc, currentDoc}: {setDocumentSaved(param: boolean): void, setDocumentLoaded(param: boolean): void, docs: docInterface[], setCurrentDoc(param: docInterface): void, currentDoc: docInterface}) {


    return (
        <div className="App-toolbar">
            <DocDropDown setDocumentLoaded={setDocumentLoaded} setCurrentDoc={setCurrentDoc} docs = {docs} />
            <SaveButton setCurrentDoc={setCurrentDoc} setDocumentSaved={setDocumentSaved} currentDoc={currentDoc}/>
        </div>
    )
}
