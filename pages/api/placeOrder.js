import fetch from 'node-fetch'
import * as yup from 'yup'
const fs = require('fs')

const schema = yup.object({
	phone: yup
		.string()
		.matches(/[0-9]/)
		.required(),
	name: yup
		.string()
		.matches(/[A-Za-z]/)
		.required(),
	email: yup.lazy((value => value === '' 
		? yup 
			.string()
			.strip() 
		: yup
			.string()
			.email()
		)),	
	item: yup.array().of(yup.object({
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
	})).min(1)		
})

export default async function handler(req, res) {
	const order = JSON.parse(req.query.order)
	try {
		const validatedOrder = schema.validateSync(order, {stripUnknown: true})
		const {id, price, amount} = validatedOrder.item

		const items = JSON.parse(fs.readFileSync('json/itemsEN.json'))

		const resp = await fetch(`${process.env.STRAPI}/api/orders`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `bearer ${process.env.AUTH_TOKEN}`}, 
			body: JSON.stringify({
				data: {					
					...validatedOrder,
					user: "2",
					item: validatedOrder.item.map(({id, price, amount}) => (
						{
							name: items[id].name,
							price: items[id].price[price].price,
							amount,
							params: price,
							id
						}
					)), 
					date: new Date().getTime(),
	
				}
			})
		})
		const parsedRes = await resp.json()
		console.log(resp)
		res.status(resp.status).send()
	}
	catch(err) {
		console.log(err)
		res.status(500).send()
	}	
}

