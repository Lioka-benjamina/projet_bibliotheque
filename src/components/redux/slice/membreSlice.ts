import { createSlice } from "@reduxjs/toolkit";
import { createMembre, deleteMembre, findAllMembre } from "../asyncThunk/membreThunk";

interface Membre {
    id : number
    nom : string
    prenom : string
    numero_mobile : number
    email : string
    genre : string
    image : string
    date_adhesion : Date
}

export const MembreSlice = createSlice({
    name : "membre/slice",
    initialState : {
        loading : false ,
        
        addMembre : {
            create_ok : false
        },

        allMembre : {
            status : "find",
            data : [] as Membre[],
            dataFilter : [] as Membre[],
            search : ""
        } ,

        removeMembre:{
            delete_ok: false
        },

        error : {
            status : false,
            value : "" as string | null | undefined
        }
    },
    reducers : {
        setCleanMembre(state){
            state.addMembre.create_ok = false,
            state.removeMembre.delete_ok = false
        },
        setSearchMembre(state , action){
            const searchValue = action.payload.toLowerCase()
            state.allMembre.search = searchValue

            state.allMembre.dataFilter = state.allMembre.data.filter((membre) => 
                membre.nom.toLocaleLowerCase().includes(searchValue) ||
                membre.prenom.toLocaleLowerCase().includes(searchValue) ||
                membre.email.toLocaleLowerCase().includes(searchValue) 
            )
        },
        setClearValueMembre(state){
            state.allMembre.search = ""
            state.allMembre.dataFilter = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createMembre.pending , (state) => {
                state.loading = true
            })
            .addCase(createMembre.fulfilled ,  (state , action) => {
                state.loading = false
                state.addMembre.create_ok = true
                state.allMembre.data.push(action.payload)
            })
            .addCase(createMembre.rejected ,  (state , action) => {
                state.loading = false
                state.error.status = true
                state.error.value = action.error.message
            })

        builder
            .addCase(findAllMembre.pending , (state)=>{
                state.loading = true
            })
            .addCase(findAllMembre.fulfilled , (state,action)=>{
                state.loading = false
                state.allMembre.status = "found"
                state.allMembre.data = action.payload
                state.allMembre.dataFilter = action.payload
            })
            .addCase(findAllMembre.rejected ,  (state , action) => {
                state.loading = false
                state.error.status = true
                state.error.value = action.error.message
            })
        
        builder
            .addCase(deleteMembre.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteMembre.fulfilled, (state, action) => {
                state.loading = false,
                state.removeMembre.delete_ok = true,
                state.allMembre.data = state.allMembre.data.filter(item => item.id != action.payload.id);
            })
            .addCase(deleteMembre.rejected, (state, action) => {
                state.loading = false,
                state.error = {status: true, value: action.error.message}
            })
    },

})

export const {setCleanMembre,setSearchMembre} = MembreSlice.actions