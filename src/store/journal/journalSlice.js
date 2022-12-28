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
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        // Añadir nueva entrada
        addnewEmptyNote: ( state, action ) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        // Establecer la nota activa
        setActiveNote: ( state, action ) => {
            // Acá se guardará la nota que se quiere mostrar en pantalla
            state.active = action.payload;
        },
        // Cargar las notas una vez las tenemos leídas de la BDD
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        // Bandera para cuando se graben las notas
        setSaving: ( state ) => {

        },
        // Actualizar una nota
        updateNote: ( state, action ) => {

        },
        // Eliminar una nota
        deleteNoteById: ( state, action ) => {
            
        },
    }
});


// Action creators are generated for each case reducer function
export const { addnewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, } = journalSlice.actions;