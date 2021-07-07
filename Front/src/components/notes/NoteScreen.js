import React, {useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes );
    const [formValues, handleInputChange, reset] = useForm( note );
    const {propietario, matricula, ciudad, barrio, direccion, id} = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }

    }, [note, reset])

    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

            <h3 className="auth__title">Información del predio</h3>

                <h5 className="auth__formulario">Propietario</h5>
                <input 
                    type="text"
                    placeholder="Propietario"
                    name="propietario"
                    className="notes_title-input"
                    autoComplete="off"
                    value={propietario}
                    onChange={ handleInputChange }
                />

                <h5 className="auth__formulario">Matrícula inmobiliaria</h5>
                <input 
                    type="text"
                    placeholder="Matrícula inmobiliaria"
                    name="matricula"
                    className="notes_title-input"
                    autoComplete="off"
                    value={matricula}
                    onChange={ handleInputChange }
                />

                <h5 className="auth__formulario">Ciudad de ubicación del predio</h5>
                <input 
                    type="text"
                    placeholder="Ciudad de ubicación del predio"
                    name="ciudad"
                    className="notes_title-input"
                    autoComplete="off"
                    value={ciudad}
                    onChange={ handleInputChange }
                />

                <h5 className="auth__formulario">Barrio de ubicación del predio</h5>
                <input 
                    type="text"
                    placeholder="Barrio de ubicación del predio"
                    name="barrio"
                    className="notes_title-input"
                    autoComplete="off"
                    value={barrio}
                    onChange={ handleInputChange }
                />

                <h5 className="auth__formulario">Dirección de ubicación del predio</h5>
                <input 
                    type="text"
                    placeholder="Dirección del predio"
                    name="direccion"
                    className="notes_title-input"
                    autoComplete="off"
                    value={direccion}
                    onChange={ handleInputChange }
                />


            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
