import { MutableRefObject } from 'react';
import docInterface from '../../../interfaces/doc';
import docsModel from '../../../models/docs';
import "./DocDropDown.css";


export default  function DocDropDown({
    setLoadedDoc, 
    docs, 
    setCurrentDoc,
    token,
    setUsers,
    codeMode
    }: { 
        setLoadedDoc(param: docInterface): void,
        docs: docInterface[], 
        setCurrentDoc(param: docInterface): void,
        token: string,
        setUsers(param: string[]): void,
        codeMode: MutableRefObject<boolean>
    }) {

    async function fetchDoc (e: React.ChangeEvent<HTMLSelectElement>) {

        const id = e.target.value.trim().toString();

        if (id !== "-99") {
            const fetchedDoc = await docsModel.getOneDocById(id, token);
            const docUsers = await docsModel.getUsers(fetchedDoc._id, token);
            codeMode.current = fetchedDoc.code;
            if (codeMode.current) {
                const typeChooser = document.getElementById("typeChooser") as HTMLInputElement | null;
                if (typeChooser) {
                    typeChooser.checked=true;
                }
            } else {
                const typeChooser = document.getElementById("typeChooser") as HTMLInputElement | null;
                if (typeChooser) {
                    typeChooser.checked=false;
                }
            }   
            setUsers(docUsers);
            setCurrentDoc(fetchedDoc);
            setLoadedDoc(fetchedDoc);
        } else {
            let doc = {_id: null, name:"No title", html:"", allowed_users: [], code: false, comments: []}
            setCurrentDoc(doc);
            setLoadedDoc(doc);
        }
    }

    return (
            <select id="documentSelect" onChange={(e) => fetchDoc(e)} className="doc-list">
                <option value= "-99" key="0">Choose document</option>
                {docs.map((doc: docInterface, index:number) => <option value={doc._id || ""} key={index}>{doc.name} {/* - {doc._id} */}</option>)}
            </select> 
    );
};
