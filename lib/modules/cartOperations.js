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
	const newState = itemsState.slice(0, index)
		.concat(itemsState.slice(index + 1, itemsState.length))
}