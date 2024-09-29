import React from 'react'
import styles from './NavBar.module.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return (
        <header className={styles.navbar}>
            <div className={styles.brand}>
                <Link to="/" className={styles.brand__link}>
                    <span>Proveedor</span>
                    <FontAwesomeIcon icon={faBoxesStacked} />
                </Link>
            </div>
        </header>
    )
}

export default NavBar