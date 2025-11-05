import axios from "axios";
import { basicResponse, loginForm, registerForm } from "../types/authtype";

export async function registerAPI(user: registerForm){
    try{
        const result: basicResponse = await axios.post('http://localhost:8080/server/register', {
            user
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return result
    }
    catch(error){
        throw error
    }
}

export async function loginAPI(user: loginForm){
    try{
        const result = await axios.post('http://localhost:8080/server/login', {
            user
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return result
    }
    catch(error){
        throw error
    }
}