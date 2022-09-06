const documentModel = require('../../../models/docs');

export default  function DocDropDown({docs}:any) {
    
    async function fetchDoc (e: React.ChangeEvent<HTMLSelectElement> ) {
        //console.log(e.target.value);

        const id = e.target.value.trim().toString();

        console.log(id);
        const fetchedDoc = await documentModel.getOneDocById(id); 

        console.log(fetchedDoc);

    }

    return (
            <select onChange={(e) => fetchDoc(e)} className="DocList">
                <option value="-99" key="0">Choose a document</option>
                {docs.map((doc:any, index:number) => <option value={doc._id} key={index}>{doc.name} - {doc._id}</option>)}
            </select> 
    );
};
