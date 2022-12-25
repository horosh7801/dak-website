const requestIp = require('request-ip')
const geoip = require('geoip-lite')

export default function handler(req, res) {
	const clientIp = requestIp.getClientIp(req)
	const geo = geoip.lookup(clientIp)
	console.log(geo['country'])
	res.status(200)
}