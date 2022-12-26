import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );
    }
};

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        //Si la autenticación falla, se hace un logout y se sale de la función
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        //Si todo sale bien, se hace el login
        dispatch( login( result ));

    }
}