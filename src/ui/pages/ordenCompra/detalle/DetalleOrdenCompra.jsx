import React, { useEffect } from 'react'

import styles from './DetalleOrdenCompra.module.css'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { TextInput } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport, faCheckCircle, faExclamationTriangle, faRectangleTimes, faSkull } from '@fortawesome/free-solid-svg-icons'
import { API_ORDEN_DE_COMPRA } from '../../../../data/api';

const DetalleOrdenCompra = () => {
    const detallesVisualizacion = useParams();
    const idOrdenCompra = detallesVisualizacion.id;


    const [orden, setOrden] = React.useState();
    const [productos, setProductos] = React.useState([]);

    // TRAER DATOS
    useEffect(() => {
        fetch(API_ORDEN_DE_COMPRA.LISTADO, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(filtro),
        })
            .then(response => response.json())
            .then(response => {
                setOrden(response.find((obj) => parseInt(obj.id) === parseInt(idOrdenCompra)));
            })

        fetch(API_ORDEN_DE_COMPRA.DETALLE(idOrdenCompra), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(filtro),
        })
            .then(response => response.json())
            .then(response => {
                setProductos(response);
            })

    }, []);

    /*const guardarCambios = () => {
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
    };*/

    //Mapeo de estados a iconos
    // const getIconForState = (estado) => {
    //     switch (estado) {
    //         case 'No existe':
    //             return <FontAwesomeIcon icon={faRectangleTimes} className={styles.tabla__iconoRojo} />
    //         case 'Stock insuficiente':
    //             return <FontAwesomeIcon icon={faExclamationTriangle} className={styles.tabla__iconoAmarillo} />
    //         case 'Todo bien':
    //             return <FontAwesomeIcon icon={faCheckCircle} className={styles.tabla__iconoVerde} />
    //         default:
    //             return <FontAwesomeIcon icon={faSkull} />
    //     }

    // }

    const Item = ({ producto }) => {
        return (
            <tr className={styles.tabla__fila}>
                <td>{producto.nombre}</td>
                <td>{producto.talle}</td>
                <td>{producto.color}</td>
                <td>{producto.cantidad}</td>
                {/* <td>{getIconForState(producto.estado)}</td> */}
            </tr>

        )
    };


    return (
        <>
            <h1>
                <FontAwesomeIcon icon={faFileExport} />
                {' '}
                <span>Orden de Compra N° </span>
                <span>{idOrdenCompra}</span>
            </h1>

            <div>
                <div className={styles.listado}>
                    <div className={styles.toolbar}>
                        <form action="">

                            <div className={styles.info}>
                                <h3>Estado: {orden?.estado} / Observaciones: {orden?.observaciones}</h3>
                                <h3>Tienda: {orden?.codigoTienda}</h3>
                                <h3>Fecha Solicitud: {orden?.fechaSolicitud}</h3>
                                <h3>Fecha Recepcion: {orden?.fechaRecepcion}</h3>
                            </div>

                        </form>
                    </div>
                </div>
                <div className={styles.toolbar}>
                    <table className={styles.tabla}>
                        <thead className={styles.tabla_encabezado}>
                            <tr>
                                <th>Nombre</th>
                                <th>Talle</th>
                                <th>Color</th>
                                <th>Cantidad</th>
                                {/* <th>Estado</th> */}
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
                </div>
                {/* <button className={styles.nuevo} onClick={() => guardarCambios()}>Guardar Cambios</button>*/}
                {/*Seccion de leyenda para iconos*/}
                {/* <div className={styles.toolbar}>
                    <div className={styles.leyenda}>
                        <h3>Descripción de los íconos de estado:</h3>
                        <ul>
                            <li><FontAwesomeIcon icon={faRectangleTimes} className={styles.tabla__iconoRojo} /> - No existe</li>
                            <li><FontAwesomeIcon icon={faExclamationTriangle} className={styles.tabla__iconoAmarillo} /> - Stock insuficiente</li>
                            <li><FontAwesomeIcon icon={faCheckCircle} className={styles.tabla__iconoVerde} /> - Todo bien</li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default DetalleOrdenCompra