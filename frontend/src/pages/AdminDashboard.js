import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../components/AdminHeader';
import DataAdmin from '../components/DataAdmin';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'
import userActions from '../redux/actions/userActions';


const AdminDashboard = (props) => {
	
	const [datos, setDatos] = useState({
		ordenes:'',
		articuloOutStock:'',
		cantidadDeUsuarios: '',
		reseñas: ''
	})


	useEffect(() => {
		const functionAdmin = async () => {
		var infoAdmin = await props.getDataAdmin()
		setDatos({
			...datos,
			ordenes: infoAdmin.pendingOrdes,
			articuloOutStock: infoAdmin.outStock,
			cantidadDeUsuarios: infoAdmin.totalUser,
			reseñas: infoAdmin.reviewsMade  
		})
	}
	functionAdmin()
},[])
	


	if(props.role !== 'admin') props.history.push('/')

	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<DataAdmin datos ={datos}/>		
	</div></> );
}
 
const mapStateToProps = state => {
    return {
		role: state.userReducer.role,
    }
}

const mapDispatchToProps = {
	getDataAdmin: userActions.getDataAdmin,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);