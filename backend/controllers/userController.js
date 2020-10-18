const User = require("../models/User")
const Comment = require("../models/Comment")
const nodeMailer = require('nodemailer')
const Product = require("../models/Product")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Order = require("../models/Order")
const message = "Mail or Password incorrect"



var transport = nodeMailer.createTransport({
	port: 465,
	host: "smtp.gmail.com",
	auth: {
		pass: "Dl12345*",
		user: "deluxelicoreria@gmail.com"
	},
	tls: { rejectUnauthorized: false }
})

const userController = {
	createUser: async (req, res) => {
		const { pass } = req.body
		// Creating new User
		const newUser = new User({ ...req.body })
		newUser.pass = bcrypt.hashSync(pass.trim(), 10)
		newUser
			.save()
			.then(user => {
				const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {})
				if (!token)
					return res.json({
						success: false,
						error: "An error occurred while saving the user",
					})
				res.json({
					success: true,
					token,
					firstName: user.firstName,
					lastName: user.lastName,
					id: user._id,
					wishlist: user.wishlist,
					shippingAddress: user.shippingAddress,
					billingAddress: user.billingAddress,
					rates: user.rates,
					role: user.role
				})
			})
			.catch(err => res.json({ success: "false", error: err }))
	},
	loginUser: async (req, res) => {
		const { mail, pass } = req.body

		const userExists = await User.findOne({ mail })
		if (!userExists) return res.json({ success: false, error: message })
		const passwordMatches = bcrypt.compareSync(pass, userExists.pass)
		if (!passwordMatches) return res.json({ success: false, error: message })
		const token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
		if (!token) return res.json({ success: false, error })

		res.json({
			success: true,
			token,
			firstName: userExists.firstName,
			lastName: userExists.lastName,
			wishlist: userExists.wishlist,
			id: userExists._id,
			shippingAddress: userExists.shippingAddress,
			billingAddress: userExists.billingAddress,
			rates: userExists.rates,
			role: userExists.role

		})
	},

	decodeUser: (req, res) => {
		const { firstName, lastName, wishlist, shippingAddress, billingAddress, _id, rates, role } = req.user
		res.json({
			firstName,
			lastName,
			wishlist,
			shippingAddress,
			billingAddress,
			id: _id,
			rates,
			role
		})
	},


	editUser: async (req, res) => {

		const { firstName, lastName, shippingAddress, billingAddress} = req.body
		const newInfo = await User.findOneAndUpdate({ _id: req.user._id },
			{
				firstName, lastName, billingAddress, shippingAddress
			
			}, { new: true })

		res.json({
			success: true, newInfo: newInfo
		})
	},

	userInfo: async (req, res) => {
		const { _id } = req.user
		try {
			const user = await User.findOne({ _id })
			res.json({
				success: user ? true : false,
				user
			})
		} catch (error) {
			console.log(error)
		}
	},
	addToWishlist: async (req, res) => {
		var { id } = req.body
		var userId = req.user._id

		const userWishList = await User.findOneAndUpdate({ _id: userId }, { $push: { wishlist: [id] } }, { new: true })

		res.json({
			success: true,
			wishlist: userWishList.wishlist
		})

	},




	removeToWishlist: async (req, res) => {
		var id = req.params.id

		const userWishList = await User.findById({ _id: req.user._id })

		const filteredWishList = userWishList.wishlist.filter(wishlist => wishlist != id)
		
		const user = await User.findOneAndUpdate({ _id: req.user._id }, { wishlist: filteredWishList }, { new: true })

		res.json({
			success: true,
			wishlist: user.wishlist
		})
	},


	addShippingAddress: async (req, res) => {
		try {
		 	const shipping = await User.findOneAndUpdate({_id: req.user._id }, { shippingAddress: req.body })
			
			 res.json({
		 		success: true,
		 		response: shipping
		 	})
		 } catch (error) {
		 	res.json({
		 		success: false,
		 		response: error
		 	})

		}
	},

	addBillingAddress: async (req, res) => {
		
		try {
			const billing = await User.findOneAndUpdate({ _id: req.user._id }, { billingAddress: req.body })
			
			res.json({
				success: true,
				response: billing
			})

		} catch (error) {
			res.json({
				success: false,
				response: error
			})

		}
	},

	NewPass: async (req, res) => {
		mailSent = req.body.mail

		try {
			await User.findOne({ mail: mailSent })

			var length = 8
			var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
			var newPass = ""
			for (var i = 0, n = charset.length; i < length; ++i) {
				newPass += charset.charAt(Math.floor(Math.random() * n));
			}
			const passwordHashed = bcrypt.hashSync(newPass, 10)

			const user = await User.findOneAndUpdate({ mail: mailSent }, { pass: passwordHashed })
			var mailOptions = {
				from: "Deluxe <notresponse@notreply.com>",
				sender: "Deluxe <notresponse@notreply.com>",
				to: `${user.mail}`,
				subject: "Nueva Contraseña",
				html: `<div style="background: white; color: white; font-family: Verdana, Geneva, Tahoma, sans-serif; height: 100%;">
				<div style="background: black; width: 70%; margin: 0 auto;">
					<div style="width: 100%;">
						<img style="width: 250px; padding-left: 250px; padding-top: 30px" src="https://deluxeapp.herokuapp.com/static/media/logoBlanco.c99fe978.png" alt="">
					</div>
					<div>
						<p style="font-size: 30px; margin: 0 auto; margin-top: 20px; font-weight: bold; text-align: center">Reinicio de contraseña</p>
						<p style="margin-top: 30px; font-weight: bold;"></p>
						<p style="text-align: center; margin: 30px">En respuesta a su pedido de reinicio de contraseña, aqui le enviamos la nueva para que pueda seguir navegando en nuestro sitio</p>
						<p style="text-align: center; margin: 30px; color: #d7b26c; font-size: 25px;">${newPass}</p>
						<p style="text-align: center;"><a style="text-decoration: none; margin: 30px; color: white">Haga click aqui para ir a ingresar a la web</a></p>
						<p style="padding: 40px; font-weight: bold; text-align: center"> 2020 - Deluxe &copy; </p>
					</div>
				</div>
			</div>`,
			}
			transport.sendMail(mailOptions, (error, info) => {

				res.send("email enviado")
			})

		} catch (error) {
			res.json({
				success: false,
				response: "Error getting account"
			})
		}
	},
	setRate: async (req, res) => {
		const rId = req.body.id
		const rVal = req.body.value
		const user = await User.findByIdAndUpdate({_id: req.user._id}, {$addToSet: {rates: {id: rId, value: rVal}}}, {new: true})
		await Product.findByIdAndUpdate({_id: rId}, {$push: {rating: rVal} }, {new: true})
		res.json({
				success: true,
				rates: user.rates
			})

	},
	delRate: async (req, res) => {
		const { id } = req.body
		req.user.rates = req.user.rates.filter(rate => rate.id !== id)
		const user = await req.user.save()
		const prod = await Product.findOne({_id: id})
		prod.rating.pop() 
		const product = await Product.findByIdAndUpdate({_id: id}, {rating: prod.rating}, {new: true})
		res.json({
				success: true,
				rates: user.rates,
				product: product.rating
			})
	},


	getDataAdmin: async (req, res) => {
		
		const pendingOrdes = await Order.find({status:"Pendiente"}).countDocuments()
		const totalUser = await User.find().countDocuments()
		const outStock = await Product.find({stock: 0}).countDocuments()
		const reviewsMade = await Comment.find().countDocuments()
		
        const infoAdmin = {pendingOrdes,totalUser,outStock,reviewsMade}

		try {
			res.json({
				success: true,
				response: infoAdmin
			})
		} catch (error) {
			res.json({
				success: false,
				response: error
			})
	    }
	}

}
module.exports = userController;
