import React from 'react';
import AdminHeader from '../components/AdminHeader';
import EditProduct from '../components/EditProduct';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'
import Orders from '../components/Orders'
import { connect } from 'react-redux';

const AdminOrders = (props) => {
	if(props.role !== 'admin') props.history.push('/')
	
	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<Orders />
	</div></> );
}
 
const mapStateToProps = state => {
    return {
		role: state.userReducer.role,
    }
}

export default connect(mapStateToProps)(AdminOrders);