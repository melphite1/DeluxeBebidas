import React, { useState,useEffect } from 'react'
import userActions from '../redux/actions/userActions'
import userReducer from '../redux/reducers/userReducer'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/checkout.css';
import { Alert } from 'reactstrap';

const ShippingAddress = (props) => {


const [shipping, setShipping] = useState({
    street: props.shippingAddress !== undefined ? props.shippingAddress.street : '',
    number: props.shippingAddress !== undefined ? props.shippingAddress.number : '',
    dpto:  props.shippingAddress !== undefined ? props.shippingAddress.dpto : '',
    who: props.shippingAddress !== undefined ? props.shippingAddress.who : '',
    phone: props.shippingAddress !== undefined ? props.shippingAddress.phone : '',
    notes: props.shippingAddress !== undefined ? props.shippingAddress.notes : '',
})

const [error, setError] = useState({
	street:'',
	number:'',
	dpto:'',
	who:'',
	phone:'',
	notes:''
})

const [send, setSend] = useState({
	status: false
})

const [alerta, setAlerta] = useState({
	errorStreet: "",
	errorNumber: "",
	errorDpto: "",
	errorWho: "",
	errorPhone: "",
	errorNotes: "",
})

const actualizarHandler = async e => {
	e.preventDefault();
	
	if (validation(shipping)) {
		props.history.push('/billingAddress')
		await props.addShippingOrderInfo(shipping)
	}else {
		toast.error("¡Porfavor completar los campos obligatorios!", {
			position: toast.POSITION.TOP_CENTER
	    });
		send.status = false
	setSend({ status: false })
	setError({
		...error,
		ok: false
	})
	setAlerta({
		errorStreet: error.street,
		errorNumber: error.number,
		errorDpto: error.dpto,
		errorWho: error.who,
		errorPhone: error.phone,
		errorNotes: error.notes,
	    })
	}
}





                                    /*----------------------------------------------VALIDATION-----------------------------------------*/

const validation = (shipping) => {
	
	error.ok = true
	
	//RegEx
		const alphanum = RegExp(/^\w+$/)
		const num = RegExp(/\d./)
		const decimals = RegExp(/^([0-9]+(\.?[0-9]?[0-9]?)?)/)			
	
	//street
	if (shipping.street === '') {
		error.street = 'Calle no puede estar vacía'
		error.ok = false
	}
	else error.street = ""
	
	// number
	if (shipping.number === '') {
		error.number = 'El número no puede estar vacío'
		error.ok = false
	}
	else if (!num.test(shipping.phone)) {
		error.number = 'Solo puede contener números'
		error.ok = false
	}
	else error.number = ''
    
	//dpto
	// if (shipping.dpto > 15 || shipping.dpto === undefined) {
	// 	error.dpto = "El número máximo de pisos es 14"
	// 	error.ok = false
	// }
	// else error.dpto = ''
	
	//who
	if (shipping.who === '') {
		error.who = 'Quien recibe el producto No puede estar vacía'
		error.ok = false
	}
	else error.who = ""
	
	//phone
	if (shipping.phone === '') {
		error.phone = 'El teléfono no puede estar vacío'
		error.ok = false
	}
	else if (!num.test(shipping.phone)) {
		error.phone = 'Solo puede contener números'
		error.ok = false
	}
	else error.phone = ''
	
    //return
    return error.ok
}

                                        /*----------------------------------------------VALIDATION-----------------------------------------*/

const inputHandler = (e) => {
	const valor = e.target.value;
	const campo = e.target.name;
	setShipping({
			...shipping,
			[campo]: valor
	})
}

const submitHandler = async e => {
	e.preventDefault();
    send.status = true
    setSend({ status: true })

if (validation(shipping)) {
	
	toast.success("¡Datos Confirmados!", {
		position: toast.POSITION.TOP_CENTER
});
	await props.addShippingAddress(shipping,props.user.token)
	
	setError({
		...error,
		ok: true
	})
	
	setAlerta({
		errorStreet: '',
		errorNumber: '',
		errorDpto: '',
		errorWho: '',
		errorPhone: '',
		errorNotes: '',
	})
    
}
else {
	send.status = false
	setSend({ status: false })
	setError({
		...error,
		ok: false
	})
	setAlerta({
		errorStreet: error.street,
		errorNumber: error.number,
		errorDpto: error.dpto,
		errorWho: error.who,
		errorPhone: error.phone,
		errorNotes: error.notes,
	    })
	}
}

return (
    <>
		<Header />
        <div className='checkout'>
			<div className='breadcrum'>
				<img src={require('../images/stepOneOn.png')} />
				<img src={require('../images/stepTwoOn.png')} />
				<img src={require('../images/stepThreeOff.png')} />
				<img src={require('../images/stepFourOff.png')} />
				<img src={require('../images/stepFiveOff.png')} />
			</div>
			<div className='title'>
				<span>Datos de envio</span>
			</div>
			<form className='addressForm'>
				<div className="input">
					<label>Calle</label>
					<input type='text' onChange={inputHandler} name="street" value={shipping.street} />
					<span style={{ color: "red" }}>{alerta.errorStreet}</span>

				</div>
				<div className="input">
					<label>Altura</label>
					<input type='text' onChange={inputHandler} name="number" value={shipping.number} />
				    <span style={{ color: "red" }}>{alerta.errorNumber}</span>
				</div>
				
				<div className="input">
					<label>Piso/Dpto</label>
					<input type='text' onChange={inputHandler} name="dpto" value={shipping.dpto} />
				    <span style={{ color: "red" }}>{alerta.errorDpto}</span>
				</div>
				<div className="input">
					<label>Quien recibe?</label>
					<input type='text' onChange={inputHandler} name="who" value={shipping.who} />
				    <span style={{ color: "red" }}>{alerta.errorWho}</span>
				</div>
				<div className="input">
					<label>Telefono</label>
					<input type='text' onChange={inputHandler} name="phone" value={shipping.phone} />
					<span style={{ color: "red" }}>{alerta.errorPhone}</span>
				</div>
				<div className="input">
					<label>Notas</label>
					<input type='text' onChange={inputHandler} name="notes" value={shipping.notes} />
				    <span style={{ color: "red" }}>{alerta.errorNotes}</span>
				</div>
				
                <div className="input">
                    <button className="btnPrimary" style={{margin:'0 auto', width:'40vh'}} type="submit" value="Send Info" onClick={submitHandler}>Guardar datos</button>
                </div>
                
                <div className="buttons">
                <button className="btnSecondary" onClick={() => props.history.push('/cartList') }>Volver</button>
				<button className="btnPrimary" onClick={actualizarHandler}>Siguiente</button>
				</div>
			</form>
        </div> 
        <Footer />
    </>
        )
}




const mapStateToProps = state => {
    return {
        shippingAddress: state.userReducer.shippingAddress,
		orderShippingInfo: state.userReducer.orderShippingInfo,
		user: state.userReducer
    }
}

const mapDispatchToProps = {
	addShippingAddress: userActions.addShippingAddress,
	addShippingOrderInfo: userActions.addShippingOrderInfo
    }

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);