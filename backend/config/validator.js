const Joi = require('@hapi/joi');

const validator = {
	validateUser: (req, res, next) => {
		const schema = Joi.object({
			firstName: Joi.string().trim().min(3).max(20).required(),
			lastName: Joi.string().trim().min(3).max(20).required(),
			mail: Joi.string().trim().email().required(),
			pass: Joi.string().trim().pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/, 'password').required()
		})
		const validation = schema.validate(req.body, { abortEarly: false })

		if (validation.error !== undefined) {
			return res.json({
				success: false,
				error: 'Error de validacion. Uno o mas campos no respetan el formato',
				message: validation.error
			});
		}
		next();
	},
	validateProduct: (req, res, next) => {
		const schema = Joi.object({
				category: Joi.string().trim().required(),
				title: Joi.string().trim().min(4).max(10).required(),
				description: Joi.string().trim().max(120).required(),
				price: Joi.number().required(),
			  	stock: Joi.number().required(),
				ml: Joi.number().required(),
				alcPct: Joi.number().required(),
				rating: Joi.exist(),
				pic: Joi.exist()
				
		
		})
		const validation = schema.validate(req.body, { abortEarly: false })

		if (validation.error !== undefined) {
			return res.json({
				success: false,
				error: 'Error de validacion. Uno o mas campos no respetan el formato',
				message: validation.error
			});
			
		}

		next();
	},

	validateOrder: (req, res, next) => {
		const schema = Joi.objetc({
			items: Joi.string.trim().min(4).max(15).required,
			
			shippingAddress: Joi.object({
				street:Joi.string().trim().min(4).max(15).required,
				number:Joi.number().required,
				zipCode:Joi.number().required,
			}),
			
			billingAddress: Joi.object({
				street:Joi.string().trim().min(4).max(15).required,
				number:Joi.number().required,
				zipCode:Joi.number().required,
			}),
			
			phone: Joi.string().trim().min(4).max(15).required,
			payment: Joi.string().trim().min(4).max(15).required,
			note: Joi.string().trim().min(4).max(15).required,
		})
		const validation = schema.validate(req.body, { abortEarly: false })

		if (validation.error !== undefined) {
			return res.json({
				success: false,
				error: 'Error de validacion. Uno o mas campos no respetan el formato',
				message: validation.error
			});
		}
		next();
	},
}


module.exports = validator;
