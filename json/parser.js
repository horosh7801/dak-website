const fs = require('fs')

const total_products = []
const items = {ceiling: [], floor: [], wall: [], point: [], wall3d: [], mirror: []}

 for (const itemType in items) {
   try {
     const data = fs.readFileSync(`${itemType}.json`, 'utf8')
     const productItems = JSON.parse(data)
     for (const item of productItems) {
     	total_products.push(item['img'].split('/')[3].split('.jpg')[0])
     }
   } catch (err) {
			console.log(err)
   }
 }
const json = JSON.stringify(total_products)
console.log(json)
fs.writeFileSync('total_products.json', json) 