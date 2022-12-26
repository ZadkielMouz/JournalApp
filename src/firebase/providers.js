import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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