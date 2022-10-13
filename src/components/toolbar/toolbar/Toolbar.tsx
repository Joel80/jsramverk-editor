import "./Toolbar.css";
import CreateButton from '../createButton/CreateButton'
import DocDropDown from '../docDropDown/DocDropDown';
import ShareForm from '../shareForm/ShareForm';
import PdfGenerator from '../pdfGenerator/PdfGenerator'
import TypeChooser from "../typeChooser/TypeChooser";
import docInterface from '../../../interfaces/doc';
import { MutableRefObject } from "react";

export default function Toolbar(
    {handleClick, setLoadedDoc, docs, setCurrentDoc, currentDoc, token, setUsers, users, createPdf, handleModeChange, codeMode, userEmail}: {
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
        createPdf(): void,
        handleModeChange(): void,
        codeMode: MutableRefObject<boolean>;
        userEmail: string
    }
    ){

    return (
        <div className="App-toolbar">
            <DocDropDown 
                setLoadedDoc={setLoadedDoc} 
                setCurrentDoc={setCurrentDoc} 
                docs = {docs} 
                token={token} 
                setUsers={setUsers}
                codeMode={codeMode}
            />
            <CreateButton handleClick={handleClick} />
            <TypeChooser handleModeChange={handleModeChange}/>
            {currentDoc._id?
                <>
                    <ShareForm setCurrentDoc={setCurrentDoc} currentDoc={currentDoc} setUsers={setUsers} users={users} userEmail={userEmail} token={token}/>
                    <PdfGenerator createPdf={createPdf} />
                </>
                
                :
                <></>
            }
            
        </div>
    )
}
