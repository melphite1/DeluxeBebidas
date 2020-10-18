import React from 'react';
import { connect } from 'react-redux';
import { RUTA_API } from '../constants';
import foto from '../images/ron-barcelo.png'
import userActions from '../redux/actions/userActions';

const CartItem = (props) => {
	
	return ( <>
		<div className='cartItem'>
			<div className='pic' style={{backgroundImage: `url(${RUTA_API}/${props.data._id}.jpg)`}}>

			</div>
			<div className='text'>
				<span>{props.data.title}</span>
				<span>{props.data.ml}ml / {props.data.alcPct}%</span>
				<span>{props.data.quantity} x ${props.data.price}</span>
			</div>
			<div className='actions'>
				<span onClick={() => props.removeFromCart(props.data._id)}>X</span>
			</div>
		</div>
	</> );
}
 
const mapStateToProps = state => {
    return{
	}
}
const mapDispatchToProps = {
	removeFromCart: userActions.removeFromCart
}
  
export default connect(mapStateToProps,mapDispatchToProps)(CartItem);