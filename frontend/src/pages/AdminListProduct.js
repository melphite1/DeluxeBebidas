import React from 'react';
import AdminHeader from '../components/AdminHeader';
import EditProduct from '../components/EditProduct';
import NavAdmin from '../components/NavAdmin';
import '../styles/adminDashboard.css'
import ListProduct from '../components/ListProduct'
import { connect } from 'react-redux';

const AdminListProduct = (props) => {
	if(props.role !== 'admin') props.history.push('/')
	
	return ( <>
	<AdminHeader />
	<div className="dashboard">
		<NavAdmin />
		<ListProduct />
	</div></> );
}

const mapStateToProps = state => {
    return {
		role: state.userReducer.role,
    }
}

export default connect(mapStateToProps)(AdminListProduct);