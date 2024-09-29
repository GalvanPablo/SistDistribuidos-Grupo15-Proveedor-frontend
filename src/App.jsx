// Navegacion
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Layout
import { NavBar, SideBar } from './ui/layout';

import { Producto, NuevoProducto, DetalleProducto, OrdenCompra, NuevaOrdenCompra, DetalleOrdenCompra } from './ui/pages';

import './App.css';
function App() {
    return (
        <BrowserRouter>
            <div className='web__container'>
                <NavBar />
                <div className='container'>
                    <SideBar />
                    <div className='view__container'>
                        <Routes>
                            <Route path='/' element={<Navigate to="/productos"/>} />

                            <Route path='/productos' element={<Producto />} />
                            <Route path='/productos/nuevo' element={<NuevoProducto />} />
                            <Route path='/productos/detalle/:id' element={<DetalleProducto />} />


                            <Route path='/ordenes_de_compra' element={<OrdenCompra />} />
                            <Route path='/ordenes_de_compra/nueva' element={<NuevaOrdenCompra />} />
                            <Route path='/ordenes_de_compra/detalle/:id' element={<DetalleOrdenCompra />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
