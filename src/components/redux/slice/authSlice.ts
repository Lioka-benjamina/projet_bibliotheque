import { createSlice } from "@reduxjs/toolkit";
import { ApiLogin, ApiRegister } from "../asyncThunk/authThunk";
import { jwtDecode } from 'jwt-decode';

export const AuthSlice = createSlice({
    name : "auth/slice" ,
    initialState : {
        loading : false,
        message : "",
        signUp : {
            status : "find",
            data : {}  
        },
        login : {
            status : "find",
            data : {}  
        },
        token : {
            status : false,
            value : ""
        },
        error : {
            status : false,
            value : "" as string | undefined |null
        }
    },
    reducers:{
        setCleanAuth(state){
            state.token.status = false
        },
        clearMsg(state,_action){
            state.message = ""
        }
    },

    extraReducers(builder) {
        builder
            .addCase(ApiRegister.pending , (state) =>{
                state.loading = true
            })
            .addCase(ApiRegister.fulfilled , (state , action) =>{
                state.loading = false
                state.signUp.status = "found"
                state.signUp.data = jwtDecode(action.payload.token)
                state.token.status = true
                state.token.value = action.payload.token
            })
            .addCase(ApiRegister.rejected, (state, action) => {
                state.loading = false
                state.error = {status:false, value: action.error.message}
            }) ;

        builder
            .addCase(ApiLogin.pending , (state)=>{
                state.loading = true
            })
            .addCase(ApiLogin.fulfilled , (state , action)=>{

                console.log(typeof(action.payload));
                state.loading = false
                if(typeof(action.payload) == "string"){
                    state.message = action.payload
                }else{

                    state.login.status = "found"
                    state.login.data = jwtDecode(action.payload.token)
                    
                    state.token.status = true
                    state.token.value = action.payload.token
                }
            })
            .addCase(ApiLogin.rejected , (state,action)=>{
                state.loading = false
                state.error = {status:false, value: action.error.message}
            })
    },
})

export const {setCleanAuth,clearMsg} = AuthSlice.actions
