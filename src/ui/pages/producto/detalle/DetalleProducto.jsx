import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { TextInput, ImgInput } from '../../../components';

import styles from './DetalleProducto.module.css';

const DetalleProducto = () => {
    const detallesVisualizacion = useParams();
    const codigoProducto = detallesVisualizacion.id;

    const [codigo, setCodigo] = useState(codigoProducto);
    const [nombre, setNombre] = useState('');
    const [urlImagen, setUrlImagen] = useState('');
    const [variaciones, setVariaciones] = useState([]);

    // TRAER DATOS
    useEffect(() => {
        setNombre('Jean');
        setUrlImagen('https://www.jamessmart.com/home/wp-content/uploads/ART-25629-JEAN-5B-AZUL.jpg');
        setVariaciones([
            { talleId: 1, talleNombre: 'S', colorId: 1, colorNombre: 'Amarillo', cantidad: 3 },
            { talleId: 1, talleNombre: 'M', colorId: 1, colorNombre: 'Verde', cantidad: 7 },
            { talleId: 1, talleNombre: 'XL', colorId: 1, colorNombre: 'Negro', cantidad: 10 },
        ]);
    }, []);

    const cantidadRefs = useRef([]);
    useEffect(() => {
        cantidadRefs.current = new Array(variaciones.length).fill(null);
    }, [variaciones]);

    const handleGuardarCambios = () => {
        const nuevasVariaciones = [];
        cantidadRefs.current.forEach((ref, index) => {
            if (ref !== null) {
                nuevasVariaciones.push({
                    talleId: variaciones[index].talleId,
                    colorId: variaciones[index].colorId,
                    cantidad: parseInt(ref.value),
                });
            }
        });

        const producto = {
            codigo,
            nombre,
            urlImagen,
            nuevasVariaciones
        }

        console.log(producto);
    };

    const Item = ({ variacion, index }) => {
        const cantidadOriginal = parseInt(variacion.cantidad);
        const [cantidad, setCantidad] = useState(variacion.cantidad);
        const [editado, setEditado] = useState(false);

        const handleEditarItem = (e) => {
            const cantidadActual = parseInt(e.target.value);
            setCantidad(cantidadActual);
            setEditado(cantidadActual !== cantidadOriginal);
        };

        const handleCancelarEdicion = () => {
            setCantidad(cantidadOriginal);
            setEditado(false);
        }

        return (
            <tr>
                <td>{variacion.talleNombre}</td>
                <td>{variacion.colorNombre}</td>
                <td>
                    <input
                        ref={(ref) => (cantidadRefs.current[index] = ref)}
                        type="number"
                        value={cantidad}
                        min="0"
                        step="1"
                        onChange={handleEditarItem}
                    />
                    {editado && (
                        <button onClick={handleCancelarEdicion}>Cancelar</button>
                    )}
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
            <div>
                <form action="">
                    <div className={styles.info}>
                        <TextInput
                            label={"Codigo"}
                            value={codigo}
                            onChange={(value) => setCodigo(value)}
                        />
                        <TextInput
                            label={"Nombre"}
                            value={nombre}
                            onChange={(value) => setNombre(value)}
                        />
                        <ImgInput
                            value={urlImagen}
                            onChange={(value) => setUrlImagen(value)}
                            urlImgDefault={
                                "https://cdn.icon-icons.com/icons2/1886/PNG/512/tshirt_120689.png"
                            }
                            label={"Foto del producto"}
                        />
                    </div>
                </form>
                <table className={styles.tabla}>
                    <thead className={styles.tabla_encabezado}>
                        <tr>
                            <th>Talle</th>
                            <th>Color</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tabla__cuerpo}>
                        {variaciones.map((variacion, index) => (
                            <Item key={index} variacion={variacion} index={index} />
                        ))}
                    </tbody>
                </table>
                <button onClick={() => handleGuardarCambios()}>Guardar Cambios</button>
            </div>
        </>
    );
};

export default DetalleProducto;