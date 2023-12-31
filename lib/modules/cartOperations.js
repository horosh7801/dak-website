export function addToCart(item) {
	const	newState = JSON.parse(window.localStorage.getItem('shopping_cart'))
	
	for (const i of newState) {
		if (i.id === item.id)
			return
	}
	newState.push(item)
	window.localStorage.setItem('shopping_cart', JSON.stringify(newState))
}

export function removeFromCart(item) {
	const items = JSON.parse(window.localStorage.getItem('shopping_cart'))

	for (const i in items) {
		if (items[i].id === item.id) {

			const newItems = items.slice(0, i)
				.concat(items.slice(i + 1, items.length))
			window.localStorage.setItem('shopping_cart', JSON.stringify(newItems))	
			return	
		}
	}
}