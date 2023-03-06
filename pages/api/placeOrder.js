import fetch from 'node-fetch'
import * as yup from 'yup'
const fs = require('fs')

const schema = yup.object({
	items: yup.array().of(yup.object({
		id: yup
			.number()
			.integer()
			.required(),
		price: yup
			.number()
			.integer()
			.required(),
		amount: yup
			.number()
			.integer()
			.required()				
	})).min(1),
  email: yup
    .string()
    .min(6)
    .email()
    .required(),
  phone: yup
    .string()
    .matches(/[0-9]/)
    .required(),
  name: yup
  	.string()
  	.matches(/[A-Za-z]/)
  	.required()	
})	

export default async function handler(req, res) {
	const order = JSON.parse(req.query.order)

	try {
		const validatedOrder = schema.validateSync(order, {stripUnknown: true})
		const {id, price, amount} = validatedOrder.items

		const items = JSON.parse(fs.readFileSync('json/itemsRU.json'))

		const resp = await fetch(`http://127.0.0.1:1337/api/orders`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `bearer ${process.env.ORDER_TOKEN}`}, 
			body: JSON.stringify({
				data: {					
					item: validatedOrder.items.map(({id, price, amount}) => (
						{
							name: items[id].name,
							price: items[id].price[price].price,
							amount,
							params: items[id].price[price].desc,
						}
					)), 
					date: new Date().getTime(),
					name: validatedOrder.name,
					phone: validatedOrder.phone,
					email: validatedOrder.email
				}
			})
		})
		const parsedRes = await resp.json()
		res.status(resp.status).send()
	}
	catch(err) {
		console.log(err)
		res.status(500).send()
	}	
}

