import React from 'react'

import styles from './Producto.module.css'
import { Link } from 'react-router-dom'
const Producto = () => {
    return (
        <div>
            <div>Productos</div>
            <Link to={'/productos/nuevo'}>Nuevo Producto</Link>
        </div>
    )
}

export default Producto