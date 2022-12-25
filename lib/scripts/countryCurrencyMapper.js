const fs = require('fs')

const countries = JSON.parse(fs.readFileSync('../../json/countries.json'))['countries']['country']
const currencyRates = JSON.parse(fs.readFileSync('../../json/EURCurrencyRates.json'))

const countryCurrencyMap = {}
for (const key of Object.keys(currencyRates)) {
	for (const item of countries) {
		if (item['currencyCode'] === key) {
			countryCurrencyMap[item['countryCode']] = {'currency': key, 'rate': currencyRates[key]}
			break
		}
	}
}

fs.writeFileSync('../../json/countryCurrency.json', JSON.stringify(countryCurrencyMap))