import { useState } from "react";
import docInterface from "../../../interfaces/doc";
import './shareForm.css';

export default function ShareForm({setCurrentDoc, currentDoc}: {setCurrentDoc(param: docInterface): void, currentDoc: docInterface}) {

    const [newUser, setNewUser] = useState("");
    const [value, setValue] = useState("");
    const [message, setMessage] = useState("");

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {

        let user = event.target.value;
        
        setNewUser(user);
        setValue(event.target.value);
    }

    function flashMessage (mess: string) {
        setTimeout(()=> {
            setMessage("");
        }, 3000);

        setMessage(mess);
    }

    
    async function addUser() {
        const copy = Object.assign({}, currentDoc);

        copy.allowed_users.push(newUser);

        console.log(copy.allowed_users);

        setCurrentDoc(copy);

        setNewUser("");
        setValue("");
        flashMessage("User added!")
    }

    return(
        <>
            <label className="form-label" htmlFor="email-share">Add a user by e-mail: </label>
            <input className="form-input" type="email" name="email-share" onChange={changeHandler} value={value}></input>
            {message?
                <div className="success">{message}</div>
                :
                <></>

            }
            
            <button className="share-button" onClick={addUser}>Share</button>
        </>
    )
}