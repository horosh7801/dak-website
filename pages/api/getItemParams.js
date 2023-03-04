const fs = require('fs')

export default function handler(req, res) {
	const { locale, items } = req.query

	const parsedItems = JSON.parse(items)

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

	const localizedParams = parsedItems.map(({id, price}) => ({
		price: Math.round(totalItems[id].price[price].price * currencyRate),
		params: totalItems[id].price[price].desc
	}))
	//console.log(localizedParams)
	res.status(200).json(localizedParams)
}