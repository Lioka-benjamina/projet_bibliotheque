import { configureStore } from "@reduxjs/toolkit";
import { ModalSlice } from "./slice/modalSlice";
import { AuthSlice } from "./slice/authSlice";
import { MembreSlice } from "./slice/membreSlice";
import { LivreSlice } from "./slice/livreSlice";
import { EmpruntSlice } from "./slice/empruntSlice";

export const storeRedux = configureStore({
    reducer : {
        modalStore : ModalSlice.reducer,
        autStore : AuthSlice.reducer,
        membreStore : MembreSlice.reducer,
        livreStore : LivreSlice.reducer,
        empruntStore : EmpruntSlice.reducer
    }
})

export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppDispatch = typeof storeRedux.dispatch