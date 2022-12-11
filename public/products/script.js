const fs = require('fs')

for (const element of ['ceiling', 'floor', 'mirror', 'point', 'wall', 'wall3d']) {
	const json = JSON.parse(fs.readFileSync(`../../json/${element}.json`))
	for (const item of json) {
		const itemName = item['img'].split('/')[3].split('.jpg')[0]
		fs.mkdirSync(`${element}/${itemName}`, {recursive: true})
	}

}