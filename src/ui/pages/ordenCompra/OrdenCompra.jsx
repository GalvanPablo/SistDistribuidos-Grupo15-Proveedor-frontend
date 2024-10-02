import React from 'react'

import styles from './OrdenCompra.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { API_ORDEN_DE_COMPRA } from '../../../data/api'

const OrdenCompra = () => {

    const[idOrden,setIdOrden] = React.useState('');
    const[estado,setEstado] = React.useState('');
    const[observaciones,setOnservaciones] = React.useState('');
    const[tienda,setTienda] = React.useState('');
    const[fechaSolicitud,setFechaSolicitud] = React.useState('');
    const[fechaRecepcion,setFechaRecepcion] = React.useState('');
    
    const estadoOrden = {
        ACEPTADA: 'Aceptada',
        RECHAZADA: 'Rechazada',
        PAUSADA: 'Pausada',
    }


    const ordenesCompra = [
        { idOrden: 1, estado: estadoOrden.RECHAZADA, observaciones: 'Producto inexistente', tienda: 'ABCD1234', fechaSolicitud: new Date('2024-9-28'), fechaRecepcion: new Date('2024-10-10')},
        { idOrden: 2, estado: estadoOrden.ACEPTADA, observaciones: 'Stock faltante', tienda: 'ADCV2222', fechaSolicitud: new Date('2024-9-24'), fechaRecepcion: new Date('2024-10-4')},
        
    ]

    const Item = ({ordenCompra}) => (
        <tr className={styles.tabla__fila}>
          <td>{ordenCompra.idOrden}</td>
          <td>{ordenCompra.estado}</td>
          <td>{ordenCompra.observaciones}</td>
          <td>{ordenCompra.tienda}</td>
          <td>{ordenCompra.fechaSolicitud.toLocaleDateString()}</td>
          <td>{ordenCompra.fechaRecepcion.toLocaleDateString()}</td>
          <td>
             <Link to={`/ordenes_de_compra/detalle/${ordenCompra.idOrden}`} className={styles.nuevo}>
               <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles}/>
             </Link>
          </td>
        </tr>

    )

    return (
     <>   
        <h1>Listado de Orden de Compra</h1>
          <div className={styles.listado}>
               <div className={styles.toolbar}>
                
                    <div className={styles.toolbar__filtro__container}>
                        <input type="text" name="" id="" placeholder='Estado' onChange={(e) => setEstado(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Tienda' onChange={(e) => setTienda(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Fecha Solicitud' onChange={(e) => setFechaSolicitud(e.target.value)} />
                        <input type="text" name="" id="" placeholder='Fecha Recepcion' onChange={(e) => setFechaRecepcion(e.target.value)} />
                        <button>
                            <FontAwesomeIcon className={styles.nuevo} icon={faFilter} />
                        </button> 
                    </div>

               </div>


            <table className={styles.tabla}>
              <thead className={styles.tabla__encabezado}>
                    <tr>
                        <th>Id</th>
                        <th>Estado</th>
                        <th>Observaciones</th>
                        <th>Tienda</th>
                        <th>Fecha Solicitud</th>
                        <th>Fecha Recepcion</th>
                        <th>Ver detalle</th>
                    </tr>
              </thead>
              <tbody className={styles.tabla__cuerpo}>
                        {ordenesCompra.map((ordenCompra, index) => (
                            <Item
                               key={index}
                               ordenCompra={ordenCompra}

                               />
                            /*<tr key={ordenCompra.id}>
                               <td>{ordenCompra.id}</td> 
                               <td>{ordenCompra.estado}</td>
                               <td>
                               {ordenCompra.articulos.map((articulo, index) => (
                                <div key={index}>
                                   {articulo.nombre} - {articulo.talle} - {articulo.color}
                                </div>
                               ))}
                               </td>
                               <td>{ordenCompra.observaciones}</td>
                               <td>{ordenCompra.tienda}</td>
                               <td>{ordenCompra.fechaSolicitud.toLocaleDateString()}</td>
                               <td>{ordenCompra.fechaRecepcion.toLocaleDateString()}</td>
                               <td>
                               <Link to={`/ordenes_de_compra/detalle/${ordenCompra.id}`} className={styles.nuevo}>
                                  <FontAwesomeIcon icon={faFilePen} className={styles.icono_detalles}/>
                               </Link>
                               </td>
                            </tr>*/
                            
                        ))}
                    </tbody>
            </table>

          </div>
     </>   
    )
}

export default OrdenCompra