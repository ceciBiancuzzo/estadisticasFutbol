import React from 'react';
import imagenFondo from '../imagenes/escudo-impsa.png'
import '../hojas-de-estilo/imagen-fondo.css';

function Imagen(){
    return(
    <div className='imagen-de-fondo'>
        <img src={imagenFondo} alt="Imagen de fondo"/>
    </div>
    );
}
export default Imagen;