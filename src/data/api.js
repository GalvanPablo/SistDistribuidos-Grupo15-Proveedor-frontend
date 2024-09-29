const API_URL = 'https://localhost:7035/'

export const API_PRODUCTO = {
    ALTA: API_URL + 'Producto/CrearProducto',
    BAJA: API_URL + 'Producto/EliminarProducto',
    MODIFICAR: API_URL + 'Producto/ModificarProducto',

    LISTADO: API_URL + 'Producto/TraerProducto',
    DETALLE: API_URL + 'Producto/Detalle',
}

export const API_UTILIDADES = {
    LISTADO_COLORES: API_URL + 'Color/TraerColores',
    LISTADO_TALLES: API_URL + 'Talle/TraerTalles'
}

export const API_ORDEN_DE_COMPRA = {
    ALTA: API_URL + 'OrdenCompra/CrearOrdenCompra',
    BAJA: API_URL + 'OrdenCompra/EliminarOrdenCompra',
    MODIFICAR: API_URL + 'OrdenCompra/ModificarOrdenCompra',
    
    LISTADO: API_URL + 'OrdenCompra/TraerOrdenCompra',
    DETALLE: API_URL + 'OrdenCompra/Detalle',
}