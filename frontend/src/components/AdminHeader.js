import React from 'react';
import { connect } from 'react-redux';
import logoBlanco from '../images/logoBlanco.png';
import userActions from '../redux/actions/userActions';

const AdminHeader = (props) => {
	return ( <div className="adminHeader">
		<div className='logo'>
				<img src={logoBlanco} />
		</div>
		<div style={{flex: 1}}></div>
		<span onClick={props.logOut}><i className='fas fa-sign-out-alt'></i>Salir</span>
	</div> );
}
 
const mapDispatchToProps = {
    logOut: userActions.logoutUser
}
  
export default connect(null,mapDispatchToProps)(AdminHeader);