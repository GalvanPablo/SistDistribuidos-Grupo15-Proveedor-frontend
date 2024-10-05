import React, { useState, useEffect, useRef } from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import { TextInput, ImgInput } from '../../../components';

import styles from './DetalleProducto.module.css';
import { API_PRODUCTO } from '../../../../data/api';

const DetalleProducto = () => {
    const detallesVisualizacion = useParams();
    const codigoProducto = detallesVisualizacion.id;

    const [idProducto, setIdProducto] = useState();
    const [codigo, setCodigo] = useState(codigoProducto);
    const [nombre, setNombre] = useState('');
    const [urlImagen, setUrlImagen] = useState('');
    const [variaciones, setVariaciones] = useState([]);

    const [mostrarActualizar, setMostrarActualizar] = useState(false);

    const [finalizado, setFinalizado] = useState(false);

    // TRAER DATOS
    useEffect(() => {
        fetch(API_PRODUCTO.DETALLE(codigoProducto), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                setNombre(response.nombre);
                setUrlImagen(response.url);
                setVariaciones(response.disponibles);
                setIdProducto(response.id)
            })
    }, []);

    const cantidadRefs = useRef([]);
    useEffect(() => {
        if (cantidadRefs.current.length !== variaciones.length) {
            cantidadRefs.current = new Array(variaciones.length).fill(null);
        }
    }, [variaciones]);



    const obtenerCambiosDeStock = () => {
        const nuevasVariaciones = [];
        cantidadRefs.current.forEach((ref, index) => {
            if (ref !== null && parseInt(ref.value) !== variaciones[index].cantidad) {
                nuevasVariaciones.push({
                    idTalle: variaciones[index].idTalle,
                    idColor: variaciones[index].idColor,
                    cantidad: parseInt(ref.value),
                });
            }
        });
        return nuevasVariaciones;
    }

    const actualizarItem = (cambio) => {
        fetch(API_PRODUCTO.MODIFICAR_STOCK(idProducto), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cambio),
        })
    }
    const hanldeActualizarStock = () => {
        const cambios = obtenerCambiosDeStock();

        cambios.forEach((cambio) => {
            actualizarItem(cambio);
        })

        alert("Stocks del producto actualizados");
        setFinalizado(true);
    }

    // const handleGuardarCambios = () => {

    //     const producto = {
    //         codigo,
    //         nombre,
    //         urlImagen,
    //         nuevasVariaciones
    //     }

    //     console.log(producto);
    // };



    const Item = ({ variacion, index }) => {
        const cantidadOriginal = parseInt(variacion.cantidad);
        const [cantidad, setCantidad] = useState(variacion.cantidad);
        const [editado, setEditado] = useState(false);

        const handleEditarItem = (e) => {
            const cantidadActual = parseInt(e.target.value);
            setCantidad(cantidadActual);

            const seModifico = cantidadActual !== cantidadOriginal;
            setEditado(seModifico);

            // Actualizar directamente `mostrarActualizar` usando el estado actual
            const hayModificaciones = seModifico ||
                cantidadRefs.current.some((ref, idx) => parseInt(ref.value) !== variaciones[idx].cantidad);

            setMostrarActualizar(hayModificaciones);
        };


        const handleCancelarEdicion = () => {
            setCantidad(cantidadOriginal); // Restaurar cantidad original
            setEditado(false);

            // Esperar un ciclo de renderizado para que React actualice las refs
            setTimeout(() => {
                const hayModificaciones = cantidadRefs.current.some((ref, idx) =>
                    parseInt(ref.value) !== variaciones[idx].cantidad
                );
                setMostrarActualizar(hayModificaciones);
            }, 0); // Este timeout permite actualizar después de la restauración de los valores
        }


        return (
            <tr>
                <td>{variacion.talleNombre}</td>
                <td>{variacion.colorNombre}</td>
                <td className={styles.cantidad}>
                    <input
                        ref={(ref) => (cantidadRefs.current[index] = ref)}
                        type="number"
                        value={cantidad}
                        min="0"
                        step="1"
                        onChange={handleEditarItem}
                        className={styles.input_cantidad}
                    />
                    <button onClick={handleCancelarEdicion}
                        className={styles.input_cantidad_cancelar}
                        style={{ opacity: editado ? 1 : 0 }}
                    >
                        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon_cancelar} />
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <>
            <h1>
                <FontAwesomeIcon icon={faTags} />
                <span>Producto </span>
                <span>{codigoProducto}</span>
            </h1>
            {finalizado && <Navigate to={"/productos"} />}
            <div className={styles.info_container}>
                <form className={styles.info}>
                    <div className={styles.info_identificadores}>
                        <TextInput
                            label={"Codigo"}
                            value={codigo}
                            onChange={(value) => setCodigo(value)}
                            enabled={false}
                        />
                        <TextInput
                            label={"Nombre"}
                            value={nombre}
                            onChange={(value) => setNombre(value)}
                            enabled={false}
                        />
                    </div>
                    <ImgInput
                        value={urlImagen}
                        onChange={(value) => setUrlImagen(value)}
                        urlImgDefault={
                            "https://cdn.icon-icons.com/icons2/1886/PNG/512/tshirt_120689.png"
                        }
                        label={"Foto del producto"}
                        enabled={false}
                    />
                </form>
                <div className={styles.tabla_container}>
                    <div>Stock disponible</div>
                    <table className={styles.tabla}>
                        <thead className={styles.tabla_encabezado}>
                            <tr>
                                <th>Talle</th>
                                <th>Color</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tabla__cuerpo}>
                            {variaciones.map((variacion, index) => (
                                <Item key={index} variacion={variacion} index={index} />
                            ))}
                        </tbody>
                    </table>
                    <button onClick={hanldeActualizarStock} className={styles.btnActualizar} disabled={!mostrarActualizar}>Actualizar Stock</button>
                </div>
            </div>
            {/* <button onClick={() => handleGuardarCambios()}>Guardar Cambios</button> */}
        </>
    );
};

export default DetalleProducto;