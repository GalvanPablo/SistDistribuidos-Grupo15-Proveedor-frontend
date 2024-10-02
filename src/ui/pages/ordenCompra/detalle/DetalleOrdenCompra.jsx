import React from 'react'

import styles from './DetalleOrdenCompra.module.css'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { TextInput } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faCheckCircle, faExclamationTriangle, faRectangleTimes, faSkull } from '@fortawesome/free-solid-svg-icons'

const DetalleOrdenCompra = () => {
    const detallesVisualizacion = useParams();
    const idOrdenCompra = detallesVisualizacion.id;

    const idOrden = React.useState(idOrdenCompra);
    const estado = React.useState('');
    const observaciones = React.useState('');
    const tienda = React.useState('');
    const fechaSolicitud = React.useState('');
    const fechaRecepcion = React.useState('');

    const guardarCambios = () => {
        const ordenCompra = {
            idOrden,
            estado,
            observaciones,
            tienda,
            fechaSolicitud,
            fechaRecepcion
        }
    };






    return (
        <div>DetalleOrdenCompra</div>
    )
}

export default DetalleOrdenCompra