const Order = require('../models/Order');
const nodeMailer = require('nodemailer')

const transport = nodeMailer.createTransport({
	port: 465,
	host: "smtp.gmail.com",
	auth: {
		pass: "Dl12345*",
		user: "deluxelicoreria@gmail.com"
	},
	tls: { rejectUnauthorized: false }
})

const orderController = {
	createOrder: async (req, res) => {
		const newOrder = new Order({ ...req.body })

		const { shippingAddress, billingAddress, items} = req.body

		const itemTable = (items) => {
			let table = ''
			let total = 0
			items.map(item => {
				total += item.quantity * item.price
				table += `<tr>
				<td>${item.quantity}</td>
				<td>${item.title}</td>
				<td>$ ${item.price}</td>
				<td>$ ${item.quantity * item.price}</td>
			</tr>`
			})
			table += `<tr>
			<td colspan="3" style="text-align: right; font-weight: bold;">Total</td>
			<td>$ ${total}</td>
			</tr>`
			return table;
		}
		var mailOptions = {
			from: "Deluxe <notresponse@notreply.com>",
			sender: "Deluxe <notresponse@notreply.com>",
			to: `${req.user.mail}`,
			subject: "Gracias por tu compra",
			html: `<div style="background: white; color: white; font-family: Verdana, Geneva, Tahoma, sans-serif; height: 100%;">
			<div style="background: black; width: 70%; margin: 0 auto;">
				<div style="width: 100%;">
					<img style="width: 250px; padding-left: 250px; padding-top: 30px" src="https://deluxeapp.herokuapp.com/static/media/logoBlanco.c99fe978.png" alt="">
				</div>
				<div>
					<p style="font-size: 30px; margin: 0 auto; margin-top: 20px; font-weight: bold; text-align: center">Muchas gracias por tu compra</p>
					<p style="margin-top: 30px; font-weight: bold;"></p>
					<p style="border-bottom: 1px solid gray; margin-bottom: 10px; padding-left: 30px; font-weight: bold">Datos de envio</p>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Direccion</span><span>${shippingAddress.street} ${shippingAddress.number || ''}</span></div>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Recibe</span><span>${shippingAddress.who || ''}</span></div>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Teléfono</span><span>${shippingAddress.phone || ''}</span></div>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Notas</span><span>${shippingAddress.note || ''}</span></div>
					<p style="border-bottom: 1px solid gray; margin-bottom: 10px; padding-left: 30px; font-weight: bold">Datos de Facturacion</p>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Nombre</span><span>${billingAddress.name || ''}</span></div>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">CUIT/CUIL/DNI</span><span>${billingAddress.cuit || ''}</span></div>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Comprobante</span><span>${billingAddress.type || ''}</span></div>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Teléfono</span><span>${billingAddress.phone || ''}</span></div>
					<div style="display: flex;"><span style="min-width: 200px; padding-left: 30px;">Notas</span><span>${billingAddress.note || ''}</span></div>
					<table style="border: 1px gray solid; margin: 30px auto; text-align: center;">
						<thead>
							<tr>
								<th style="border: 1px gray solid;">Cantidad</th>
								<th style="border: 1px gray solid;">Descripción</th>
								<th style="border: 1px gray solid;">Precio unitario</th>
								<th style="border: 1px gray solid;">Precio total</th>
							</tr>
						</thead>
						<tbody>
							${itemTable(items)}
						</tbody>
					</table>
					<p style="padding: 40px; font-weight: bold; text-align: center"> 2020 - Deluxe &copy; </p>
				</div>
			</div>
		</div>`,
		}
		transport.sendMail(mailOptions, (error, info) => {

			console.log('Mail enviado')
		})

		try {
			await newOrder.save()
			res.json({
				success: true,
				response: "Order Upload"
			})
		} catch (error) {
			res.json({
				success: false,
				response: error
			})
		}
	},

	deleteOrder: async (req, res) => {
		var id = req.params.id
		try {
			const response = await Order.findByIdAndUpdate({ _id: id }, {status: "Entregado"}, {new: true})
			const data = await Order.find()
			res.json({
				success: true,
				response: data
			})
		} catch {
			res.json({
				success: false,
				response: "Error deleting Order"
			})
		}
	},

	getUserOrder: async (req, res) => {
	
		try {
			const data = await Order.find({ userId: req.user._id })
			res.json({
				success: true,
				response: data
			})
		} catch {
			res.json({
				success: false,
				response: "Error get order by user"
			})
		}
	},


	getOrderById: async (req, res) => {
	
		var id = req.params.id
		try {
			const data = await Order.find({ _id: id })
			res.json({
				success: true,
				response: data
			})

		} catch {

			res.json({
				success: false,
				response: "Error Getting Order"
			})
		}
	},

	getAllOrders: async (req, res) => {
		try {
			const data = await Order.find()
			res.json({
				success: true,
				response: data
			})
		} catch {
			res.json({
				success: false,
				response: "Error Load Orders"
			})
		}
	}
}

module.exports = orderController