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

// Nouvelle action pour retourner un livre
export const retournerEmprunt = createAsyncThunk<any , number>(
    "emprunt/retourner",
    async (id, { rejectWithValue }) => {
      try {
        console.log("Tentative de retour de l'emprunt ID:", id);
        const response = await axios.put(`${APP_URL}/${controller}/${id}/retourner`);
        console.log("Réponse du serveur après retour:", response.data);
        return response.data;
      } catch (error : any) {
        return rejectWithValue(error.response?.data || "Une erreur s'est produite lors du retour du livre");
      }
    }
  );
  
  // Action pour prolonger un emprunt
  export const prolongerEmprunt = createAsyncThunk<any, number>(
    "emprunt/prolonger",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${APP_URL}/${controller}/${id}/prolonger`);
        return response.data;
      } catch (error : any) {
        return rejectWithValue(error.response?.data || "Une erreur s'est produite lors de la prolongation de l'emprunt");
      }
    }
  );


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
