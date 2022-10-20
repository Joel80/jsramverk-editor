import { useState } from "react";
import docInterface from "../../../interfaces/doc";
import docsModel from "../../../models/docs";
import './shareForm.css';

export default function ShareForm({setCurrentDoc, currentDoc, setUsers, users, userEmail, token}: 
    {
        setCurrentDoc(param: docInterface): void, 
        currentDoc: docInterface, setUsers(param: string[]): void, 
        users: string[],
        userEmail: string,
        token: string
    }) {

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

        let newUsers = [...users];

        newUsers.push(newUser);

        setUsers(newUsers);

        setCurrentDoc(copy);

        setNewUser("");
        setValue("");
        flashMessage("User added!")

        await docsModel.emailNewUser(userEmail, newUser, token);
    }

    return(
        <>
            <label className="form-label" htmlFor="email-share">Add a user by e-mail: </label>
            <input data-testid="add-user-input" className="form-input" type="email" name="email-share" onChange={changeHandler} value={value}></input>
            {message?
                <div className="success">{message}</div>
                :
                <></>

            }
            
            <button className="share-button" onClick={addUser}>Share</button>
        </>
    )
}