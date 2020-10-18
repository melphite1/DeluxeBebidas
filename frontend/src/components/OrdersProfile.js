import React from 'react';
import { connect } from "react-redux"

import OrderProfile from './OrderProfile';

const OrdersProfile = (props) => {


	return (<>

		<div className="container">

			{props.orders.length === undefined ?
				null :
				props.orders.map(order => {
					return <>
						<OrderProfile data={order}/>
					</>


				})}

		</div>


	</>);
}

const mapStateToProps = state => {
	return {
		
	}
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersProfile);