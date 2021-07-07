import React from 'react'
import { PredioEntries } from './PredioEntries'
import { startLogout } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../actions/notes';


export const Sidebar = () => {

    const dispatch = useDispatch();
    const {nombre} = useSelector(state=>state.auth)

    const hanleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="predio__sidebar">
            
            <div className="predio__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {nombre} </span>
                </h3>

                <button 
                className="btn"
                onClick={hanleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="predio__new-entry"
                 onClick={ handleAddNew }
            >
                <i className="far fa-plus-square fa-5x"></i>
                <p className="mt-5">
                    Registrar predio
                </p>
            </div>

            <PredioEntries />    

        </aside>
    )
}
