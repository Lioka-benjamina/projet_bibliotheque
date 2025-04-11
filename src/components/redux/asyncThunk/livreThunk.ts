import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APP_URL  = "http://localhost:3000"
const controller = "livres"
export const createLivre = createAsyncThunk(
    "addLivre/livre",
    async (data : FormData)=>{
        try {
            const res = await axios.post(`${APP_URL}/${controller}` , data)
            return res.data
        } catch (error : any) {
            throw new (error.response.data.message)
        }
    }
)

export const findAllLivre = createAsyncThunk(
    "findAll/livre",
    async ()=>{
        try {
            const res = await axios.get(`${APP_URL}/${controller}`)
            return res.data
        } catch (error : any) {
            throw new (error.response.data.message)
        }
    }
)

export const findOneLivre = createAsyncThunk(
    "findOne/livre",
    async (id : number)=>{
        try {
            const res = await axios.get(`${APP_URL}/${controller}/${id}`)
            return res.data
        } catch (error : any) {
            throw new (error.response.data.message)
        }
    }
)

export const deleteLivre = createAsyncThunk(
    "delete/livre",
    async (id : number)=>{
        try {
            const res = await axios.delete(`${APP_URL}/${controller}/${id}`)
            return res.data
        } catch (error : any) {
            throw new (error.response.data.message)
        }
    }
)