import React, { useState } from 'react'

import { TextInput, ImgInput } from '../../../components'

import styles from './NuevoProducto.module.css'
const NuevoProducto = () => {

    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [urlImagen, setUrlImagen] = useState('');

    const talles = [
        { id: 1, nombre: 'XS' },
        { id: 2, nombre: 'S' },
        { id: 3, nombre: 'M' },
        { id: 4, nombre: 'L' },
        { id: 5, nombre: 'XL' }
    ]

    const colores = [
        { id: 1, nombre: 'Rojo' },
        { id: 2, nombre: 'Azul' },
        { id: 3, nombre: 'Verde' },
        { id: 4, nombre: 'Negro' }
    ]

    const [seleccionados, setSeleccionados] = React.useState({});

    const manejarSeleccion = (talleId, colorId) => {
        setSeleccionados((prev) => {
            const nuevosSeleccionados = { ...prev };
            nuevosSeleccionados[`${talleId}-${colorId}`] = !nuevosSeleccionados[`${talleId}-${colorId}`];
            return nuevosSeleccionados;
        });
    };

    const getSeleccionados = () => {
        return Object.keys(seleccionados).filter((key) => seleccionados[key]).map((key) => {
            const [talleId, colorId] = key.split('-');
            return { talleId: parseInt(talleId), colorId: parseInt(colorId) };
        });
    };

    const nuevoProducto = (e) => {
        e.preventDefault();

        const producto = {
            codigo,
            nombre,
            urlImagen,
            tallesColores: getSeleccionados()
        }

        console.log(producto);
    }

    return (
        <div className={styles.view_container}>
            <h1>Nuevo Producto</h1>
            <form action="">
                <div className={styles.info}>
                    <TextInput
                        label={"Codigo"}
                        onChange={(value) => setCodigo(value)}
                    />
                    <TextInput
                        label={"Nombre"}
                        onChange={(value) => setNombre(value)}
                    />
                    <ImgInput
                        onChange={(value) => setUrlImagen(value)}
                        urlImgDefault={'https://cdn.icon-icons.com/icons2/1886/PNG/512/tshirt_120689.png'}
                        label={'Foto del producto'}
                    />
                    <button onClick={nuevoProducto} className={styles.boton}>
                        Crear
                    </button>
                </div>
                <div className={styles.input_talleColor}>
                    <span className={styles.input__label}>Colores y talles disponibles</span>
                    <div className={styles.contenedor__tabla}>
                        <table className={styles.tabla}>
                            <thead>
                                <tr>
                                    <th></th>
                                    {colores.map((color) => (
                                        <th key={color.id} className={styles.cabeceraColor}>{color.nombre}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {talles.map((talle) => (
                                    <tr key={talle.id}>
                                        <td className={styles.celdaTalle}>{talle.nombre}</td>
                                        {colores.map((color) => (
                                            <td key={color.id} className={styles.celdaColor}>
                                                <input
                                                    type="checkbox"
                                                    checked={!!seleccionados[`${talle.id}-${color.id}`]}
                                                    onChange={() => manejarSeleccion(talle.id, color.id)}
                                                    className={styles.checkbox}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default NuevoProducto