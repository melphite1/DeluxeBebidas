import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import userActions from '../redux/actions/userActions';
import '../styles/cart.css';
import CartItem from './CartItem';

const Cart = (props) => {
	return ( <>
		<div className='backgroundCart' onClick={props.cerrar} style={props.show ? {} : {display: 'none', opacity: 0}}>
		</div>
		<div className='drawerCart' style={props.show ? {right: 0} : {}}>
			<span onClick={props.cerrar} className='close'>X Cerrar</span>
			<div className='title'>Mi pedido</div>
			<div className='items'>
				{props.cart.length === 0 
				?<span className='empty'>No hay productos en el carrito</span>
				:props.cart.map(product => {
							return <CartItem data={product} />
						})
				}
					
				
				
			</div>
			<div className="total" style={props.total !== '$0' ? {} : {display: 'none'}}><span>Total</span><span>{props.total}</span></div>
			{props.cart.length !== 0 && <div className='buttons'>
				{props.token === ''
				? <button className='btnPrimary' onClick={() => toast.info('Necesita tener una cuenta para seguir')}>Ir mi pedido</button>
				: <NavLink to='/cartList' className='buttons'><button className='btnPrimary'>Ir mi pedido</button></NavLink>
				}
				<button onClick={props.clearCart} className='btnSecondary'>Vaciar carrito</button>
			</div>}
		</div>
	</> );
}
 
const mapStateToProps = state => {
    return {
		cart: state.userReducer.cart,
		token: state.userReducer.token
    }
}

const mapDispatchToProps = {
	clearCart: userActions.clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);