import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


export const PredioEntry = ({id, date, title, propietario, matricula, ciudad, barrio, direccion}) => {
 
    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch( 
            activeNote( id, {
                date, title, propietario, matricula, ciudad, barrio, direccion
            })
        );
    }

    return (
        <div className="predio__entry pointer animate__animated animate__fadeIn animate_faster"
             onClick={handleEntryClick}
        >
            
            <div 
                className="predio__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://png.pngtree.com/element_our/md/20180516/md_5afc6f6f0d492.jpg)'
                }}
            ></div>

            <div className="predio__entry-body">
                <p className="predio__entry-title">
                    {propietario}
                </p>
                <p className="predio__entry-content">
                    {matricula}
                </p>
                <p className="predio__entry-content">
                    {ciudad}
                </p>
                <p className="predio__entry-content">
                    {direccion}
                </p>
            </div>

            <div className="predio__entry-date-box">
                <h5>Creación</h5>
                <span>{noteDate.format('l')}</span>
                <span>{noteDate.format('LT')}</span>
            </div>

        </div>
    )
}
