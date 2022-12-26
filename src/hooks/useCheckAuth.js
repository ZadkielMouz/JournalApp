import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";


export const useCheckAuth = () => {

    
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // !Con este efecto mantengo la sesión del usuario activa.
    useEffect(() => {
        // Verifico el estado de las sesión del usuario activo
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
        })

    }, []);

    return status;
}