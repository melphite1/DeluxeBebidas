import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { RUTA_API } from '../constants';
import userActions from '../redux/actions/userActions';

const  CartListItem = (props) => {
    const [valor, setValor] = useState (0)
    var [count, setCount] = useState("")
    var[valuePrice, setPrice] = useState(0)

    useEffect ( () => {
        const fx = async() =>{
        	const precio = await props.data.price
			setValor({
				valor:precio
			})
			setCount(count = props.data.quantity)
			setPrice(valuePrice = precio * count )
		}
    fx()
    },[])

	const cartModifier = () => {

	}

    const addProduct = async () => {
        setCount(count + 1)
		setPrice(valuePrice = (count + 1) * valor.valor)
		props.actCart(props.data._id, (count + 1))
    }
    
    const removeProduct = () => {
    
        if(count - 1 <= 0){
            toast("Error: El pedido no pueden tener numeros negativos")
        
        }else{
            setCount(count - 1)
			setPrice(valuePrice = valor.valor * (count -1))
			props.actCart(props.data._id, (count - 1))
        }
    }

    if(valor.valor === undefined){
        return <h1>Loading</h1>
    }else{
    return (<>
    <div className="TheConteiner">
        <div className="cardCard">
            <div className="cardContainer"> 
                <div className="Photo" style={{backgroundImage: `url(${RUTA_API}/${props.data._id}.jpg)`}}> </div>
            </div>  
            <div className="botones">
                <h1>{props.data.title}</h1>
                <div className="theButtons">
                    <button onClick={removeProduct} className="plus">-</button>
                    <p>{count}</p>
                    <button onClick={addProduct} className="plus">+</button>
                    <p><span>x</span> $ {props.data.price} <span>=</span> $ {valuePrice}</p> 
                </div>
            </div> 
        </div>
   </div>
  
    </>
        )
    }
}

const mapStateToProps = state => {
    return {
		//cart: state.userReducer.cart
    }
}

const mapDispatchToProps = {
	actCart: userActions.actCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListItem)


