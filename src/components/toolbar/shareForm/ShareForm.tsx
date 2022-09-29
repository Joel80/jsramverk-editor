import { useState } from "react";
import docInterface from "../../../interfaces/doc";
import './shareForm.css';

export default function ShareForm({setCurrentDoc, currentDoc}: {setCurrentDoc(param: docInterface): void, currentDoc: docInterface}) {

    const [newUser, setNewUser] = useState("");

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {

        let user = event.target.value;
        
        setNewUser(user);
    }

    
    async function addUser() {
        const copy = Object.assign({}, currentDoc);

        copy.allowed_users.push(newUser);

        console.log(copy.allowed_users);

        setCurrentDoc(copy);
    }

    return(
        <>
            <label className="form-label" htmlFor="email-share">Add a user by e-mail: </label>
            <input className="form-input" type="email" name="email-share" onChange={changeHandler}></input>
            
            <button className="share-button" onClick={addUser}>Share</button>
        </>
    )
}