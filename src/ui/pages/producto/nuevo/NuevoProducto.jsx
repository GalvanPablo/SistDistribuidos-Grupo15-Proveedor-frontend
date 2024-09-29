import React, { useState } from 'react'

import { TextInput, ImgInput } from '../../../components'

import styles from './NuevoProducto.module.css'
const NuevoProducto = () => {

    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [urlImagen, setUrlImagen] = useState('');

    return (
        <div>
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
                </div>

            </form>
        </div>
    )
}

export default NuevoProducto