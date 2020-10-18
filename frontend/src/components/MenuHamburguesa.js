import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../styles/cart.css';
import CartItem from './CartItem';

const MenuHamburguesa = (props) => {
	return ( <>
       <div className='backgroundCart' onClick={props.cerrar} style={props.show ? {} : {display: 'none', opacity: 0}}></div>
       <div className='drawerCart' style={props.show ? {right: 0} : {}}>
            <span onClick={props.cerrar} className='close'>X Cerrar</span>
            <div className='title'>Menu</div>
            <div className='theLinks'>
                    <NavLink to="/" className='ufc'>Home</NavLink>
                    <NavLink to="products/all" className='ufc'>Bebidas</NavLink>
            </div>
            <div className='theLinks'>
                {!props.token
                ?<>
                <NavLink to="/login" className='ufc'>Ingresar</NavLink>  
                <NavLink to="/signup" className='ufc'>Registrarse</NavLink>
                </>
                :<>
                <NavLink to="/account" className='ufc'>Mi cuenta</NavLink> 
                <NavLink to onClick={props.logOut} className='ufc'>Salir</NavLink>
                </>}
            </div>
        </div>
	</> );
}
 
const mapStateToProps = state => {
    return {
		token: state.userReducer.token,
    }
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHamburguesa);