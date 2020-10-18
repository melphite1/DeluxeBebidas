import React, {useState, useEffect} from 'react';
import CartListItem from '../components/CartListItem'
import AdminHeader from'../components/AdminHeader'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/checkout.css"
import "../styles/cartList.css"

const CardList = (props) => {	

return(<>
		<Header />
		<div className="checkout">
			<div className='breadcrum'>
				<img src={require('../images/stepOneOn.png')} />
				<img src={require('../images/stepTwoOff.png')} />
				<img src={require('../images/stepThreeOff.png')} />
				<img src={require('../images/stepFourOff.png')} />
				<img src={require('../images/stepFiveOff.png')} />
			</div>
			<div className='title'>
				<span>Mi pedido</span>
			</div>
			{props.cart.map((product, index) => {
				return <CartListItem data={product} index={index} key={index} />
			})} 
			<NavLink to="/shippingAddress" style={{alignSelf: "center", maxWidth: 400}}><button className="btnPrimary" style={{minWidth: 200}}>Confirmar y continuar</button></NavLink>
		</div>
		<Footer />
	</>
)}



const mapStateToProps = state => {
    return{
        cart: state.userReducer.cart
	}
}

  
export default connect(mapStateToProps,null)(CardList);


