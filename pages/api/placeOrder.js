import fetch from 'node-fetch'
import * as yup from 'yup'
const fs = require('fs')

const token = '4dae396ee347c5878279ce87babd7cf7f6ce5345e5c223e9e5e0b065d6560bef20899296c5b1ff62a862db954e596f1f72a02d4009d6b8611c26aa101be4e71b8fd15f027bd940362eeef1ed3e6f3d82733cc480acc3d00fd193587d7b424b01de9da13fabdfeb5b61f735ed8a70f5a9977413d0036b6c3f5befc55c7484cd14';

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

		const resp = await fetch('http://127.0.0.1:1337/api/orders', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `bearer ${token}`}, 
			body: JSON.stringify({
				data: {					
					...validatedOrder,
					item: validatedOrder.item.map(({id, price, amount}) => (
						{
							name: items[id].name,
							price: items[id].price[price].price,
							amount
						}
					)), 
					date: new Date().getTime(),
	
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

