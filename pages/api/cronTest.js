const fs = require('fs')

export default function handler(req, res) {
	const count = JSON.parse(fs.readFileSync('json/cronTest.json'))

	res.status(200).json(count)
}