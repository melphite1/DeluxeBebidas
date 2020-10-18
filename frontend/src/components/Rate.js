import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import "../styles/rate.css"

const Rate = (props) => {
	const [rate, setRate] = useState({
		n: 1,
		exists: false
	})

	if(props.rates && props.dato && !rate.exists && props.rates.map(i => Object.values(i)).flat().includes(props.dato)) {
		setRate({
			...rate,
			exists: true
		})
	}

	const overHandler = e => {
		setRate({
			n: parseInt(e.target.id)
		})
	}
	
	const addHandler = async () => {
		await props.setRate(props.token, props.dato, rate.n)
		setRate({
			...rate,
			exists: true
		})
		props.setUpdate(!props.v)
	}

	const remHandler = async () => {
		await props.delRate(props.token, props.dato)
		setRate({
			...rate,
			exists: false
		})
		props.setUpdate(!props.v)
	}


	return ( <div className="rate">
	<h3>¿Ya lo conoces? Calificalo!</h3>
	<div class="stars">
		<i className="fas fa-star" id={1} onMouseEnter={overHandler}></i>
		<i className={rate.n >= 2 ? "fas fa-star" : "far fa-star"} id={2} onMouseEnter={overHandler}></i>
		<i className={rate.n >= 3 ? "fas fa-star" : "far fa-star"} id={3} onMouseEnter={overHandler}></i>
		<i className={rate.n >= 4 ? "fas fa-star" : "far fa-star"} id={4} onMouseEnter={overHandler}></i>
		<i className={rate.n >= 5 ? "fas fa-star" : "far fa-star"} id={5} onMouseEnter={overHandler}></i>
		<span>{rate.n}</span>
	</div>
	<div class="stars">
		<button className="vote" onClick={addHandler}>{rate.exists ? "Cambiar" : "Calificar"}</button>
		{rate.exists &&
		<button className="voteSec" onClick={remHandler}>Quitar</button>}
	</div>
	</div> );
}
 
const mapStateToProps = state => {
    return{
		id: state.userReducer.id,
		token: state.userReducer.token,
    }
}

const mapDispatchToProps = {
	setRate: userActions.setRate,
	delRate: userActions.delRate
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(Rate);