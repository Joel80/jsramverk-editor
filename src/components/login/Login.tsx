import { useState } from "react";
import authModel from "../../models/auth"
import UserInterface from '../../interfaces/user';
import './loginForm.css';
const validator = require('email-validator');

export default function Login({setToken, setUserEmail}: {setToken(param: string): void, setUserEmail(param: string): void}) {

    

    const [user, setUser] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let obj: UserInterface = {};

        obj[event.target.name] = event.target.value;

        setUser({...user, ...obj});

    }

    async function register() {

        if (!validator.validate(user.email)) {
            flashMessage("E-mail not ok, could not register user!")
            return;
        } 

        await authModel.register(user);
        const result = await authModel.login(user);

        if(result.data.token) {
            setToken(result.data.token);
        }

        if (result.data.email) {
            setUserEmail(result.data.email);
        }
    }
    
    async function login() {
       const result = await authModel.login(user);

       if(result.data.token) {
            setToken(result.data.token);
       } else {
            flashMessage(result.data.errors.message);
       }

       if (result.data.email) {
            setUserEmail(result.data.email);
        }
    }

    function flashMessage(mess: string){
        setTimeout(()=> {
            setMessage("");
        }, 5000);
        setMessage(mess);
    }

    return(
        <div className="login">
            <h2 className="login-heading">Login or register</h2>
            <p className="login-text">
                By registring you will be able to use The Real-Time Collaborative Text Editor and share your documents with other users.
            </p>
            <label className="form-label" htmlFor="email">E-mail</label>
            <input className="form-input" type="email" name="email" onChange={changeHandler}></input>
            
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-input" type="password" name="password" onChange={changeHandler}></input>
            {message?
                <div className="warning">{message}</div>
                :
                <></>
            }
            <button className="login-button" onClick={login}>Log in</button>
            <button className="register-button" onClick={register}>Register</button>
            
        </div>
    )
}