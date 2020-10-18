 import React, { useState,useEffect } from 'react'
 import userActions from '../redux/actions/userActions'
 import {connect} from 'react-redux'
 import { toast } from 'react-toastify';
 import Header from '../components/Header';
 import Footer from '../components/Footer';
 import '../styles/checkout.css';
 import 'react-credit-cards/es/styles-compiled.css';
 import Cards from 'react-credit-cards';

 const Payment = (props) => {

 const [card, setCard] = useState({
 	cvc: '',
 	expiry: '',
 	focus: '',
 	name: '',
 	number: '',
 	})

     const [error, setError] = useState({
 		cvc: '',
 		expiry: '',
 		focus: '',
 		name: '',
 		number: '',
 	})
	
 	const [send, setSend] = useState({
 		status: false
 	})
	
 	 const [alerta, setAlerta] = useState({
 	 	errorCvc: "",
 	 	errorExpiry: "",
 	 	errorFocus: "",
 	 	errorName: "",
 	 	errorNumber: "",
 	 })
	
	
	const actualizarHandler = async e => {
		e.preventDefault();
		send.status = true
		setSend({ status: true })
	
		if (validation(card)) {
			props.history.push('/createOrder')
			
		}else{
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
				errorCvc: error.Cvc,
				errorExpiry: error.expiry,
				errorName: error.name,
				errorNumber: error.number,
			})
		}
	}


  const handleInputFocus = (e) => {
  	setCard({...card, focus: e.target.name });
  }
	
//   const handleInputChange = (e) => {
//   	const { name, value } = e.target;
//   	setCard({...card, [name]: value });
//   }




  const validation = card => {
  	error.ok = true
  		// RegEx
  		const alphanum = RegExp(/^\w+$/)
  		const num = RegExp(/\d./)
  		const decimals = RegExp(/^([0-9]+(\.?[0-9]?[0-9]?)?)/)							
		
  		// cvc
		if (card.cvc === '') {
			error.Cvc = 'El numero de la tarjeta no puede estar vacio'
			error.ok = false
		}
		else if (!num.test(card.cvc)) {
			error.Cvc = 'Solo puede contener números'
			error.ok = false
		}
	    else error.Cvc = ''
			
	    
  		//  
  		if (card.expiry === '') {
  			error.expiry = 'La fecha de vencimiento no puede estar vacia'
  			error.ok = false
  		}
		
  		else if (!num.test(card.expiry)) {
  			error.expiry = 'Solo puede contener numeros '
  			error.ok = false
  		}
		
		else error.expiry = ''
		
  		// name
  		if (card.name === '') {
  			error.name = 'El nombre no puede estar vacío'
  			error.ok = false
  		}
  		else error.name = ''
		
		
  		// number
  		if (card.number === '') {
  			error.number = 'El numero de la tarjeta no puede estar vacio'
  			error.ok = false
  		}
  		else if (!num.test(card.number)) {
  			error.number = 'Solo puede contener números'
			error.ok = false
		}
		else error.number = ''
	
		//Return
  	    return error.ok
	}

  	    /*---------------------------------------------VALIDATION-----------------------------------------*/

  const inputHandler = (e) => {
  	const valor = e.target.value;
  	const campo = e.target.name;
  	setCard({
  			...card,
  			[campo]: valor
  	})
  }
 	return (
 		<>
 			<Header />
 			<div className='checkout'>
 				<div className='breadcrum'>
 					<img src={require('../images/stepOneOn.png')} />
 					<img src={require('../images/stepTwoOn.png')} />
 					<img src={require('../images/stepThreeOn.png')} />
 					<img src={require('../images/stepFourOn.png')} />
 					<img src={require('../images/stepFiveOff.png')} />
 				</div>
 				<div className='title'>
 					<span>Pago con tarjeta</span>
 				</div>
 				<div id="PaymentForm">
 					<Cards
 					cvc={card.cvc}
 					expiry={card.expiry}
 					focused={card.focus}
 					name={card.name}
 					number={card.number}
 					/>
 					<form className='addressForm'>
 						<div className='input'>
 							<label>Numero</label>
 							<input type="tel" name="number" placeholder="Ej. 4912 1234 1234 1234" onChange={inputHandler} onFocus={handleInputFocus} maxLength={16} />
 						    <span style={{ color: "red" }}>{alerta.errorNumber}</span>
						 </div>
 						<div className='input'>
 							<label>Nombre</label>
 							<input type="text" name="name" placeholder="Ej. Maria Gomez" onChange={inputHandler} onFocus={handleInputFocus} />
 						    <span style={{ color: "red" }}>{alerta.errorName}</span>
						 </div>
 						<div className='input'>
 							<label>Fecha de expiracion</label>
 							<input type="tel" name="expiry" placeholder="MMAA" onChange={inputHandler} onFocus={handleInputFocus} maxLength={4} />
 						    <span style={{ color: "red" }}>{alerta.errorExpiry}</span>
						 </div>
 						<div className='input'>
 							<label>Codigo de seguridad</label>
 							<input type="tel" name="cvc" placeholder="Ej. 123" onChange={inputHandler} onFocus={handleInputFocus} maxLength={3}/>
 						    <span style={{ color: "red" }}>{alerta.errorCvc}</span>
						</div>
 						<div className="buttons">
 							<button className="btnSecondary" onClick={() => props.history.push('/billingAddress')}>Volver</button>
 							<button className="btnPrimary" onClick={actualizarHandler}>Pagar y finalizar compra</button>
 						</div>
 					</form>
 				</div>
 			</div> 
 			<Footer />
 		</>
 		)
 }




 const mapStateToProps = state => {
     return {
         user: state.userReducer
     }
 }

 const mapDispatchToProps = {
	
 }


 export default connect(mapStateToProps, mapDispatchToProps)(Payment);