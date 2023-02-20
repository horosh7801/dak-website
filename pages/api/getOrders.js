const fs = require('fs')
import currencyFormat from '../../lib/modules/currencyFormat.js'

export default function handler(req, res) {
	const { locale, token } = req.query

	const currencyRate = JSON.parse(fs.readFileSync('json/EURCurrencyRates.json'))[locale.toUpperCase()].rate

	let totalItems
	let localizedTypes
	let units
	switch (locale) {
		case 'en':
			totalItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/en/productTypes.json'))
			units = "pcs."
			break
		case 'ru':
			totalItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))	
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/ru/productTypes.json'))
			units = 'шт.'
			break
		case 'ro':
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/ro/productTypes.json'))
			units = 'шт.'
			break				
		default:
			totalItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
			localizedTypes = JSON.parse(fs.readFileSync('json/localization/en/productTypes.json'))
			units = "pcs."
	}

	(async () => {
		const response = await fetch('http://127.0.0.1:1337/api/users/me?populate=*', {
			method: 'get',
			headers: {
				'Authorization': `bearer ${token}`,
			},
		});
		const data = await response.json()
		console.log(`order: ${data.orders}`)
		const orders =  data.orders.map((order) => ({
			items: order.item.map((item, index) => ({
				name: item.name,
				price: currencyFormat(Math.round(totalItems[item.id].price[item.params].price * currencyRate), locale),
				type: localizedTypes[totalItems[item.id].type],
				desc: totalItems[item.id].price[item.params].desc,
				amount: `${item.amount} ${units}`
			})),
			date: order.date,
			status: order.status
		}))
		console.log(orders)
		res.status(200).json(orders)		
	})()	

}