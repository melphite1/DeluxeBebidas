import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import orderActions from '../redux/actions/orderActions';
import Footer from './Footer';
import Header from './Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';

const CreateOrder = (props) => {
	
	const [loading, setLoading] = useState(true)
	
	const [goHome, setgohome] = useState(true)
	
	
	const [pop, setPop] = useState(false)
	const popHandler = () => {
		setPop(!pop)
		
	}

	useEffect(() => {
		const createOr = async (order) => {
			await props.createOrder(order)
		}
		AOS.init()
		
		setTimeout(() => {
			setLoading(false)
			const order = {
				userId: props.user.id,
				shippingAddress: props.orderShippingInfo,
				billingAddress: props.orderBillingInfo,
				items: props.user.cart,
				payment: 'Tarjeta de credito'
			}
			createOr(order)
		}, 3000);
		setTimeout(() => {
		setgohome(false)
		},10000);
	}, [])

	return (  <>
		<Header />
        <div className='checkout'>
			<div className='breadcrum'>
				<img src={require('../images/stepOneOn.png')} />
				<img src={require('../images/stepTwoOn.png')} />
				<img src={require('../images/stepThreeOn.png')} />
				<img src={require('../images/stepFourOn.png')} />
				<img src={require('../images/stepFiveOn.png')} />
			</div>
			{loading 
			?<>
			<img src={require('../images/loader.gif')} className="loader"/>
			<p className="TheBuy">Procesando compra</p>
			</>
			: <>
			{goHome &&
			<>
			<div className='backgroundCart' onClick={popHandler} style={!pop ? {} : {display: 'none', opacity: 0}}></div>
			<div className="animationDiv" data-aos="zoom-in-down" onClick={popHandler} style={pop ? {display:"none"} : {}}>
			    <h4>¡Muchas gracias por su compra!</h4>
				<p>En breve le llegara un mail.</p>
			    <img src={require('../images/hola3.gif')}/>
			</div>
			</>}
			</>
            }
			{!goHome && (
		    <div>
				<p className='textPrimaryy' >Muchas gracias!</p>
				<div className="buttonsOrderDone">
					<NavLink to='/home'><button className='btnPrimaryy' > Volver al Inicio</button></NavLink>
					<NavLink to='/products/all'><button className='btnPrimaryyy' >Seguir Comprando</button></NavLink>
				</div>
			</div>)}
		
			
			
			  
		</div>
		<Footer />
		</> );
}

const mapStateToProps = state => {
    return {
		orderShippingInfo: state.userReducer.orderShippingInfo,
		orderBillingInfo: state.userReducer.orderBillingInfo,
		user: state.userReducer
    }
}

const mapDispatchToProps = {
	createOrder: orderActions.createOrder
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);