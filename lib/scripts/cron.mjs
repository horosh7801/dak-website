import cron from 'node-cron'
import fs from 'fs'
import fetch from 'node-fetch'

const rates = {"EN":{"currency":"EUR","rate":1},"RU":{"currency":"RUB","rate":74.17344696500415},"RO":{"currency":"MDL","rate":20.57294009993849}}

//const task = cron.schedule(
//	'*/5 * * * * *',
//	async function() {
	async function test() {
		try {
			const parsedItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
			const types = JSON.parse(fs.readFileSync('json/product_types.json', 'utf-8'))

			for (const i in rates) {
				rates[i].rate++
			}

			fs.writeFileSync('json/EURCurrencyRates.json', JSON.stringify(rates))

			for (const i in parsedItems) {
				try {
					const res = await fetch(`http://localhost:3000/api/revalidate?secret=a7943e6c8805c62b73fa697de43cf231e455cc1b5dfa8560216f02163b42f371&item=${parsedItems[i].name.toLowerCase().replace(/[\s-]/g, '_')}&type=${types[parsedItems[i].type]}`)
					const parsedRes = await res.json()
					console.log(parsedRes)
				} catch (err) {
					console.log(err)
				}
			}
		} catch (err) {
			console.log(err)
		}	
	}	
//	},
//	{timezone: 'Asia/Tashkent', scheduled: true}

//);

test()