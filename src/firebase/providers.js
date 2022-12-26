import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";



const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {


    try {
        // Los parámetros que recibe son el Auth, que ya está listo para ser consumido
        // en el config.js y el provider que acabamos de declarar.
        const result = await signInWithPopup(FirebaseAuth, googleProvider);

        /*
        ***Linea para obtener las credenciales en caso de necesitarlas***

        const credentials = GoogleAuthProvider.credentialFromResult( result );
        
        */

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
    } catch (error) {

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorCode, errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        // Actualizando el displayName en Firebase ya que al crearlo no lo coloca
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async({email, password}) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL, displayName} = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        // console.log(error.);
        return {
            ok: false,
            errorMessage: error.message
        }
        
    }

}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}