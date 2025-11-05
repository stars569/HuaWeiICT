import { AxiosError } from "axios"
import { basicData } from "../types/authtype"
import { Notyf } from 'notyf'

export default function errorHandle(error: unknown){
    const notify = new Notyf()
    const axiosError = error as AxiosError
    if(!axiosError.response){
        notify.error('未响应')
    }
    else{
        const response = axiosError.response.data as basicData
        notify.error(response.message)
    }
}