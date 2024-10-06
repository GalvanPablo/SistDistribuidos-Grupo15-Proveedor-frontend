const API_URL = 'http://localhost:8001/'

export const API_PRODUCTO = {
    ALTA: API_URL + 'productos/crear',

    // BAJA: API_URL + 'Producto/EliminarProducto',
    // MODIFICAR: API_URL + 'Producto/ModificarProducto',

    LISTADO: API_URL + 'productos',
    DETALLE: (id) => API_URL + `productos/${id}`,

    MODIFICAR_STOCK: (id) => API_URL + `productos/${id}/actualizar/stock`
}

export const API_UTILIDADES = {
    LISTADO_COLORES: API_URL + 'colores',
    LISTADO_TALLES: API_URL + 'talles'
}

export const API_ORDEN_DE_COMPRA = {
    LISTADO: API_URL + 'ordenes',
    DETALLE: (id) => API_URL + `ordenes/${id}`,
}