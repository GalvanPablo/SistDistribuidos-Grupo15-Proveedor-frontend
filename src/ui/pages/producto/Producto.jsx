import React, { useEffect, useState } from 'react'

import styles from './Producto.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'
import { API_PRODUCTO } from '../../../data/api'

const Producto = () => {

    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')

    const [productos, setProductos] = useState([]);

    const obtenerListado = () => {
        // const filtro = {
        //     codigo,
        //     nombre
        // }

        fetch(API_PRODUCTO.LISTADO, {
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
    }

    useEffect(()=>{
        obtenerListado();
    },[])

    useEffect(()=>{
        obtenerListado();
    },[codigo,nombre])

    const Item = ({ producto }) => (
        <tr className={styles.tabla__fila}>
            <td>{producto.codigo}</td>
            <td>{producto.nombre}</td>
            <td className={styles.icono_detalles}>
                <Link to={`/productos/detalle/${producto.codigo}`} title='ver detalle'>
                    <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles} />
                </Link>
            </td>
        </tr>
    )

    return (
        <>
            <h1>Listado de Productos</h1>
            <div className={styles.listado}>
                <div className={styles.toolbar}>
                    <Link to={`/productos/nuevo`} className={styles.nuevo}>Nuevo Producto</Link>
                    {/* <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Codigo' onChange={(e) => setCodigo(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} />
                    </div> */}
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla_encabezado}>
                        <tr>
                            <th className={styles.columna_codigo}>Código</th>
                            <th>Nombre</th>
                            <th className={styles.columna_acciones} style={{ textAlign: 'center' }}>Ver detalle</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {productos.map((producto, index) => (
                            <Item
                                key={index}
                                producto={producto}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Producto