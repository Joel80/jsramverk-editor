import docInterface from '../../../interfaces/doc';

const documentModel = require('../../../models/docs');

export default  function DocDropDown({setDocumentLoaded, docs, setCurrentDoc}: { setDocumentLoaded(param: boolean): void, docs: docInterface[], setCurrentDoc(param: docInterface): void}) {

    async function fetchDoc (e: React.ChangeEvent<HTMLSelectElement>) {
        //console.log(e.target.value);

        const id = e.target.value.trim().toString();

        console.log(id);

        if (id !== "-99") {
            const fetchedDoc = await documentModel.getOneDocById(id);
            setCurrentDoc(fetchedDoc);
            setDocumentLoaded(true);
        } else {
            setCurrentDoc({_id: null, name:"Noname", html:""});
            setDocumentLoaded(true);
        }
        

        //console.log(fetchedDoc);

    }

    return (
            <select onChange={(e) => fetchDoc(e)} className="DocList">
                <option value="-99" key="0">New document</option>
                {docs.map((doc: docInterface, index:number) => <option value={doc._id || ""} key={index}>{doc.name} - {doc._id}</option>)}
            </select> 
    );
};
