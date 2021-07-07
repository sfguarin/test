import Swal from "sweetalert2";


import { firebase } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from "./notes";
import { finishLoading, startLoading } from './ui';

export const startLoginUserPassword = (correo, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(correo, password)
            .then( async({ user }) => {
                 dispatch( login( user.uid, user.displayName ));

                 dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e)
                dispatch( finishLoading() );
                Swal.fire('Error', 'Verifique que el correo y contraseña sean válidos.', 'error');
            })
    }
}

export const startRegister = ( nombre, correo, password ) => {
    return ( dispatch ) => {

        
        firebase.auth().createUserWithEmailAndPassword( correo, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: nombre });

                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {
                console.log(e)
                Swal.fire('Error', 'Verifique que todos los campos estén diligenciados correctamente.', 'error');
            })

    }
}

export const login = (uid, displayName) => ({

        type: types.login,
        payload: {
            uid,
            displayName
        }
    
})


export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
})
