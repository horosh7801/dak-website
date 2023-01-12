const fs = require('fs')

const items = {}
const types = ["ceiling", "floor", "wall", "point", "wall3d", "mirror"]

let id = 0
for (let i = 0; i <= types.length - 1; i++) {
	const typeJson = fs.readFileSync(`${types[i]}.json`)
	const parsedType = JSON.parse(typeJson)
	for (const item of parsedType) {
		items[id] = {
			'name': item.name,
			'price': item.priceRUB,
			'img': item.img,
			'type': i,
			'features': {
	            "material": "массив дуба",
	            "length": [140, 160, 180, 200],
	            "height": 7,
	            "width": 4.5,
	            "lampType": "светодиодная лента, LED",
	            "power": "33-45",
	            "lampEquivalent": 230,
	            "screenWidth": 25,
	            "lampInclusion": "да, установлена светодиодная лента",
	            "colorTemp": ["тёплый(3000)", "нейтральный(4000)"],
	            "powerSupply": "100-240",
	            "coating": "покраска Биомаслом Sigmar (Италия)",
	            "color": "выбор цвета согласно пожеланию заказчика",
	            "fastening": "на металлические подвесы – это 3 троса, от 150 см с возможностью регулировки по высоте",
	            "options": "возможно комплектовать светильник пультом управления или панелью с функцией изменения яркости"
			},
			'desc': ''
		}	
		id++	
	}
}

fs.writeFileSync('items.json', JSON.stringify(items))
console.log(items)