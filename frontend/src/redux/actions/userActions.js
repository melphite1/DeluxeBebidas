import axios from "axios"
import { RUTA_API } from "../../constants"
import { toast } from "react-toastify"


const getCartItems = () => {
	let items = (localStorage.getItem('items') === null) ? [] : JSON.parse(localStorage.getItem('items'));
	return items;
}

const userActions = {
	createUser: (user, set = null) => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + '/api/user/register', user)

			if (response.data.success === "false") {
				set({ status: false })
				let errors = response.data.error.errors;
				if (errors.username !== undefined) toast.error(errors.username.message);
				if (errors.mail !== undefined) toast.error(errors.mail.message);
				return;
			}
			else {
				toast.success(`Cuenta creada!`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						id: response.data.id,
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						wishlist: response.data.wishlist,
						billingAddress: response.data.billingAddress,
						shippingAddress: response.data.shippingAddress,
						rates: response.data.rates,
						role: response.data.role
					},
				})
			}
			return response
		}
	},
	addShippingAddress: (shipping, token) => {
		return async (dispatch, getState) => {

			const response = await axios.put(`${RUTA_API}/api/user/addShippingAddress`, shipping, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})

			const info = response.data.response.shippingAddress

			if (!response.data.success) {
				toast.error(response.data.error)
				return response.data.error
			} else {
				dispatch({
					type: "INFO_SHIPPING_ADDRESS_UPDATE",
					payload: shipping
				})
			}
		}
	},

	addBillingAddress: (billing, token) => {
		return async (dispatch, getState) => {
			const response = await axios.put(`${RUTA_API}/api/user/addBillingAddress`, billing, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			const info = response.data.response.billingAddress

			if (!response.data.success) {
				toast.error(response.data.error)
				return response.data.error
			} else {
				dispatch({
					type: "INFO_BILLING_ADDRESS_UPDATE",
					payload: billing
				})
			}
		}
	},

	getUserInfo: (token) => {
		return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/user/getInfoUser`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			const info = response.data.user
			dispatch({
				type: 'GET_INFO_USER',
				payload: info
			})
		}
	},
	loginUser: user => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + "/api/user/login", user)

			if (!response.data.success) {
				toast.error(response.data.error)
				return response.data.error
			} else {
				toast.success(`Buenas ${response.data.firstName}!`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						id: response.data.id,
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						wishlist: response.data.wishlist,
						billingAddress: response.data.billingAddress,
						shippingAddress: response.data.shippingAddress,
						rates: response.data.rates,
						role: response.data.role
					},
				})
			}
		}
	},


	logoutUser: () => {
		return (dispatch, getState) => {
			toast.info("Nos vemos mas tarde!")
			dispatch({
				type: "LOGOUT_USER",
			})
		}
	},
	authUser: token => {
		return async (dispatch, getState) => {
			let response
			try {
				response = await axios.get(RUTA_API + "/api/user/login", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})

			} catch {
				return false
			}
			const { lastName, firstName, wishlist, id, billingAddress, shippingAddress, rates, role } = response.data
			dispatch({
				type: "USER_IN",
				payload: {
					token,
					id,
					firstName,
					lastName,
					wishlist,
					billingAddress,
					shippingAddress,
					rates,
					role
				},
			})
		}
	},



	modifyUser: (user) => {
		return async (dispatch, getState) => {
			const response = await axios.put(RUTA_API + "/api/user/modifyUser", user, {
				headers: {
					'Authorization': "Bearer " + getState().userReducer.token,
				}

			})
			dispatch({
				type: "USER_IN",
				payload: {
					firstName: response.data.newInfo.firstName,
					lastName: response.data.newInfo.lastName,
					billingAddress: response.data.newInfo.billingAddress,
					shippingAddress: response.data.newInfo.shippingAddress,
					token: getState().userReducer.token
				},
			})
			if (response.data.success) toast.success('Cambios guardados!')
			else toast.error('Ha habido un problema')
		}
	},


	newComment: comment => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + "/api/comment/", comment)
		}
	},
	getComments: productId => {
		return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/comment/${productId}`)
			dispatch({
				type: "GET_COM",
				payload: response.data.comments,
			})
		}
	},
	deleteComment: commentId => {
		return async (dispatch, getState) => {
			const response = await axios.delete(`${RUTA_API}/api/comment/${commentId}`)
		}
	},
	editComment: edited => {
		return async (dispatch, getState) => {
			const response = await axios.put(RUTA_API + "/api/comment", edited)
			if (response.data.success === true) toast.success("Comentario editado")
			else toast.error("Ha ocurrido un error")
		}
	},
	addToCart: (id, cantidad) => {
		return async (dispatch, getState) => {
			toast.success('Articulo añadido al pedido')
			let found = false
			let cart = getCartItems()
			if (cart.length > 0) {
				cart.map(item => {
					if (item._id === id) {
						item.quantity += cantidad;
						found = true;
					}
				})
			}
			if (found) {
				dispatch({
					type: 'LOAD_CART',
					payload: cart
				})
			}
			else {
				const response = await axios.get(`${RUTA_API}/api/product/getProduct/${id}`)
				const item = response.data.productFound
				item.quantity = cantidad
				cart.push(item)
				dispatch({
					type: 'LOAD_CART',
					payload: cart
				})
			}
		}
	},
	actCart: (id, cantidad) => {
		return async (dispatch, getState) => {
			let cart = getCartItems()
			cart.map(item => {
				if (item._id === id) {
					item.quantity = cantidad;
				}
			})
			dispatch({
				type: 'LOAD_CART',
				payload: cart
			})
		}
	},
	loadCart: () => {
		return (dispatch, getState) => {
			let cart = getCartItems();
			dispatch({
				type: 'LOAD_CART',
				payload: cart
			})
		}
	},
	removeFromCart: id => {
		return async (dispatch, getState) => {
			let cart = getCartItems()
			cart.map((item, index) => {
				if (item._id === id) {
					item.quantity--
					if (item.quantity === 0) {
						cart.splice(index, 1)
					}
				}
			})
			dispatch({
				type: 'LOAD_CART',
				payload: cart
			})
		}
	},
	clearCart: () => {
		return async (dispatch, getState) => {
			let cart = []
			localStorage.removeItem("items")
			dispatch({
				type: 'LOAD_CART',
				payload: cart
			})
		}
	},

	addToWishList: (id, token) => {		
		return async (dispatch, getState) => {

			const response = await axios.put(`${RUTA_API}/api/user/addWishList/`, { id: id }, {
				headers: {
					'Authorization': "Bearer " + token,
				}
			})
			if (response.data.success) {
				toast.success('Añadido a favoritos')
				dispatch({
					type: "WISHLIST",
					payload: response.data.wishlist
				})
			}

		}
	},
	removeFromWishList: (id, token) => {

		return async (dispatch, getState) => {
			const response = await axios.delete(`${RUTA_API}/api/user/removeWishList/${id}`, {
				headers: {
					'Authorization': "Bearer " + token,
				}
			})
			if (response.data.success) {
				toast.success('Removido a favoritos')
				dispatch({
					type: "WISHLIST",
					payload: response.data.wishlist
				})
			}
		}
	},
	sendMail: (mail) => {
		return async (dispatch, getState) => {
			const response = await axios.put(`${RUTA_API}/api/sendMail`, { mail })
			
			dispatch({
				type: "SEND_MAIL"
			})
			return response.data.success
		}
	},
	setRate: (token, id, value) => {
		return async (dispatch, getState) => {
			const response = await axios.patch(`${RUTA_API}/api/user/rate`, { id, value }, {
				headers: {
					'Authorization': "Bearer " + token,
				}
			})
			if (response.data.success) {
				toast.success('Calificacion hecha!')
				dispatch({
					type: "RATES",
					payload: response.data.rates
				})
			}
			else toast.error('Hubo un error al calificar')
		}
	},
	delRate: (token, id) => {
		return async (dispatch, getState) => {
			const response = await axios.patch(`${RUTA_API}/api/user/rate/r`, { id }, {
				headers: {
					'Authorization': "Bearer " + token,
				}
			})
			dispatch({
				type: "RATES",
				payload: response.data.rates
			})
		}
	},


	addShippingOrderInfo: (shipping) => {
		return async (dispatch, getState) => {
			dispatch({
				type: "SHIPPING_ORDER_INFO",
				payload: shipping
			})
		}
	},


	addBillingOrderInfo: (billing) => {
		return async (dispatch, getState) => {
			dispatch({
				type: "BILLING_ORDER_INFO",
				payload: billing
			})
		}
	},
	
	getDataAdmin: () => {
        return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/user/admin`)
		    return response.data.response
		}
	},
	getUserOrder: (token) => {
		return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/order/user`, {
				headers: {
					'Authorization': "Bearer " + token,
				}
			})
			const info = response.data.response
			dispatch({
				type: "USER_ORDER",
				payload: info
			})
		}
	},

}

export default userActions