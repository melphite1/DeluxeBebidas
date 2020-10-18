const initialState = {
	shippingAddress:{},
	billingAddress: {},
	Orders:{}
}

function orderReducer(state = initialState, action) {
	switch (action.type) {
		case "SET_SHIPPING":	
			return {
				...state,
				shippingAddress: action.payload,
			}
		case "SET_BILLING":	
			return {
				...state,
				billingAddress: action.payload,
			}
		case "ALL_ORDERS":
			return{
				...state,
				Orders: action.payload
			}
		default:
			return state
	}
}

export default orderReducer;