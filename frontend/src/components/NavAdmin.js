import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavAdmin = (props) => {
	return ( <>
	<div className='navAdmin'>
		<div className='navBrand'>
		</div>
		<NavLink to='/admin'>
			<div className='navItem str'>
				<div><i className="fas fa-home"></i></div>
				<div>Dashboard</div>
			</div>
		</NavLink>
		<NavLink to='/adminListproduct'>
			<div className='navItem str'>
				<div><i className="fas fa-wine-bottle"></i></div>
				<div>Productos</div>
			</div>
		</NavLink>
		<NavLink to='/createProduct'>
			<div className='navItem str'>
				<div><i className="fas fa-plus-circle"></i></div>
				<div>Cargar Producto</div>
			</div>
		</NavLink>
		<NavLink to='/orders'>
			<div className='navItem str'>
				<div><i className="fas fa-folder-open"></i></div>
				<div>Ordenes</div>
			</div>
		</NavLink>
		<NavLink to='/home'>
			<div className='navItem str'>
				<div><i className="fas fa-store-alt"></i></div>
				<div>Ir a la tienda</div>
			</div>
		</NavLink>
	</div>
	</> );
}
 
export default NavAdmin;