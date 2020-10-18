import React, {useState, useEffect} from 'react';

const DataAdmin = (props) => {
	return ( <>
		<div className="dataPanel">
			<div className='adminData'>
	        	<span>{props.datos.ordenes}</span>
				<span>Ordenes pendientes</span>
			</div>
			<div className='adminData'>
				<span>{props.datos.articuloOutStock}</span>
				<span>Articulos sin stock</span>
			</div>
			<div className='adminData'>
				<span>{props.datos.cantidadDeUsuarios}</span>
				<span>Cantidad de usuarios</span>
			</div>
			<div className='adminData'>
	            <span>{props.datos.reseñas}</span>
				<span>Comentarios realizados</span>
			</div>
		</div>
	</> );
}
 
export default DataAdmin;