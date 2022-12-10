import { useRouter } from 'next/router'
import Image from 'next/image'
import { css, cx } from '@emotion/css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useContext, useEffect } from 'react'
import LanguageContext from '../../../lib/context/language.js'
import ShoppingCartContext from '../../../lib/context/shoppingCart.js'


const itemPage = css`
	display: flex;
	flex-direction: row;
`

const itemImageSet = css`
	width: 1120px;
	height: 840px;
	margin-bottom: 111px;
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
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 1120px;
	background-color: #ececec;
`

const rightSection = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
`

const characteristicsGrid = css`
	border-top: 1px solid black;
	display: flex;
	flex-direction: row;
	border-left: 1px solid black;
	font-size: 20px;
	background-color: white;
	width: 1000px
`

const column = css`
	display: flex;
	flex-direction: column;
	border-right: 1px solid black;

`

const row = css`
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid black;	
`

const tableTitle = css`
	align-self: flex-start;
	font-size: 28px;
	margin-bottom: 10px;
`

const shortWHRatio = 1024 / 683
const longWHRatio = 513 / 768

const prices = {120: 22650, 140: 23250, 160: 24900, 180: 25500, 200: 26850}
const power = {120: 28, 140: 33, 160: 36, 180: 40, 200: 45}

export default function Item({ characteristics, characteristicsValues }) {

	const [itemInCartState, setItemInCartState] = useState(false)

	const [lengthState, setLengthState] = useState(120)

	const language = useContext(LanguageContext)

	const shoppingCart = useContext(ShoppingCartContext)

	const router = useRouter()
	const { item, type } = router.query

	useEffect(() => {
		for (const element of shoppingCart.shoppingCartState) {
			if (element.name === item) {
				setItemInCartState(true)
				break
			}
		}
	}, [])

	return (
		<div className={itemPage}>
			<div className={leftSection}>
				<div className={itemImageSet}>
					<Carousel						
						showStatus={false}
						showIndicators={false}
						renderThumbs={(children) => (children.map((element, index) => (
							<div className={css`width: 70px; height: 70px; position: relative;`}>
								<Image src={`/products/${type}/${item}/item${index}.jpg`} fill={true} style={{objectFit: 'contain'}} />
							</div>						
						)))}
					>
						{Array(20).fill(1).map((element, index) => (
							<div className={css`width: 1024px; height: 768px; position: relative;`}>
								<Image src={`/products/${type}/${item}/item${index}.jpg`} fill={true} style={{objectFit: 'contain'}} />
							</div>
						))}	
					</Carousel>		
				</div>
				<div>
					<div className={tableTitle}>
						ХАРАКТЕРИСТИКИ
					</div>
					<TableContainer sx={{width: '1000px'}} component={Paper}>
						<Table>
							<TableBody>
								{characteristics.map((value, index) => (
									<TableRow
										key={index}
									>
										<TableCell
											sx={{fontSize: '18px', fontWeight: '600'}}
											align="left"
										>
											{value[Object.keys(value)[0]]}
										</TableCell>
										<TableCell
											sx={{fontSize: '17px'}}
											align="left"
										>
											{characteristicsValues[Object.keys(value)[0]]}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
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
								(language === 'russian') && 'ДЛИНА:'
								||
								(language === 'english') && 'LENGTH:'
							}
						</div>
						<Slider
							sx={{marginBottom: '35px'}}
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
						<div>
							{
								(language === 'russian') && `МОЩНОСТЬ: ${power[lengthState]} Вт`
								||
								(language === 'english') && `POWER: ${power[lengthState]} W`
							}
						</div>
					</div>	
					<div className={price}>
						{`${prices[lengthState]} ₽`}
					</div>
					<div className={actionButtonSet}>
						<Button 
							disabled={itemInCartState}
							sx={{width: '216px', height: '50px', fontSize: '18px'}} 
							size="large" variant="contained"
							onClick={() => {
								if (!itemInCartState) {
									const	newState = [...shoppingCart.shoppingCartState]
									newState.push({
										name: item, 
										length: lengthState, 
										power: power[lengthState], 
										price: prices[lengthState],
										img: `/products/${type}/${item}.jpg`})
									shoppingCart.setShoppingCartState(newState)
									setItemInCartState(true)
								}	
							}}
						>
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

	const fs = require('fs')
	const characteristics = JSON.parse(fs.readFileSync('json/characteristics.json', 'utf-8'))
	const characteristicsValues = JSON.parse(fs.readFileSync('json/product_characteristics.json', 'utf-8'))
	return {
		props: { characteristics, characteristicsValues }
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