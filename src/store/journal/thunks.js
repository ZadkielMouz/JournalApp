import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addnewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";


export const startNewNote = () => {
    
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );
        
        // Para grabar en Firebase se necesita el uid del usuario
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        // Creando referencia al documento y colección. Esto devuelve el id de la colección que se va a crear.
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

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active } = getState().journal;

        // Se tiene el id de cada nota en el store, pero en firebase no debe estar ese id.
        const noteToFirestore = { ...active };
        delete noteToFirestore.id;

        // Referencia al documento.
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ active.id }` );
        // Haciendo cambio en la BDD
        // El tercer argumento son las opciones. Mandando el atributo 'merge' indico que si hay
        // campos que están aquí, que no están en la BDD, entonces los campos de la BDD se mantienen y se unen los nuevos.
        await setDoc( docRef, noteToFirestore, { merge: true }  );

        dispatch( updateNote( active ) );

    }

}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        // Bloquea los botones y se coloca en un estado de 'carga'
        dispatch(setSaving());

        // Creando arreglo de promesas
        const fileUploadPromises = [];
        for (const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        // Disparando las promesas. Esto retornará un array con las respuestas de dichas promesas.
        // En este caso, fileUpload retorna el secure_url, así que se tendrá un array con los url de las imagenes ya subidas
        // a Cloudinary.
        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active } = getState().journal;

        // Creando referencia al documento
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ active.id }`);

        // Eliminado la nota de Firebase
        await deleteDoc(docRef);

        // Eliminado del store
        dispatch( deleteNoteById( active.id ));
    }
}