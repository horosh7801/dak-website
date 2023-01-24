const cron = require('node-cron')
const fs = require('fs')

let count = 0

const task = cron.schedule(
	'*/5 * * * * *',
	function() {
		console.log(count)
		try {
			fs.writeFileSync('json/cronTest.json', JSON.stringify(count)) 
			count++
		} catch (err) {
			console.log(err)
		}	
	},
	{timezone: 'Asia/Tashkent', scheduled: true}

);

