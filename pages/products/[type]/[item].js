import { useRouter } from 'next/router'
import Image from 'next/image'
import { css } from '@emotion/css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import { useState } from 'react'


const itemPage = css`
	display: flex;
	flex-direction: column;
`

const itemImageSet = css`
	width: 1120px;
	height: 840px;
	background-color: #ececec;
	display: flex;
	justify-content: center;
	align-items: center;
`

const actionButtonSet = css`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	width: 150px;
`

const productName = css`
	display: flex;
	width: 100%;
	font-size: 40px;
  font-weight: 441;
  font-stretch: 35%;
  margin-bottom: 20px;
`

const lengthSlider = css`
	width: 340px;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`

const price = css`
	margin-bottom: 20px;
	font-size: 30px;
`

const prices = {120: 22650, 140: 23250, 160: 24900, 180: 25500, 200: 26850}

export default function Item() {

	const [lengthState, setLengthState] = useState(120)

	const router = useRouter()
	const { item, type } = router.query

	return (
		<div className={itemPage}>
				<div className={css`
					display: flex;
					flex-direction: row;
				`}>
					<div className={itemImageSet}>
						<div className={css`
							position: relative;
							width: 1024px;
							height: 768px;
						`}>
							<Image src={`/products/${type}/${item}.jpg`} fill={true} style={{objectFit: 'contain'}} />
						</div>	
					</div>
					<div className={css`
						display: flex;
						flex-direction: column;
						flex-grow: 1;
						align-items: center;

					`}>
						<div className={productName}>
						{item}
						</div>
						<div className={lengthSlider}>
							<div>
								ДЛИНА
							</div>
							<Slider
								step={null}
								min={120}
								max={200}
								value={lengthState}
								onChange={(event) => {
									setLengthState(event.target.value)
								}}
								marks={[
									{
										value: 120,
										label: '120 см'
									},
									{
										value: 140,
										label: '140 см'
									},
									{
										value: 160,
										label: '160 см'
									},		
									{
										value: 180,
										label: '180 см'
									},
									{
										value: 200,
										label: '200 см'
									},																						
								]}
							/>
						</div>	
						<div className={price}>
							{`${prices[lengthState]} ₽`}
						</div>
						<div className={actionButtonSet}>
							<Button variant="outlined">В КОРЗИНУ</Button>
							<Button variant="outlined">ЗАКАЗАТЬ</Button>
						</div>
					</div>	
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