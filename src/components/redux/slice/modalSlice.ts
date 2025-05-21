import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
    name : 'modal/slice',
    initialState : {
        adminModal : {
            active : false
        },
        rendreModal : {
            id: null as number | null,
            active : false
        },
        addModal : {
            active : false 
        },
        
        deleteModal : {
            id:null,
            confirm : false ,
            active : false
        },
        deleteLivreModal : {
            id : null,
            active : false,
            confirm : false
        }
    },
    reducers : {
        setAdminModal(state ,  action){
            state.adminModal = action.payload
        },
        setRendreModal(state , action){
            
            state.rendreModal = action.payload
        },
        setAddModal(state , action){
            state.addModal = action.payload
        },
        setDeleteModal(state , action){
            state.deleteModal = action.payload
        },
        setDeleteLivre(state,action){
            state.deleteLivreModal = action.payload
        }
    }

})

export const { 
    setAdminModal , 
    setRendreModal , 
    setAddModal , 
    setDeleteModal ,
    setDeleteLivre
} = ModalSlice.actions