import { useState } from "react";
import docInterface from "../../../interfaces/doc";

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
            <label htmlFor="email-share">Email</label>
            <input type="email" name="email-share" onChange={changeHandler}></input>
            
            <button onClick={addUser}>Share</button>
        </>
    )
}