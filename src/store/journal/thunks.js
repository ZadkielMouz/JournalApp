import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addnewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./";


export const startNewNote = () => {
    
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );
        
        // Para grabar en Firebase se necesita el uid del usuario
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Creando referencia al documento
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
        // Añadiendo a Firebase. Si esto falla, nos dará un error. Si no falla, retornará undefined y ya.
        await setDoc( newDoc, newNote );

        //Se le añade el id a la nueva nota. El id es obtenido de Firebase.
        newNote.id = newDoc.id;

        //! dispatch
        dispatch ( addnewEmptyNote( newNote ) );
        dispatch ( setActiveNote( newNote ) );

    }

}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');

        dispatch( setNotes( await loadNotes( uid ) ) );

    }
}