import { createSlice } from "@reduxjs/toolkit";
import { createEmprunt, findAllEmprunt, findOneEmprunt, prolongerEmprunt, retournerEmprunt } from "../asyncThunk/empruntThunk";

// Types pour les entités
interface Membre {
    id: number;
    nom: string;
    prenom: string;
    numero_mobile: number;
    email: string;
    genre: string;
    image: string;
    date_adhesion: Date;
}

interface Livre {
    id: number;
    titre: string;
    auteur: string;
    categorie: string;
    editeur: string;
}

export interface Emprunt {
    id: number;
    membre: Membre;
    livre: Livre;
    date_emprunt: Date;
    date_retour: Date;
}

// Types pour les états du slice
interface AddEmpruntState {
    create_ok: boolean;
    loading?: boolean;
}

interface AllEmpruntState {
    status: "find" | "found" |"loading" | "error" | "success";
    data: Emprunt[];
    dataFilter: Emprunt[];
    search: string;
}

interface OneEmpruntState {
    status: "find" |"found" | "loading" | "error" | "success";
    data: Emprunt | Record<string, never>;
}

interface UpdateEmpruntState {
    update_ok: boolean;
    loading?: boolean;
}

interface DeleteEmpruntState {
    delete_ok: boolean;
    loading?: boolean;
}

interface ErrorState {
    status: boolean;
    value: string | null | undefined;
}

interface RetourEmpruntState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

interface ProlongationEmpruntState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

// Interface pour le state global du slice
interface EmpruntState {
    loading: boolean;
    addEmprunt: AddEmpruntState;
    allEmprunt: AllEmpruntState;
    oneEmprunt: OneEmpruntState;
    uptEmprunt: UpdateEmpruntState;
    removeEmprunt: DeleteEmpruntState;
    error: ErrorState;
    retourEmprunt: RetourEmpruntState;
    prolongationEmprunt: ProlongationEmpruntState;
}

// State initial avec le type approprié
const initialState: EmpruntState = {
    loading: false,

    addEmprunt: {
        create_ok: false
    },

    allEmprunt: {
        status: "find",
        data: [] as Emprunt[],
        dataFilter: [] as Emprunt[],
        search: ""
    },

    oneEmprunt: {
        status: "find",
        data: {} as Emprunt
    },

    uptEmprunt: {
        update_ok: false
    },

    removeEmprunt: {
        delete_ok: false
    },

    error: {
        status: false,
        value: null
    },
    
    retourEmprunt: {
        loading: false,
        error: null,
        success: false
    },

    prolongationEmprunt: {
        loading: false,
        error: null,
        success: false
    }
};



export const EmpruntSlice = createSlice({
    name : "emprunt/slice",
    initialState ,
    reducers : {
        // Ajout d'un reducer pour réinitialiser l'état après un ajout réussi
        resetCreateState: (state) => {
            state.addEmprunt.create_ok = false;
        },
        resetRetourState: (state) => {
            state.retourEmprunt.success = false;
          },
        resetProlongationState: (state) => {
        state.prolongationEmprunt.success = false;
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

        builder
             // RETOURNER EMPRUNT
            .addCase(retournerEmprunt.pending, (state) => {
            state.loading = true;
            state.retourEmprunt.error = null;
            state.retourEmprunt.success = false;
            })
            .addCase(retournerEmprunt.fulfilled, (state , action) => {
                state.loading = false;
                state.retourEmprunt.success = true;
                
                // Mise à jour directe de la liste des emprunts
                if (state.allEmprunt.data && Array.isArray(state.allEmprunt.data)) {
                    // Si l'action retourne l'ID de l'emprunt retourné
                    const empruntId = action.payload?.id || action.meta.arg;
                
                    // Supprimer l'emprunt de la liste ou mettre à jour son statut
                    state.allEmprunt.data = state.allEmprunt.data.filter(
                        (emprunt: Emprunt) => emprunt.id !== empruntId
                    );
                
                    // Mettre également à jour la liste filtrée
                    state.allEmprunt.dataFilter = state.allEmprunt.dataFilter.filter(
                        (emprunt: Emprunt) => emprunt.id !== empruntId
                    );
                }
            })
            .addCase(retournerEmprunt.rejected, (state, action) => {
            state.loading = false;
            state.error = {status: true, value: action.error.message};
            })

        builder
            // PROLONGER EMPRUNT
            .addCase(prolongerEmprunt.pending, (state) => {
                state.loading = true;
                state.prolongationEmprunt.error = null;
                state.prolongationEmprunt.success = false;
            })
            .addCase(prolongerEmprunt.fulfilled, (state) => {
                state.loading = false;
                state.prolongationEmprunt.success = true;
            })
            .addCase(prolongerEmprunt.rejected, (state, action) => {
                state.loading = false;
                state.error = {status: true, value: action.error.message};
            });

        // builder
        //     .addCase(deleteEmprunt.pending , (state)=>{
        //         state.loading = true
        //     })
        //     .addCase(deleteEmprunt.fulfilled , (state , action)=>{
        //         state.loading = false
        //         state.removeEmprunt.delete_ok = true
        //         state.allEmprunt.data = state.allEmprunt.data.filter(item => item.id != action.payload.id)
        //     })
        //     .addCase(deleteEmprunt.rejected , (state , action)=>{
        //         state.loading = false
        //         state.error = {status: true, value: action.error.message}
        //     })
    },
})

export const { resetCreateState, resetRetourState, resetProlongationState } = EmpruntSlice.actions;