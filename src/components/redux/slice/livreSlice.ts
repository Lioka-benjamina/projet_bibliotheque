import { createSlice } from "@reduxjs/toolkit";
import { createLivre, deleteLivre, findAllLivre, findOneLivre } from "../asyncThunk/livreThunk";
// import {Livre} from "../../interface/interface"
interface Livre {
    id : number
    titre : string
    auteur : string
    categorie : string
    editeur : string
}

export const LivreSlice = createSlice({
    name : "livre/slice",
    initialState : {
        loading : false , 
        addLivre : {
            create_ok : false
        },
        allLivre : {
            status : "find",
            data : [] as Livre[],   //Tous les livres reçus de l'API
            filteredData : [] as Livre[],   // Les livres filtrés selon la recherche
            search : "" //La valeur saisie dans l'input de recherche,
        },
        oneLivre : {
            status : "find",
            data : {} as Livre
        },
        uptLivre : {
            update_ok : false
        },
        removeLivre : {
            delete_ok : false
        },
        error : {
            status : false,
            value : "" as null | undefined | string
        }
    },
    reducers : {
        resetCreateStateLivre: (state) => {
            state.addLivre.create_ok = false;
        }, 

        setCleanLivre(state){
            state.removeLivre.delete_ok = false
        },

        setSearchLivre(state, action) {
            const searchValue = action.payload.toLowerCase();   //met tout en minuscule pour comparaison (On récupère la valeur tapée par l’utilisateur et on la met en minuscule pour faire une recherche insensible à la casse.)

            state.allLivre.search = searchValue; // on stocke la recherche (On stocke la valeur tapée dans l’état search)

            if (searchValue === "") {
                state.allLivre.filteredData = []
                return
            }// Si l’utilisateur efface complètement la recherche, on vide filteredData pour revenir à la liste complète
        

            // state.allLivre.filteredData = state.allLivre.data.filter((livre) =>
            //     livre.titre.toLowerCase().includes(searchValue)  //filtre sur le titre
            // );

            state.allLivre.filteredData = state.allLivre.data.filter((livre) =>
                        livre.titre.toLowerCase().includes(searchValue) ||
                        livre.auteur.toLowerCase().includes(searchValue) ||
                        livre.categorie.toLowerCase().includes(searchValue)
            );
        },
        setFilterByCategorie(state,action){
            const categorie = action.payload.toLowerCase()
            state.allLivre.search = categorie

            state.allLivre.filteredData = state.allLivre.data.filter((livre) => livre.categorie.toLowerCase().includes(categorie))
        },

        setCleanSearchLivre(state) {
            state.allLivre.search = ""; //// on vide la recherche
            state.allLivre.filteredData = [];   // on vide le tableau filtré
        }

    },
    extraReducers(builder) {
        builder
            .addCase(createLivre.pending , (state) =>{
                state.loading = true
            })
            .addCase(createLivre.fulfilled, (state , action)=>{
                state.loading = false
                state.addLivre.create_ok = true
                state.allLivre.data.push(action.payload)
            })
            .addCase(createLivre.rejected , (state , action)=>{
                state.error.status = true
                state.error.value = action.error.message
            })
        
        builder
            .addCase(findAllLivre.pending , (state)=>{
                state.loading = true
            })
            .addCase(findAllLivre.fulfilled , (state , action)=>{
                state.loading = false
                state.allLivre.data = action.payload    //met les livres
                state.allLivre.filteredData = action.payload    //initialise le filtre avec toutes les données
            })
            .addCase(findAllLivre.rejected , (state , action)=>{
                state.loading = false
                state.error ={status : true , value : action.error.message }
            })
        builder
            .addCase(findOneLivre.pending , (state)=>{
                state.loading = true
            })
            .addCase(findOneLivre.fulfilled , (state , action)=>{
                state.loading = false
                state.oneLivre.data = action.payload
            })
            .addCase(findOneLivre.rejected , (state , action)=>{
                state.loading = false
                state.error ={status : true , value : action.error.message }
            })
        builder
            .addCase(deleteLivre.pending , (state)=>{
                state.loading = true
            })
            .addCase(deleteLivre.fulfilled , (state , action)=>{
                state.loading = false
                state.removeLivre.delete_ok = true
                state.allLivre.data = state.allLivre.data.filter(item => item.id != action.payload.id)
            })
            .addCase(deleteLivre.rejected , (state , action)=>{
                state.loading = false
                state.error ={status : true , value : action.error.message }
            })
    },
})

export const {setCleanLivre , setSearchLivre, setCleanSearchLivre , setFilterByCategorie , resetCreateStateLivre} = LivreSlice.actions