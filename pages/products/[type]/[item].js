import { useRouter } from 'next/router'
import Image from 'next/image'
import { css } from '@emotion/css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import { useState, useContext } from 'react'
import LanguageContext from '../../../lib/context/language.js'


const itemPage = css`
	display: flex;
	flex-direction: row;
`

const itemImageSet = css`
	width: 1120px;
	height: 840px;
`

const actionButtonSet = css`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
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

const stickyPanel = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: sticky;
	top: 47px;

`

const leftSection = css`
	width: 1120px;
	height: 1000px;
	background-color: #ececec;
`

const rightSection = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
`

const shortWHRatio = 1024 / 683
const longWHRatio = 513 / 768

const prices = {120: 22650, 140: 23250, 160: 24900, 180: 25500, 200: 26850}

export default function Item() {

	const [lengthState, setLengthState] = useState(120)

	const language = useContext(LanguageContext)

	const router = useRouter()
	const { item, type } = router.query

	return (
		<div className={itemPage}>
			<div className={leftSection}>
				<div className={itemImageSet}>
					<Carousel
						showStatus={false}
						showIndicators={false}
						renderThumbs={(children) => (children.map((element, index) => (
							<div className={css`width: 80px; height: 80px; position: relative`}>
								<Image src={`/products/${type}/${item}/item${index}.jpg`} fill={true} style={{objectFit: 'contain'}} />
							</div>						
						)))}
					>
						{Array(14).fill(1).map((element, index) => (
							<div className={css`width: 1024px; height: 768px; position: relative;`}>
								<Image src={`/products/${type}/${item}/item${index}.jpg`} fill={true} style={{objectFit: 'contain'}} />
							</div>
						))}	
					</Carousel>		
				</div>
			</div>		
			<div className={rightSection}>
				<div className={stickyPanel}>
					<div className={productName}>
						{item}
					</div>
					<div className={lengthSlider}>
						<div>
							{
								(language === 'russian') && 'ДЛИНА'
								||
								(language === 'english') && 'LENGTH'
							}
						</div>
						<Slider
							step={null}
							min={120}
							max={200}
							value={lengthState}
							onChange={(event) => {
								setLengthState(event.target.value)
							}}
							marks={[120, 140, 160, 180, 200].map((element) => (
								{
									value: element,
									label: `${element} ${(language === 'russian') && 'см' || (language === 'english') && 'cm'}`
								}
							))}
						/>
					</div>	
					<div className={price}>
						{`${prices[lengthState]} ₽`}
					</div>
					<div className={actionButtonSet}>
						<Button sx={{width: '216px', height: '50px', fontSize: '18px'}} size="large" variant="contained">
							{
								(language === 'russian') && 'В КОРЗИНУ'
								||
								(language === 'english') && 'ADD TO CART'
							}
						</Button>
						<Button sx={{width: '216px', height: '50px', fontSize: '18px'}} size='large' variant="contained">
							{
								(language === 'russian') && 'ЗАКАЗАТЬ'
								||
								(language === 'english') && 'ORDER'
							}
						</Button>
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