import { types } from '../types/types';


export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                // Identificador unico que me regresa Firebase
                uid: action.payload.uid,
                nombre: action.payload.displayName
            }
            
        case types.logout:
            return { }
            
    
        default:
            return state; 
    }
}