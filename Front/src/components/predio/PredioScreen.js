import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { useSelector } from 'react-redux';



export const PredioScreen = () => {

    const { active } = useSelector( state => state.notes );

    return (
        <div className="predio__main-content animate__animated animate__fadeIn animate__faster">
            
            <Sidebar />


            <main>

            {
                ( active ) 
                    ? ( <NoteScreen /> )
                    : ( <NothingSelected /> )
            }

            </main>


        </div>
    )
}
