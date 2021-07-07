import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom'
import { startLoginUserPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    //Para darle acceso al dispatch
    const dispatch = useDispatch();

    const {loading} = useSelector( state => state.ui);

    // Para manejar la informacion ingresada por el usuario
    const [ formValues, handleInputChange ] = useForm({

        correo: '',
        password: ''

    })

    const { correo, password } = formValues;

    const handleLogin = (e) => {

        e.preventDefault();
        dispatch( startLoginUserPassword(correo, password) );


    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form 
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >

                <input 
                    type="text"
                    placeholder="Correo"
                    name="correo"
                    className="auth__input"
                    autoComplete="off"
                    value={correo}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

 
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={loading}
                >
                    Login
                </button>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    ¿No estás registrado?    
                </Link>

            </form>
        </>
    )
}
