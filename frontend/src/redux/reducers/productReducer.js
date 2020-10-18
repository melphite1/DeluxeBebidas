const initialState = {
	productFound:{},
	products: []
}

function productReducer(state = initialState, action) {
	switch (action.type) {
		case "DATA_PRODUCT":	
			return {
				...state,
				productFound: action.payload,
			}
		case "GET_PRODUCT_BY_CATEGORY":	
			return {
				...state,
				products: action.payload,
			}
		
		default:
			return state
	}
}

export default productReducer;