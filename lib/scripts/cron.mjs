import cron from 'node-cron'
import fs from 'fs'
import fetch from 'node-fetch'

const appID = '20d4425216194e319ed5940551452cd9'
const endpoint = 'latest'

const locales = ['ru', 'ro']

const secret = 'a7943e6c8805c62b73fa697de43cf231e455cc1b5dfa8560216f02163b42f371'

const revalidate = async () => {
	console.log('executing job')
	try {

		const res = await fetch(`https://openexchangerates.org/api/${endpoint}.json?app_id=${appID}`)
		const data = await res.json()

		const USDToEUR = data['rates']['EUR']
		const newRates = {
			'EN': {'currency': 'EUR', 'rate': 1}, 
			'RU': {'currency': 'RUB', 'rate': data['rates']['RUB'] / USDToEUR},
			'RO': {'currency': 'MDL', 'rate': data['rates']['MDL'] / USDToEUR},
		}

		fs.writeFileSync('json/EURCurrencyRates.json', JSON.stringify(newRates))

		const parsedItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
		const types = JSON.parse(fs.readFileSync('json/product_types.json', 'utf-8'))

		for (const locale of locales) {
			const res = await fetch(`http://127.0.0.1:3000/api/revalidate?secret=${secret}&page=index&locale=${locale}`)	
			for (const i in parsedItems) {
				try {
					const res = await fetch(`http://127.0.0.1:3000/api/revalidate?secret=${secret}&page=item&item=${parsedItems[i].name.toLowerCase().replace(/[\s-]/g, '_')}&type=${types[parsedItems[i].type]}&locale=${locale}`)
					const parsedRes = await res.json()
					console.log(i)
				//	console.log(parsedRes)
				} catch (err) {
					console.log(err)
				}
			}
		}	
	} catch (err) {
		console.log(err)
	}	
	console.log('completed job')
}	

console.log('initial revalidation')

revalidate()

const task = cron.schedule(
	'0 */2 * * *',
	revalidate,
	{timezone: 'Asia/Tashkent', scheduled: true}

);

console.log('scheduled job')