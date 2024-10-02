import React from 'react'

import styles from './Producto.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen } from '@fortawesome/free-solid-svg-icons'

const Producto = () => {

    const [codigo, setCodigo] = React.useState('')
    const [nombre, setNombre] = React.useState('')

    const productos = [
        { codigo: 'AB12', nombre: 'Jean' },
        { codigo: 'AB12', nombre: 'Jean' },
        { codigo: 'AB12', nombre: 'Jean' },
        { codigo: 'AB12', nombre: 'Jean' },
    ]

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
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Codigo' onChange={(e) => setCodigo(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} />
                        {/* <button onClick={obtenerListado}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button> */}
                    </div>
                </div>

                <table className={styles.tabla}>
                    <thead className={styles.tabla_encabezado}>
                        <tr>
                            <th className={styles.columna_codigo}>Código</th>
                            <th>Nombre</th>
                            <th className={styles.columna_acciones} style={{textAlign: 'center'}}>Ver detalle</th>
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