import { useRouter } from 'next/router'
import Image from 'next/image'
import { css, cx } from '@emotion/css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Select from '@mui/material/Select'
import MuiInput from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { useState, useContext, useEffect } from 'react'
import ShoppingCartContext from '../../../lib/context/shoppingCart.js'
import CheckoutForm from '../../../lib/components/CheckoutForm.js'
import OrderNotification from '../../../lib/components/OrderNotification.js'
import { getCookie, hasCookie } from 'cookies-next'
import roboto from '../../../lib/modules/variableFont.js'
import currencyFormat from '../../../lib/modules/currencyFormat.js'
import { addToCart, removeFromCart } from '../../../lib/modules/cartOperations.js'
import useMediaQuery from '@mui/material/useMediaQuery'

const breakpoints = [1612, 1149]

const maxImageWidth = 1024
const maxImageHeight = 768

const itemPage = css`
	display: flex;
	flex-direction: row;
`

const itemImageSet = css`
	width: 1120px;

	@media (max-width: ${breakpoints[0]}px) {
		width: 730px;
	}
	@media (max-width: ${breakpoints[1]}px) {
	 width: 534px;
	}
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
	flex-grow: 1;
	background-color: #f7f7f7;
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

export default function Item({ id, item, itemType, localizedText, imgCount }) {

	const [itemInCartState, setItemInCartState] = useState(false)

	const [priceState, setPriceState] = useState(0)

	const [checkoutState, setCheckoutState] = useState(false)

	const [amountState, setAmountState] = useState(1)

	const [dialogState, setDialogState] = useState(null)

	const shoppingCart = useContext(ShoppingCartContext)

	const router = useRouter()

	useEffect(() => {
		for (const element of shoppingCart.shoppingCartState) {
			if (element.id === id) {
				setItemInCartState(true)
			}
		}
	}, [])

	const matches = useMediaQuery(`(max-width: 950px)`)

	return (
		<div className={itemPage}>
			<OrderNotification 
				state={dialogState} 
				setState={setDialogState} 
				localizedText={localizedText.checkoutPanel.orderConfirmation}					
			/>		
			<div className={leftSection}>
				<div className={itemImageSet}>
					<Carousel						
						showStatus={false}
						showThumbs={true}
						showIndicators={false}
						renderThumbs={(children) => (children.map((element, index) => (
							<div key={index} className={css`width: 70px; height: 70px; position: relative;`}>
								<Image src={`/products/${itemType}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}/item${index}.jpg`} fill={true} style={{objectFit: 'contain'}} />
							</div>						
						)))}
					>
						{Array(imgCount).fill(1).map((element, index) => (
							<div key={index} className={css`
								width: 1024px; 
								height: 768px; 
								position: relative;
								@media (max-width: ${breakpoints[0]}px) {
									width: 730px;
									height: ${730 / maxImageWidth * maxImageHeight}px;
								}
								@media (max-width: ${breakpoints[1]}px) {
									width: 534px;
									height: ${534 / maxImageWidth * maxImageHeight}px;
								}
							`}>
								<Image 
									src={`/products/${itemType}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}/item${index}.jpg`} 
									fill={true} 
									style={{objectFit: 'contain'}} />
							</div>
						))}	
					</Carousel>		
				</div>
				<div className={css`
					padding-left: 20px;
					padding-right: 20px;
				`}>
					<div className={tableTitle}>
						{localizedText.characteristics.characteristics}
					</div>
					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								{Object.keys(item.features).map((value, index) => (
									<TableRow
										key={index}
									>
										<TableCell
											sx={{fontSize: '18px', fontWeight: '600'}}
											align="left"
										>
											{localizedText.characteristics[value]}
										</TableCell>
										<TableCell
											sx={{fontSize: '17px'}}
											align="left"
										>
											{item.features[value]}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>	

			</div>
			{!matches &&
				<div className={css`
					position: sticky;
					top: 59px;
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					height: calc(100vh - 59px);
					width: 416px;
					min-width: 416px;
				`}>
					{
						checkoutState
							?
								<>
									<div className={css`
										height: 33px;
										background-color: black;
										color: white;
										display: flex;
										align-items: center;
										padding-left: 10px;
										font-size: 20px;
									`}>
										{localizedText.checkoutPanel.label}
										<div className={css`
											flex-grow: 1;
											display: flex;
											justify-content: flex-end;
										`}>
											<IconButton 
												disableRipple
												onClick={() => {
													setCheckoutState(!checkoutState)
												}}
											>
												<ArrowForwardSharpIcon sx={{color: 'white', fontSize: '35px', fontWeight: 100}}/>
											</IconButton>	
										</div>	
									</div>
									<CheckoutForm 
										totalCost={item.price[priceState].price * amountState} 
										localizedText={localizedText.checkoutPanel}
										items={[{id, amount: amountState, price: priceState}]}
										locale={router.locale}
										onSuccess={() => {
											setDialogState('success')
											setCheckoutState(false)
										}}
										onFailure={() => {
											setDialogState('failure')
										}}
									/>
								</>	
							:	
								<div className={rightSection}>
									<div className={stickyPanel}>
										<div className={productName}>
											{item.name}
										</div>
										<div className={lengthSlider}>	
											{item.price.length > 1 &&
												<div className={css`
													overflow: scroll;
													height: 200px;
													outline: 1px solid #e0e0e0;
												`}>
													<ToggleButtonGroup 
														orientation='vertical' 
														exclusive 
														value={priceState}
														className={css`
											        font-weight: 500;
											        & .Mui-selected, .Mui-selected:hover {
											          background-color: black;
											          color: white;
											        }
											        & .MuiToggleButton-root {
											          border-radius: 0;
											        }
											      `}													
													>
														{item.price.map((value, index) => (
															<ToggleButton key={index} value={index} onClick={() => {setPriceState(index)}}>
																<div className={cx(roboto, css`
																	display: flex;
																	column-gap: 5px;
																	align-items: center;

																`)}>
																	<div>
																		{value.desc}
																	</div>	
																	<div className={css`
																		font-size: 20px;
																		font-weight: 550;
																		display: flex;
																		column-gap: 5px;
																	`}>
																		<div>
																			{currencyFormat(value.price, router.locale)}
																		</div>	
																	</div>
																</div>
															</ToggleButton>
														)) }
													</ToggleButtonGroup>	
												</div>						
											}				
											<div className={css`
												margin-top: 10px;
												display: flex;
												flex-direction: row;
												align-items: center;
												column-gap: 5px;
											`}>
												<div>
													{`${localizedText.checkoutPanel.amount}:`}
												</div>
												<MuiInput
													className={cx(roboto, css`
		
														& .MuiInput-input {
															padding: 0px;
															text-align: center;
															 width: 45px;
														}
													`)}

													value={amountState}
													onChange={(event) => {
														let value
														if (event.target.value < 1) {
															value = 1
														} else if (event.target.value > 99) {
															value = 99
														} else {
															value = event.target.value
														}
														setAmountState(value)
													}}
													inputProps={{
														type: 'number',
														min: 1,
														step: 1,
														max: 99
													}}
												/>
											</div>
										</div>	
										<div className={price}>
											{currencyFormat(Math.round(item.price[priceState].price * amountState), router.locale)}
										</div>
										<div className={actionButtonSet}>
										{/* add to cart button */}
											<Button 
												disabled={itemInCartState}
												sx={{width: '216px', height: '50px', fontSize: '18px'}} 
												size="large" variant="contained"
												onClick={() => {
													if (!itemInCartState) {
														const newItem = {
															name: item.name,
															type: itemType, 
															price: priceState,
															amount: amountState,
															id														
														}
														shoppingCart.setShoppingCartState([...shoppingCart.shoppingCartState, newItem])
														setItemInCartState(true)
														addToCart(newItem)
													}	
												}}
											>
												{
													localizedText.checkoutPanel.addToCart
												}
											</Button>
											<Button
												sx={{width: '216px', height: '50px', fontSize: '18px'}} 
												size='large' 
												variant="contained"
												onClick={() => {
												 	setCheckoutState(!checkoutState)
												}}
											>
												{
													localizedText.checkoutPanel.order
												}
											</Button>
										</div>
									</div>	
								</div>	
							}
					</div>	
				}	

		</div>
	)
}

export async function getStaticProps({ locale, params }) {
	const fs = require('fs')

	const itemName = params.item
	const itemType = params.type

	const localizedText = JSON.parse(fs.readFileSync(`json/localization/${locale}/item.json`))

	const itemTypes = JSON.parse(fs.readFileSync('json/product_types.json'))

	const currencyRate = JSON.parse(fs.readFileSync('json/EURCurrencyRates.json'))[locale.toUpperCase()].rate

//	const parsedItems = JSON.parse(fs.readFileSync('json/items.json'))

	let parsedItems
	switch (locale) {
		case 'en':
			parsedItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
			break
		case 'ru':
			parsedItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))
			break
		case 'ro':
			parsedItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))	
			break
		default: 
		parsedItems =	JSON.parse(fs.readFileSync('json/itemsEN.json'))	
	}

	let id
	for (const itemID in parsedItems) {
		const item = parsedItems[itemID]
		if (itemName === item.name.toLowerCase().replace(/[\s-]/g, '_')) {
			id = itemID
			break
		}
	}

	const item = parsedItems[id]
	for ( const i in item.price) {
		item.price[i].price = Math.round(item.price[i].price * currencyRate)
	}

//count how many images there is for each item
	let imgCount = 0
	while (true) {
		try {
			fs.readFileSync(`public/products/${itemType}/${itemName}/item${imgCount}.jpg`)
		}
		catch(err) {
			break
		}
		imgCount = imgCount + 1
	}

	return {
		props: { item, id, itemType, localizedText, imgCount }
	}
}

export async function getStaticPaths({ locales }) {

	const fs = require('fs')

	const types = JSON.parse(fs.readFileSync('json/product_types.json', 'utf-8'))

	const parsedItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))

	const paths = []

	for (const locale of locales) {
		if (locale === 'default') {
			continue
		}
		for (const itemID in parsedItems) {
			const item = parsedItems[itemID]
			paths.push({ 'params': { item: item.name.toLowerCase().replace(/[\s-]/g, '_'), type: types[item.type]}, 'locale': locale })
		}	
	}

	return {
		paths: paths,
		fallback: false
	}
}