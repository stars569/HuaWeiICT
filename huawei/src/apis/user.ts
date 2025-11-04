import axios from "axios";
import { basicResponse, registerForm } from "../types/authtype";

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