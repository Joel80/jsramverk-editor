import docInterface from '../../../interfaces/doc';
import docsModel from '../../../models/docs';
import "./DocDropDown.css";


export default  function DocDropDown({
    setLoadedDoc, 
    docs, 
    setCurrentDoc,
    token
    }: { 
        setLoadedDoc(param: docInterface): void,
        docs: docInterface[], 
        setCurrentDoc(param: docInterface): void,
        token: string
    }) {

    async function fetchDoc (e: React.ChangeEvent<HTMLSelectElement>) {
        //console.log(e.target.value);

        const id = e.target.value.trim().toString();

        //console.log(id);

        if (id !== "-99") {
            const fetchedDoc = await docsModel.getOneDocById(id, token);
            setCurrentDoc(fetchedDoc);
            setLoadedDoc(fetchedDoc);
            //setDocumentLoaded(true);
        } else {
            let doc = {_id: null, name:"No title", html:"", allowed_users: []}
            setCurrentDoc(doc);
            setLoadedDoc(doc);
            //setDocumentLoaded(true);
        }
        

        //console.log(fetchedDoc);
        //console.log(`Log from dropdown: ${currentDoc.name}`);

    }

    return (
            <select id="documentSelect" onChange={(e) => fetchDoc(e)} className="doc-list">
                <option value= "-99" key="0">Choose document</option>
                {docs.map((doc: docInterface, index:number) => <option value={doc._id || ""} key={index}>{doc.name} {/* - {doc._id} */}</option>)}
            </select> 
    );
};
