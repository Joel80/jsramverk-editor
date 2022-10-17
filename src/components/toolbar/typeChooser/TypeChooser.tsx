import { MutableRefObject } from "react";
import docInterface from "../../../interfaces/doc";

export default function TypeChooser({codeMode, setCurrentDoc, setLoadedDoc}: {codeMode: MutableRefObject<boolean>, setCurrentDoc(param: docInterface): void, setLoadedDoc(param: docInterface): void}) {

    function handleModeChange() {
        codeMode.current = !codeMode.current;
        let doc = {_id: null, name:"No title", html:"", allowed_users: [], code: codeMode.current, comments: []}
        setCurrentDoc(doc);
        setLoadedDoc(doc);

        console.log(codeMode.current);
    }

    return (
            <>
                <label>Code mode</label>
                <input id="typeChooser" type="checkbox" onChange={handleModeChange} /> 
            </>
            
    );
};