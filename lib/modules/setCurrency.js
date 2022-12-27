export default async function setCurrency(setCurrencyState) {
	let currency = window.localStorage.getItem('currency')
  if (currency === null) {
    const res = await fetch('/api/getLocale', {headers: {'X-Client-IP': '31.31.0.0'}})
    currency = await res.json()
    window.localStorage.setItem('currency', JSON.stringify(currency))
  } else {
    currency = JSON.parse(currency)
  }
  setCurrencyState(currency)
}