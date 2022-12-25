const requestIp = require('request-ip')
const geoip = require('geoip-lite')
const fs = require('fs')


export default function handler(req, res) {
	const countryCurrencyMap = JSON.parse(fs.readFileSync('json/countryCurrency.json'))
	const clientIp = requestIp.getClientIp(req)
	const geo = geoip.lookup(clientIp)
	const currency = geo === null ? {currency: 'EUR', rate: 1} : countryCurrencyMap[geo.country]
	res.status(200).json(currency)
}