const fs = require('fs')

const itemsEN = JSON.parse(fs.readFileSync('../../json/itemsEN.json'))
const itemsRU = JSON.parse(fs.readFileSync('../../json/itemsRU.json'))

const rate = 2.5

const newItemsEN = {}
for (const i in itemsEN) {
	newItemsEN[i] = {...itemsEN[i]}
	for (g in itemsEN[i].price) {
		newItemsEN[i].price[g].price = (newItemsEN[i].price[g].price / rate) * 1.5
	}
}	

const newItemsRU = {}
for (const i in itemsRU) {
	newItemsRU[i] = {...itemsRU[i]}
	for (g in itemsRU[i].price) {
		newItemsRU[i].price[g].price = (newItemsRU[i].price[g].price / rate) * 1.5
	}
}	
