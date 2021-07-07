import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector} from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegister } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector ( state => state.ui );


    const [ formValues, handleInputChange ] = useForm( {
        nombre: '',
        correo: '',
        password: '',
        password2: ''
    })

    const { nombre, correo, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            dispatch(startRegister(nombre, correo, password))
        }
    }

    const isFormValid = () => {

        if(nombre.length === 0){
            dispatch( setError('El nombre es requerido') )
            return false
        } 
        else if ( !validator.isEmail( correo )) {
            dispatch( setError('El correo no es válido') )
            return false
        }
        else if ( password.length < 6){
            dispatch( setError('La contraseña debe tener mínimo 6 caracteres') )
            return false
        }
        else if ( password !== password2 ){
            dispatch( setError('Las contraseñas no coinciden') )
            return false
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Registrate</h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    className="auth__input"
                    autoComplete="off"
                    value={nombre}
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Correo electrónico"
                    name="correo"
                    className="auth__input"
                    autoComplete="off"
                    value={correo}
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirma la contraseña"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={ handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Registrarse
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    ¿Ya estás registrado?
                </Link>

            </form>
        </>
    )
}
