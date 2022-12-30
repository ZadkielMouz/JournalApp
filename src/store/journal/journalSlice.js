import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        // Bandera para saber si guardo la nota o no, evitando doble posteo
        isSaving: false,
        // Mensaje de guardado
        messageSaved: '',
        // Almacenando las notas en un array
        notes: [],
        // Nota activa
        active: null,
        // activeNote: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg,
        // }


    },
    reducers: {
        // Guardando la nueva entrada
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        // Añadir nueva entrada
        addnewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        // Establecer la nota activa
        setActiveNote: (state, action) => {
            // Acá se guardará la nota que se quiere mostrar en pantalla
            state.active = action.payload;
            state.messageSaved = '';
        },
        // Cargar las notas una vez las tenemos leídas de la BDD
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        // Bandera para cuando se graben las notas
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        // Actualizar una nota
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${action.payload.title}, acttualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        // Eliminar una nota
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload )
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addnewEmptyNote, 
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;