import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
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

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        if( !ok ) return dispatch( logout( {errorMessage}) )
        
        //Si todo sale bien, se hace el login
        dispatch( login( {uid, displayName, email, photoURL} ));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        
        const {ok, uid, photoURL, displayName, errorMessage} = await loginWithEmailPassword({email, password});
        
        if( !ok ) return dispatch( logout( {errorMessage}) );

        //Si todo sale bien, se hace el login
        dispatch( login( {uid, displayName, email, photoURL} ));

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( logout() );
    } 
}