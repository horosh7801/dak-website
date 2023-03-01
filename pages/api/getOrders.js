const fs = require('fs')
import currencyFormat from '../../lib/modules/currencyFormat.js'

const defaultStatus = ['PENDING', 'ACCEPTED', 'FULFILLED']

export default async function handler(req, res) {
	const { locale } = req.query

	const { user_token } = req.cookies

	const currencyRate = JSON.parse(fs.readFileSync('json/EURCurrencyRates.json'))[locale.toUpperCase()].rate

	let totalItems
	let localizedTypes
	let units
	let status
	switch (locale) {
		case 'en':
			totalItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/en/productTypes.json'))
			units = "pcs."
			status = ['PENDING', 'ACCEPTED', 'FULFILLED']
			break
		case 'ru':
			totalItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))	
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/ru/productTypes.json'))
			units = 'шт.'
			status = ['В ОЖИДАНИИ', 'ПРИНЯТ', 'ЗАВЕРШЁН']
			break
		case 'ro':
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/ro/productTypes.json'))
			units = 'шт.'
			status = ['В ОЖИДАНИИ', 'ПРИНЯТ', 'ЗАВЕРШЁН']
			break				
		default:
			totalItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/en/productTypes.json'))
			units = "pcs."
			status = ['PENDING', 'ACCEPTED', 'FULFILLED']
	}

	try {
		const response = await fetch('http://127.0.0.1:1337/api/users/me?populate=*', {
			method: 'get',
			headers: {
				'Authorization': `bearer ${user_token}`,
			},
		});
		const data = await response.json()
		console.log(data)


		const orders =  data.orders.map((order) => {
			let totalPrice = 0
			let totalAmount = 0
			const statusIndex = defaultStatus.indexOf(order.status.toUpperCase())			
			return {
				items: order.item.map((item, index) => {
					totalAmount++
					totalPrice += Math.round(totalItems[item.id].price[item.params].price * currencyRate) * item.amount
					return {
						name: item.name,
						price: currencyFormat(Math.round(totalItems[item.id].price[item.params].price * currencyRate), locale),
						type: JSON.parse(fs.readFileSync('json/product_types.json'))[totalItems[item.id].type].toLowerCase(),
						desc: totalItems[item.id].price[item.params].desc,
						amount: `${item.amount} ${units}`
					}
				}),
				date: order.date,
				status: status[statusIndex],
				totalPrice: currencyFormat(totalPrice, locale),
				totalAmount
		}})
		console.log(orders)
		res.status(200).json({username: data.username, orders})		
	}
	catch (err) {
		console.log(err)
		res.status(500).send()
	}	

}