import { createSlice } from "@reduxjs/toolkit";
import { createEmprunt, findAllEmprunt, findOneEmprunt } from "../asyncThunk/empruntThunk";

interface Emprunt {
    id : number
    membre : number
    livre :number
    date_emprunt : Date
    date_retour : Date
}

export const EmpruntSlice = createSlice({
    name : "emprunt/slice",
    initialState : {
        loading : false ,

        addEmprunt : {
            create_ok : false
        },

        allEmprunt : {
            status : "find",
            data : [] as Emprunt[],
            dataFilter : [] as Emprunt[],
            search : ""
        },

        oneEmprunt : {
            status : "find",
            data :  {} as Emprunt
        },

        uptEmprunt : {
            update_ok : false
        },

        removeEmprunt : {
            delete_ok : false
        },

        error : {
            status : false,
            value : "" as string | null | undefined
        }


    },
    reducers : {
        // Ajout d'un reducer pour réinitialiser l'état après un ajout réussi
        resetCreateState: (state) => {
            state.addEmprunt.create_ok = false;
        }
    },

    extraReducers(builder) {
        builder
            .addCase(createEmprunt.pending , (state)=>{
                state.loading = true
            })
            .addCase(createEmprunt.fulfilled , (state , action)=>{
                state.loading = false
                state.addEmprunt.create_ok = true
                // Vérification que action.payload existe avant de l'ajouter
                if (action.payload) {
                    state.allEmprunt.data.push(action.payload);
                }
            })
            .addCase(createEmprunt.rejected , (state , action)=>{
                state.loading = false
                state.error = {status: true, value: action.error.message}
            })

        builder
            .addCase(findAllEmprunt.pending , (state)=>{
                state.loading = true
            })
            .addCase(findAllEmprunt.fulfilled , (state , action)=>{
                state.loading = false
                state.allEmprunt.status = "found"
                state.allEmprunt.data = action.payload
            })
            .addCase(findAllEmprunt.rejected , (state , action)=>{
                state.loading = false
                state.error = {status: true, value: action.error.message}
            })

        builder
            .addCase(findOneEmprunt.pending , (state)=>{
                state.loading = true
            })
            .addCase(findOneEmprunt.fulfilled , (state , action)=>{
                state.loading = false
                state.oneEmprunt.status = "found"
                state.oneEmprunt.data = action.payload
            })
            .addCase(findOneEmprunt.rejected , (state , action)=>{
                state.loading = false
                state.error = {status: true, value: action.error.message}
            })
    },
})

export const{resetCreateState} = EmpruntSlice.actions