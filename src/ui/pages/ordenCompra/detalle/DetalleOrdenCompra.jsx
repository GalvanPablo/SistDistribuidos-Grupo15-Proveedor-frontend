import React, { useEffect } from 'react'

import styles from './DetalleOrdenCompra.module.css'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { TextInput } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faCheckCircle, faExclamationTriangle, faRectangleTimes, faSkull } from '@fortawesome/free-solid-svg-icons'

const DetalleOrdenCompra = () => {
    const detallesVisualizacion = useParams();
    const idOrdenCompra = detallesVisualizacion.id;

    const [idOrden, setIdOrden] = React.useState(idOrdenCompra);
    const [estado, setEstado] = React.useState('');
    const [observaciones, setObservaciones] = React.useState('');
    const [tienda, setTienda] = React.useState('');
    const [fechaSolicitud, setFechaSolicitud] = React.useState('');
    const [fechaRecepcion, setFechaRecepcion] = React.useState('');
    const [productos, setProductos] = React.useState([]);

    // TRAER DATOS
    useEffect(() => {
        setIdOrden(1);
        setEstado('Aceptada');
        setObservaciones('Producto inexistente');
        setTienda('ABCD1234');
        setFechaSolicitud('23/5/24');
        setFechaRecepcion('10/6/24');
        setProductos([
            { nombre: 'Remera', talle: 'S', color: 'Amarillo', cantidad: 3 , estado: 'No existe'},
            { nombre: 'Pantalon', talle: 'M', color: 'Azul', cantidad: 23 , estado: 'Stock insuficiente'},
            { nombre: 'Remera', talle: 'S', color: 'Negro', cantidad: 3 , estado: 'Todo bien'},
        ]);
    }, []);

    const guardarCambios = () => {
        const ordenCompra = {
            idOrden,
            estado,
            observaciones,
            tienda,
            fechaSolicitud,
            fechaRecepcion,
            productos
        }
        console.log(ordenCompra);
    };

    const Item = ({ producto }) => {
        return(
         <tr className={styles.tabla__fila}>
          <td>{producto.nombre}</td>
          <td>{producto.talle}</td>
          <td>{producto.color}</td>
          <td>{producto.cantidad}</td>
          <td>{producto.estado}</td>
        </tr>
        
    )};
 

    return (
        <>
        <h1>
           <FontAwesomeIcon icon={faTags } />
                <span>Detalle de Orden de Compra: </span>
                <span>{idOrden}</span>
        </h1>

        <div>
           <form action="">
                    <div className={styles.info}>
                    <span>----------------------------------------</span>
                    <h3>ID: {idOrden} / Estado: {estado} / Observaciones: {observaciones}</h3>
                    <span>----------------------------------------</span>
                    <h3>Tienda: {tienda}</h3>
                    <span>----------------------------------------</span>
                    <h3>Fecha Solicitud: {fechaSolicitud}</h3>
                    <h3>Fecha Recepcion: {fechaRecepcion}</h3>
                    <span>----------------------------------------</span>   
                    </div>
                </form>
                <table className={styles.tabla}>
                    <thead className={styles.tabla_encabezado}>
                        <tr>
                            <th>Nombre</th>
                            <th>Talle</th>
                            <th>Color</th>
                            <th>Cantidad</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {productos.map((producto, index) => (
                            <Item 
                              key={index} 
                              producto={producto} />
                        ))}
                    </tbody>
                </table>
                <button className={styles.nuevo} onClick={() => guardarCambios()}>Guardar Cambios</button>

        </div>
        </>
        
    )
}

export default DetalleOrdenCompra