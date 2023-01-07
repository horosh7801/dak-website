const fs = require('fs')

export default function handler(req, res) {
	const { lang } = req.query
	const navbarLocalization = JSON.parse(fs.readFileSync(`json/localization/${lang.toLowerCase()}/app.json`))
	res.status(200).json(navbarLocalization)
}