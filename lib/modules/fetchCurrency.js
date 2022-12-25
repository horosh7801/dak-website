export default function fetchCurrency() {
	const res = fetch('/api/getLocale', {headers: {'X-Client-IP': '178.18.32.23'}})
	console.log(res)
	return res
}