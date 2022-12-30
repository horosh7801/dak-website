const requestIp = require('request-ip')
const geoip = require('geoip-lite')
const fs = require('fs')


export default function handler(req, res) {
	const currencyRates = JSON.parse(fs.readFileSync('json/EURCurrencyRates.json'))
	//const clientIp = requestIp.getClientIp(req)
	//const geo = geoip.lookup(clientIp)
	//console.log(geo)
	//const currency = countryCurrencyMap[geo.country] ? countryCurrencyMap[geo.country] : {currency: 'EUR', rate: 1}
	const { lang } = req.query
	const locale = currencyRates[lang]
	res.status(200).json(locale)
}