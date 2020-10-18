const Product = require('../models/Product');

const productController = {
	createProduct: async (req, res) => {

		const { category, title, description, price, stock, ml, alcPct, rating } = req.body

		const newProduct = new Product({ category, title, description, price, stock, ml, alcPct, rating })

		newProduct.save()
		
			.then(newProduct => {
	
				if (req.files.pic !== undefined) {
					const path = require('path');
					const file = req.files.pic
					const ruta = `${path.join(__dirname, '..', 'client', 'img')}/${newProduct._id}.jpg`
					let error = false
					file.mv(ruta, async err => {
						if (err) {
							error = "Error saving image";
						}
						else {
							const newProducto = await Product.findOneAndUpdate({ _id: newProduct._id }, { pic: `http://localhost:4000/${newProduct._id}.jpg` }, { new: true })
							res.json({
								success: !error ? true : false,
								error,
								newProducto
							})
						}
					})
				}
				
			})
			.catch(error =>{
				
				
				res.json({ success: false, error })})


	},

	modifyProduct: async (req, res) => {
		const id = req.params.id
		const { category, title, description, price, stock, ml, alcPct } = req.body

		if (req.files.pic !== undefined) {
			const path = require('path');
			const file = req.files.pic
			const ruta = `${path.join(__dirname, '..', 'client', 'img')}/${id}.jpg`
			let error = false
			file.mv(ruta, async err => {
				if (err) {
					error = 'Error saving image';
				}
				else {
					const editedProduct = await Product.findByIdAndUpdate(id , { category, title, description, price, stock, ml, alcPct,pic: `http://localhost:4000/${id}.jpg` }, { returnNewDocument: true })
					
					res.json({
						success: !error ? true : false,
						error,
						editedProduct
					})
				}
			})
		}
	},

	
	deleteProduct: async (req, res) => {
		const id = req.params.id
		const productDeleted = await Product.findByIdAndDelete(id)

			.then(productDeleted => res.json({ success: true, productDeleted }))
			.catch(error => res.json({ success: false, error }))
	},
	
	getAllProducts: async (req, res) => {
		Product.find()
		.then(list => res.json({success:true, list:list}))
	    .catch(error => res.json({success: false, error:error}))
	},

	getProductByCat: async (req, res) => {
		const {category} = req.params
		if(category === 'all') {
			Product.find()
			.then(listProducts => res.json({success: true, listProducts}))
			.catch(error =>res.json({success: false, error}))
		}
		else {
			Product.find({ category })
			.then(listProducts => res.json({success: true, listProducts}))
			.catch(error =>res.json({success: false, error}))
		}
	},

	getProductById: async (req, res) => {
		const {id} = req.params
		Product.findById({_id: id})
		.then(productFound => res.json({success: true, productFound}))
		.catch(error =>res.json({success: false, error}))
	},
	getProductByWishlist: async (req, res) => {
		const { arrayIDs } = req.body
		Product.find({ _id: arrayIDs })
			.then(productWishList => res.json({ success: true, productWishList }))
			.catch(error => res.json({ success: false, error }))
	},

	
	getListProduct: async (req, res) => {
		const { category } = req.params
		Product.find({ category })
		.then(listProducts => res.json({success: true, listProducts}))
	    .catch(error => res.json({success: false ,error}))
	},
	instaRate: async (req, res) => {
		const { id } = req.params
		const { rate } = req.body
		Product.findByIdAndUpdate({_id: id}, {$push: {rating: rate} }, {new: true})
			.then(product => res.json({success: true, product}))
			.catch(error => res.json({success: false ,error}))
	}
}

module.exports = productController