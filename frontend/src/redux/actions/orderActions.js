import axios from "axios"
import { toast } from "react-toastify"
import { RUTA_API } from "../../constants"

const orderActions = {
	createOrder: order => {
		return async (dispatch, getState) => {
			const response = await axios.post(`${RUTA_API}/api/orders`, order, {
				headers: {
					'Authorization': "Bearer " + getState().userReducer.token,
				}

			})
			
			if (response.data.success) {
				localStorage.removeItem('items')
				let cart = []
				dispatch({
					type: 'LOAD_CART',
					payload: cart
				})
			}
		}
	},
	getAllOrders: () => {

		return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/orders`)
			const info = response.data.response
			dispatch({
				type: "ALL_ORDERS",
				payload: info
			})
		}

	},
	terminarOrden: (id) => {
		return async (dispatch, getState) => {
			const response = await axios.put(`${RUTA_API}/api/orders/${id}`)
			const info = response.data.response
			dispatch({
				type: "ALL_ORDERS",
				payload: info
			})
		}

	}
}

export default orderActions;