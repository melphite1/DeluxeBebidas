import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RUTA_API } from '../constants';
import productActions from '../redux/actions/productActions';
import userActions from '../redux/actions/userActions';
import '../styles/product.css'

const Product = (props) => {

	const [wish, setWish] = useState({
		wished: false
	})

	useEffect(() => {
		if (props.wishlist.includes(props.data._id)) {
			setWish({
				wished: true
			})
		}
},[])
const wishlist = e => {
	if(props.token === ''){
		toast.info('Debes tener cuenta para añadir a deseados')
		return null;
	}
	if (wish.wished === true) {

		const idItem = props.data._id
		const userToken = props.token
		props.removeFromWishList(idItem, userToken)
		setWish({
			wished: !wish.wished
		})
	} else if (wish.wished === false) {

		const idItem = props.data._id
		const userToken = props.token
		props.addToWishList(idItem, userToken)
		setWish({
			wished: !wish.wished
		})

	}
}

const stars = (rating) => {
	let total = 0
	rating.map(rate => total += parseInt(rate))
	const prom = total / rating.length
	switch (Math.round(prom)) {
		case 1:
			return (<>
					<i class="fas fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
			</>)
			break;
		case 2:
			return (<>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
			</>)
			break;
		case 3:
			return (<>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="far fa-star"></i>
					<i class="far fa-star"></i>
			</>)
			break;
		case 4:
			return (<>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="far fa-star"></i>
			</>)
			break;
		case 5:
			return (<>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
					<i class="fas fa-star"></i>
			</>)
			break;
	
		default:
			return (<>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
				<i class="far fa-star"></i>
		</>)
			break;
	}
}

return (<>
	<div className="productCard">
		<div className="picture">
			<div className="info">
				<Link to={`/product/${props.data._id}`}>
					<i className="fas fa-search"></i>
				</Link>
			</div>
			<img src={`${RUTA_API}/${props.data._id}.jpg`} alt="test" />
			<div className="like">
				{wish.wished ? <i className="fas fa-heart" onClick={wishlist}></i> : <i className="far fa-heart" onClick={wishlist}></i>}

			</div>
		</div>
		<div className="text">
			<div className="data">
				<span className="rating">
					{stars(props.data.rating)}
					{props.data.rating.length === 0 ? "  N/A" : `  (${props.data.rating.length})`}
				</span>
				<Link to={`/product/${props.data._id}`}><span className="title">{props.data.title}</span></Link>
				<Link to={`/product/${props.data._id}`}><span className="price">${props.data.price}</span></Link>
			</div>
			{props.data.stock !== 0
			? <div className="addToCartBtn" onClick={() => props.addToCart(props.data._id, 1)}>
				Agregar al pedido <i className="fas fa-cart-plus"></i>
			</div>
			:<div className="addToCartBtn" style={{backgroundColor: 'black', color: 'white'}}>
			Sin stock
			</div>}
		</div>
	</div>
</>
);
}

const mapStateToProps = state => {
	return {
		wishlist: state.userReducer.wishlist,
		token: state.userReducer.token
	}
}
const mapDispatchToProps = {
	addToCart: userActions.addToCart,
	addToWishList: userActions.addToWishList,
	removeFromWishList: userActions.removeFromWishList
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);