import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APP_URL = "http://localhost:3000"
const controller = "emprunt"

export const createEmprunt = createAsyncThunk(
    "create/emprunt",
    async (data : FormData) => {
        try {
          const res = await axios.post(`${APP_URL}/${controller}` , data)   
          return res.data
        } catch (error : any) {
// Correction de la gestion d'erreur
            throw new Error(error.response?.data?.message || "Erreur lors de la création de l'emprunt");
        }
    }
)

export const findAllEmprunt = createAsyncThunk(
    "All/emprunt",
    async()=>{
        try {
            const res = await axios.get(`${APP_URL}/${controller}`)
            return res.data
        } catch (error: any) {
// Correction de la gestion d'erreur
            throw new Error(error.response?.data?.message || "Erreur lors de la création de l'emprunt");
        }
    }
)

export const findOneEmprunt = createAsyncThunk(
    "one/emprunt",
    async(id:number)=>{
        try {
            const res = await axios.get(`${APP_URL}/${controller}/${id}`)
            return res.data
        } catch (error: any) {
// Correction de la gestion d'erreur
            throw new Error(error.response?.data?.message || "Erreur lors de la création de l'emprunt");
        }
    }
)

// export const updateEmprunt = createAsyncThunk(
//     "update/emprunt",
//     async(id:number , data )=>{
//         try {
//             const res = await axios.get(`${APP_URL}/${controller}/${id}`)
//             return res.data
//         } catch (error: any) {
//             throw new (error.response.data.message)
//         }
//     }
// )

// export const deleteEmprunt = createAsyncThunk(
//     "delete/emprunt",
//     async(id:number)=>{
//         try {
//             const res = await axios.delete(`${APP_URL}/${controller}/${id}`)
//             return res.data
//         } catch (error: any) {
//             throw new (error.response.data.message)
//         }
//     }
// )