import fetch from 'node-fetch'
import * as yup from 'yup'
const fs = require('fs')

const schema = yup.array().of(yup.object({
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

export default async function handler(req, res) {
	const order = JSON.parse(req.query.order)

	const { user_token } = req.cookies
	try {
		const validatedOrder = schema.validateSync(order, {stripUnknown: true})
		const {id, price, amount} = validatedOrder

		const items = JSON.parse(fs.readFileSync('json/itemsEN.json'))
		const response = await fetch('http://127.0.0.1:1337/api/users/me', {
			method: 'GET',
			headers: {
//				'Content-Type': 'application/json',				
				'Authorization': `bearer ${user_token}`,
			},			
		})
		const userData = await response.json()
		const userID = userData.id
		console.log(`userData: ${userData}`)
		const resp = await fetch(`http://127.0.0.1:1337/api/orders`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `bearer ${process.env.ORDER_TOKEN}`}, 
			body: JSON.stringify({
				data: {					
					user: userID,
					item: validatedOrder.map(({id, price, amount}) => (
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
		//console.log(resp)
		console.log(`placeorder res: ${parsedRes}`)
		res.status(resp.status).send()
	}
	catch(err) {
		console.log(err)
		res.status(500).send()
	}	
}

