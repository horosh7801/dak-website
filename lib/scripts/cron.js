const cron = require('node-cron')

let count = 0

const task = cron.schedule(
	'*/5 * * * * *',
	function() {
		count++
		console.log(count)
	},
	{timezone: 'Asia/Tashkent', scheduled: true}

);

