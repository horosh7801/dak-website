const http = require('http')
const fs = require('fs')

const appID = '20d4425216194e319ed5940551452cd9'
const endpoint = 'latest'

http.request({
	host: 'openexchangerates.org',
	path: `/api/${endpoint}.json?app_id=${appID}`
}, (res) => {

	let str = ''

	res.on('data', (chunk) => {
		str += chunk
	})

	res.on('end', () => {
		const data = JSON.parse(str)
		const USDToEUR = data['rates']['EUR']
		const newRates = {}
		for (const key of Object.keys(data['rates'])) {
			if (key === 'EUR') {
				continue
			}
			newRates[key] = data['rates'][key] / USDToEUR
		}
		fs.writeFileSync('../../json/EURCurrencyRates.json', JSON.stringify(newRates)) 
	})
}).end()