const fs = require('fs')
import currencyFormat from '../../lib/modules/currencyFormat.js'

export default function handler(req, res) {
	const { locale, token } = req.query

	const currencyRate = JSON.parse(fs.readFileSync('json/EURCurrencyRates.json'))[locale.toUpperCase()].rate

	let totalItems
	switch (locale) {
		case 'en':
			totalItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
			break
		case 'ru':
			totalItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))	
			break
		case 'ro':
			totalItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))	
			break				
		default:
			totalItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
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
				desc: totalItems[item.id].price[item.params].desc,
				amount: item.amount
			})),
			date: order.date,
			status: order.status
		}))
		console.log(orders)
		res.status(200).json(orders)		
	})()	

}