//import SaveButton from '../savebutton/Savebutton'
import CreateButton from '../createButton/CreateButton'
import DocDropDown from '../docDropDown/DocDropDown';
import ShareForm from '../shareForm/ShareForm';
import PdfGenerator from '../pdfGenerator/PdfGenerator'
import "./Toolbar.css";
import docInterface from '../../../interfaces/doc';

export default function Toolbar(
    {handleClick, setLoadedDoc, docs, setCurrentDoc, currentDoc, token, setUsers, users, createPdf}: {
        handleClick(): void, 
        setLoadedDoc(param: docInterface): void, 
        setSavedDoc(param: docInterface): void, 
        setDocumentSaved(param: boolean): void,
        docs: docInterface[], 
        setCurrentDoc(param: docInterface): void, 
        currentDoc: docInterface,
        token: string,
        setUsers(param: []): void,
        users: string[],
        createPdf(): void
    }
    ){

    return (
        <div className="App-toolbar">
            <DocDropDown setLoadedDoc={setLoadedDoc} setCurrentDoc={setCurrentDoc} docs = {docs} token={token} setUsers={setUsers} />
            <CreateButton handleClick={handleClick} />
            {currentDoc._id?
                <>
                    <ShareForm setCurrentDoc={setCurrentDoc} currentDoc={currentDoc} setUsers={setUsers} users={users}/>
                    <PdfGenerator createPdf={createPdf} />
                </>
                
                :
                <></>
            }
            
        </div>
    )
}
