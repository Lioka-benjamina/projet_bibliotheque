import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const controller = "users";
const APP_URL = "http://localhost:3000"

export const ApiRegister = createAsyncThunk(
    "register/create",
    async (data: FormData) => {
        try{
            const res = await axios.post(`${APP_URL}/${controller}/register`, data)
            return res.data
        }
        catch(error: any){
            throw new (error.response.data.message)
        }
    }
)

export const ApiLogin = createAsyncThunk(
    "login/create",
    async (data : FormData) => {
        try{
            const res = await axios.post(`${APP_URL}/${controller}/login`, data)
            
            return res.data
        }
        catch(error: any){
            throw new (error.response.data.message)
        }
    }
)