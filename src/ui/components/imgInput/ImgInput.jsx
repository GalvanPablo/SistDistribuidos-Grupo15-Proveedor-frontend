import React, { useState, useEffect } from 'react';

import styles from './ImgInput.module.css'
const ImgInput = ({ label, onChange, urlImgDefault, value, enabled = true }) => {
    const [imagenURL, setImagenURL] = useState(value);

    useEffect(() => {
        setImagenURL(value);
    }, [value])

    const manejarCambio = (evento) => {
        const url = evento.target.value
        setImagenURL(url);
        onChange(url)
    };

    return (
        <div className={styles.contenedor}>
            <span className={styles.input__label}>{label}</span>
            <div>
                <input
                    className={styles.inputUrl}
                    type="text"
                    value={imagenURL}
                    onChange={manejarCambio}
                    placeholder="Ingrese la URL de la imagen"
                    disabled={!enabled}
                />
                <img
                    className={styles.imagenPrevisualizacion}
                    src={imagenURL ? imagenURL : urlImgDefault}
                    alt="Previsualización"
                />
            </div>
        </div>
    );
}

export default ImgInput