import axios from "axios"
import { toast } from "react-toastify"
import { RUTA_API } from "../../constants"

const productActions = {
    createProduct: (fd) => {

        return async (dispatch, getState) => {
            const response = await axios.post(RUTA_API + "/api/product/createProduct", fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
			})
			if(response.data.success) toast.success('Articulo creado con exito!')
			else toast.error('Falla al cargar el articulo')
        }
    },
    dataProduct: id=> {
        return async (dispatch, getState) => {
            const response = await axios.get(`${RUTA_API}/api/product/getProduct/${id}`)

            dispatch({
				type: "DATA_PRODUCT",
				payload: response.data.productFound
			})
        }
    },
    editProduct: (fd, id) => {
        return async (dispatch, getState) => {
            const response = await axios.put(RUTA_API + `/api/product/editProduct/${id}`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
			})
			if(response.data.success) toast.success('Articulo modificado con exito!')
			else toast.error('Falla al modificar el articulo')
		}
	},
    getProductByCategory: category => {
        return async(dispatch, getState) => {
		const respuesta = await axios.get(`${RUTA_API}/api/products/${category}`)
        const products = respuesta.data.listProducts
        dispatch({
            type: 'GET_PRODUCT_BY_CATEGORY',
            payload: products
            })
        }
    },
    getAllProducts: () => {
        return async(dispatch, getState) => {
            const respuesta = await axios.get(`${RUTA_API}/api/product/listProducts`)
            const allProduct = respuesta.data.list
            dispatch({
                type:'DATA_PRODUCT',
                payload: allProduct
            })
        }
    },


    getListProduct: category => {
        
        return async(dispatch, getState) => {
        const respuesta = await axios.get(`${RUTA_API}/api/products/${category}`)
        
        return respuesta.data.listProducts
        
        
            }
		},
		deleteProduct: id=> {
			return async (dispatch, getState) => {
				const response = await axios.delete(`${RUTA_API}/api/product/deleteProduct/${id}`)
				if(response.data.success) toast.info('Articulo borrado')
				dispatch({
					type: "DATA_PRODUCT",
					payload: response.data.productFound
				})
			}
		},
    }



    export default productActions