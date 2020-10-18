import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HeaderFooter.css';
import logo from '../images/logo.png';
import logoBlanco from '../images/logoBlanco.png';
import Cart from './Cart';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import MenuHamburguesa from './MenuHamburguesa';

const Header = (props) => {
	const [menu, setmenu] = useState(false)
	
	const menuHandler = () => {
		setmenu(!menu)
	}

	const [cart, setCart] = useState(false)
	const cartHandler = () => {
		setCart(!cart)
	}

	const itemsTotal = () => {
		let q = 0
		props.cart.map(product => {
			q += product.quantity
		})
		return q === 1 ? `${q} item` : `${q} items`
	}

	const moneyTotal = () => {
		let m = 0
		props.cart.map(product => {
			m += (product.quantity * product.price)
		})
		return `$${m}`
	}

	return ( <> 
		<header>
			<div className="bigSize">
				<div className='logo'>
					<img src={logoBlanco} />
				</div>
				<div className='links'>
					<NavLink to="/" className='ufc'>Home</NavLink>
					<NavLink to="/products/all" className='ufc'>Bebidas</NavLink>
				</div>
				<div style={{flex: 1}}/>
				<div className='links'>
					{!props.token
					?<>
					<NavLink to="/login" className='ufc'>Ingresar</NavLink> / 
					<NavLink to="/signup" className='ufc'>Registrarse</NavLink>
					</>
					:<>
					<NavLink to={props.role === 'admin' ? "/admin" : "/account"} className='ufc'>{props.role === 'admin' ? "Panel de control" : "Mi cuenta"}</NavLink> / 
					<NavLink to onClick={props.logOut} className='ufc'>Salir</NavLink>
					</>}
				</div>
				<div className='cart' onClick={cartHandler}>
					<div className='icono'>
						<i class="fas fa-shopping-cart"></i>
					</div>
					<div className='data'>
						<span>{moneyTotal()}</span>
						<span>{itemsTotal()}</span>
					</div>
				</div>
				<Cart show={cart} cerrar={cartHandler} total={moneyTotal()} />
			</div>
			<div className="smallSize">
				<div className='menu' onClick={menuHandler}>
					<div className='icono'>
						<i class="fas fa-bars"></i>
					</div>
				</div>
				<MenuHamburguesa show={menu} cerrar={menuHandler} />
				<div className='logo'>
					<img src={logoBlanco} />
			    </div>
				<div className='cart' onClick={cartHandler}>
					<div className='icono'>
						<i class="fas fa-shopping-cart"></i>
					</div>
					<div className='data'>
						<span>{moneyTotal()}</span>
						<span>{itemsTotal()}</span>
					</div>
				</div>
				<Cart show={cart} cerrar={cartHandler} total={moneyTotal()} />
			</div>
			
		</header>
	</> );
}
 
const mapStateToProps = state => {
    return {
		token: state.userReducer.token,
		cart: state.userReducer.cart,
		role: state.userReducer.role,
    }
}

const mapDispatchToProps = {
    logOut: userActions.logoutUser
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Header);