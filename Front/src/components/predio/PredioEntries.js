import React from 'react'
import { useSelector } from 'react-redux';
import { PredioEntry } from './PredioEntry';

export const PredioEntries = () => {

    const { notes } = useSelector( state => state.notes );


    return (
        <div className="predio__entries">
            
            {
                notes.map( note => (
                    <PredioEntry 
                        key={ note.id }
                        { ...note }
                    />
                ))
            }

        </div>
    )
}
