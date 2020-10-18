import React, { useEffect, useReducer, useState }  from 'react';
import userActions from '../redux/actions/userActions';
import productActions from '../redux/actions/productActions';
import {connect} from "react-redux"
import { RUTA_API } from '../constants';

function ProductLike(props) {
    const [wish, setWish] = useState({
		wished: false
    })
    useEffect(() => {
		if (props.wishlist.includes(props.producto._id)) {
			setWish({
				wished: true
			})
		}
},[])
    const wishlist = e => {
        if (wish.wished === true) {
    
            const idItem = e.target.id
            const userToken = props.token
            props.removeFromWishList(idItem, userToken)
            setWish({
                wished: !wish.wished
            })
        } else if (wish.wished === false) {
    
            const idItem = e.target.id
            const userToken = props.token
            props.addToWishList(idItem, userToken)
            setWish({
                wished: !wish.wished
            })
    
        }
    }

   
    return (
        < div className="theWish"> 
            <div className="infoWish">
                <div className="wishBack" style={{backgroundImage: `url(${RUTA_API}/${props.producto._id}.jpg)`}}> </div>
                <div>
                    <p className="wishTitle">{props.producto.title}</p>
                    <p>$ {props.producto.price}</p>
                </div>
            </div>
            {wish.wished ? <i className="fas fa-heart" onClick={wishlist} id={props.producto._id}></i> : <i className="far fa-heart" onClick={wishlist} id={props.producto._id}></i>}
        </ div>
    );
}
const mapStateToProps = state => {
    return {

        firstName: state.userReducer.firstName,
        lastName: state.userReducer.lastName,
        shippingAddress: state.userReducer.shippingAddress,
        billingAddress: state.userReducer.billingAddress,
        phone: state.userReducer.phone,
        wishlist: state.userReducer.wishlist,
        productFound: state.productReducer.productFound,
        token: state.userReducer.token
    }
}

const mapDispatchToProps = {

    modifyUser: userActions.modifyUser,
    productsList: productActions.getAllProducts,
    addToWishList: userActions.addToWishList,
	removeFromWishList: userActions.removeFromWishList
}

export default connect (mapStateToProps, mapDispatchToProps) (ProductLike)