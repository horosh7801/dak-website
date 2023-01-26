const formatEN = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, currencyDisplay: 'code' })
const formatRU = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0, currencyDisplay: 'code' })
const formatRO = new Intl.NumberFormat('ru', { style: 'currency', currency: 'MDL', maximumFractionDigits: 0, currencyDisplay: 'code' })

export default function currencyFormat(number, locale) {
	const parsedNumber = parseInt(number)
	let formattedNumber
	switch ((locale.toLowerCase())) {
		case 'en':
			formattedNumber = formatEN.format(parsedNumber)
			break
		case 'ru':
			formattedNumber = formatRU.format(parsedNumber)
			break		
		case 'ro':
			formattedNumber = formatRO.format(parsedNumber)
			break		
	}
	return formattedNumber
}