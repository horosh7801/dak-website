import { useRouter } from 'next/router'
import Image from 'next/image'
import { css } from '@emotion/css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'


const itemPage = css`
	display: flex;
	flex-direction: column;
`

const itemImageSet = css`
	width: 1024px;
	height: 768px;
	position: relative;

`

const actionButtonSet = css`

`

const productName = css`
	display: flex;
	width: 100%;
	background-color: #ececec;
	font-size: 40px;
  font-weight: 441;
  font-stretch: 35%;
`

export default function Item() {

	const router = useRouter()
	const { item, type } = router.query

	return (
		<div className={itemPage}>
			<div className={productName}>
				{item}
			</div>
			<div className={itemImageSet}>
				<Image src={`/products/${type}/${item}.jpg`} fill={true} style={{objectFit: 'contain'}} />
			</div>
			<div className={actionButtonSet}>
			</div>
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
//const products = JSON.parse(fs.readFileSync('json/total_products.json', 'utf-8'))
const types = JSON.parse(fs.readFileSync('json/product_types.json', 'utf-8'))

const paths = []
for (const type of types) {
	const products = JSON.parse(fs.readFileSync(`json/${type}.json`))
	for (const product of products) {
		paths.push({params: {item: product['img'].split('/')[3].split('.jpg')[0], type: type}})
	}
}


	return {
		paths: paths,
		fallback: false
	}
}