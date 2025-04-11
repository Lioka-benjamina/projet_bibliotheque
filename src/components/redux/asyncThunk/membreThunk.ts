import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const controller = "membres";
const APP_URL = "http://localhost:3000"

export const createMembre = createAsyncThunk(
    "addMembre/add",
    async (data:FormData) => {
        try {
            const res = await axios.post(`${APP_URL}/${controller}` , data)
            return res.data
        } catch (error : any) {
            throw new (error.response.data.message)
        }
    }

)

export const findAllMembre = createAsyncThunk(
    "findAllMembre/findAll",
    async () => {
        try {
            const res = await axios.get(`${APP_URL}/${controller}`)
            return res.data
        } catch (error : any) {
            throw new (error.response.data.message)
        }
    }
)

export const deleteMembre = createAsyncThunk(
    "deleteMembre/delete",
    async (id: number) => {
        try{
            const res = await axios.delete(`${APP_URL}/${controller}/${id}`)
            return res.data
        }
        catch(error:any){
            throw new Error(error.response.data.message)
        }
    }
)