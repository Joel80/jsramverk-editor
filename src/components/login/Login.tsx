import { useState } from "react";
import authModel from "../../models/auth"
import UserInterface from '../../interfaces/user';

export default function Login({setToken, setUserEmail}: {setToken(param: string): void, setUserEmail(param: string): void}) {

    const [user, setUser] = useState({});

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let obj: UserInterface = {};

        obj[event.target.name] = event.target.value;

        setUser({...user, ...obj});


    }
    async function register() {
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
       }

       if (result.data.email) {
        setUserEmail(result.data.email);
    }
    }

    return(
        <>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" onChange={changeHandler}></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={changeHandler}></input>

            <button onClick={register}>Register</button>
            <button onClick={login}>Log in</button>
        </>
    )
}