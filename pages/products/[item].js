import { useRouter } from 'next/router'

export default function Item() {

	const router = useRouter()
	const { item } = router.query

	return (
		<div>
			{item}
		</div>
	)
}

export async function getStaticProps() {

	return {
		props: {}
	}
}

export async function getStaticPaths() {

const fs = require('fs')
const products = JSON.parse(fs.readFileSync('json/total_products.json', 'utf-8'))

	return {
		paths: products.map((product) => ({params: {item: product}})),
		fallback: false
	}
}