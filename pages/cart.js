import { css, cx } from '@emotion/css'
import { useContext, useEffect, useState } from 'react'
import ShoppingCartContext from '../lib/context/shoppingCart.js'
import LocaleContext from '../lib/context/locale.js'
import Image from 'next/image'
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CheckoutForm from '../lib/components/CheckoutForm.js'
import subHeader from '../lib/modules/styles/subHeader.js'
import OrderNotification from '../lib/components/OrderNotification.js'
import roboto from '../lib/modules/variableFont.js'
import currencyFormat from '../lib/modules/currencyFormat.js'
import {addToCart, removeFromCart} from '../lib/modules/cartOperations.js'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'

const scaleRate = 0.75

const leftSection = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	background-color: #f7f7f7;
	padding-top: 20px;
	padding-bottom: 20px;
	flex-grow: 1;
	gap: 10px;
	@media (max-width: 770px) {
		border-bottom: 6px solid #222;
	}
`

const rightSection = css`
	display: flex;
	flex-direction: column;
	align-items: left;
	flex-grow: 1;
	position: sticky;
	top: 45px;
	height: calc(100vh - 45px);
	width: 300px;
	min-width: 300px;
	max-width: 300px;
	row-gap: 20px;
	@media (max-width: 770px) {
		margin-bottom: 20px;

		height: auto;
		align-self: center;
	}
	
`

const imgContainer = css`
	position: relative;
	width: 150px;
	height: 150px;
	margin-left: 10px;
	top: -8px;
	@media (max-width) {
		width: ${150 * scaleRate}px;
		height: ${150 * scaleRate}px;
		margin-left: ${10 * scaleRate}px;
		top: -${8 * scaleRate}px
	}
`

const itemRow = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	border-bottom: 2px solid white;
	width: 450px;
	font-size: 20px;
	@media (max-width: 480px) {
		width: ${450 * scaleRate}px;
		font-size: ${20 * scaleRate}px;
	}
`

const itemName = css`
	display: flex;
	justify-content: center;
	font-size: 21px;
	margin-top: 15px;
	@media (max-width: 480px) {
		font-size: ${21 * scaleRate}px;
		margin-top: ${15 * scaleRate}px;
	}
`

const specs = css`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	color: #000000a3;
	font-weight: 200;
	font-size: 17px;
	flex-grow: 1;
	@media (max-width: 480px) {
		font-size: ${17 * scaleRate}px;
	}
`

const cost = css`
	display: flex;
	justify-content: flex-end;
	font-weight: 550;
	font-size: 21px;
	margin-right: 5px;
	@media (max-width: 480px) {
		font-size: ${21 * scaleRate}px;
		margin-right: ${5 * scaleRate}px;
	}
`

const amount = css`
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-self: end;
	margin-left: 5px;
	font-weight: 300;
	width: 65px;
	margin-bottom: 5px;
	@media (max-width: 480px) {
		margin-left: ${5 * scaleRate}px;
		width: ${65 * scaleRate}px;
		margin-bottom: ${5 * scaleRate}px;
	}
`

const clearIcon = css`
	display: flex;
	align-self: start;
	height: 100%;
`

const phoneContainer = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`

export default function ShoppingCart({ localizedText, setFooterState }) {

  useEffect(() => {
    setFooterState(true)
  }, [])

	const shoppingCart = useContext(ShoppingCartContext)

	const locale = useContext(LocaleContext)

	const [totalCostState, setTotalCostState] = useState(0)

	const [dialogState, setDialogState] = useState(null)

	const [localizedDataState, setLocalizedDataState] = useState(null)

	const router = useRouter()

	useEffect(() => {(async () => {
		const items = shoppingCart.shoppingCartState.map(({id, price}) => ({id, price}))

		const res = await fetch(`/api/getItemParams?locale=${router.locale}&items=${JSON.stringify(items)}`)
		const parsedRes = await res.json()
		setLocalizedDataState(parsedRes)
	})()}, [router.locale])

	useEffect(() => {
		if (localizedDataState !== null) {
			let totalCost = 0
			for (const i in shoppingCart.shoppingCartState) {
				totalCost += localizedDataState[i].price * shoppingCart.shoppingCartState[i].amount
			}
			setTotalCostState(totalCost)
		}	
	}, [localizedDataState])

	const matches = useMediaQuery(`(max-width: 480px)`)

	const [fadeState, setFadeState] = useState(false)

	const [isCheckingOut, setIsCheckingOut] = useState(false)

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
		`}>
			<div className={subHeader}>
				{localizedText.pageLabel}
			</div>
			<div className={css`
				display: flex;
				flex-direction: row;
				@media (max-width: 770px) {
					flex-direction: column;
				}
			`}>
				<div className={leftSection}>
					<div className={css`
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: flex-start;
						align-content: flex-start;
						width: 910px;
						gap: 10px;
						@media (max-width: 1265px) {
							width: 451px;
						}
						@media (max-width: 770px) {
							overflow: scroll;
							height: 60vh;
						}
						@media (max-width: 480px) {
							width: 340px;
						}
					`}>
						{
							(localizedDataState === null) &&
								<div className={css`
									display: flex;
									flex-direction: row;
									justify-content: center;
									align-items: center;
									width: 100%;
									height: 100%;
								`}>
								 <CircularProgress /> 
								</div> 
							||
							!(localizedDataState === null) && shoppingCart.shoppingCartState.map((item, index) => (
							<Paper sx={{}} key={index}>
								<div className={itemRow}>
									<div className={css`
										display: flex;
										flex-direction: row;
										justify-content: flex-end;
										width: 100%;
									`}>
										<IconButton sx={{justifySelf: 'flex-end'}} onClick={() => {
											const newState = shoppingCart.shoppingCartState.slice(0, index)
												.concat(shoppingCart.shoppingCartState.slice(index + 1, shoppingCart.shoppingCartState.length))
											setLocalizedDataState([
												...localizedDataState.slice(0, index),
												...localizedDataState.slice(index + 1, localizedDataState.length)
											])
											shoppingCart.setShoppingCartState(newState)
											removeFromCart(item)
										}}>
											<ClearSharpIcon/>
										</IconButton>
									</div>

									<div className={css`
										display: flex;
										flex-direction: row;
										width: 100%;
										column-gap: 10px;
										@media (max-width: 480px) {
											column-gap: ${10 * scaleRate}px;
										}
									`}>												
										<div className={imgContainer}>
											<Link href={`/products/${item.type}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}`}>
												<Image
													src={`/products/${item.type}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}/item0.jpg`} 
													fill={true} 
													style={{objectFit: 'contain'}}
													sizes={`(max-width: 480px) ${143 * scaleRate}px, 143px`}
												/>
											</Link>	
										</div>	
										<div className={css`
											display: flex;
											flex-direction: column;
											width: calc(100% - 150px);
											@media (max-width: 480px) {
												width: calc((100% - 150px) * ${scaleRate});
											}
										`}>
											<div className={css`
												display: flex;
												flex-direction: row;
											`}>
												<div className={itemName}>
													{item.name}	
												</div>
											</div>
											<div className={specs}>
												<div>
													{`${localizedDataState[index].params.toLowerCase()}`}
												</div>
											</div>	
										</div>
									</div>								
									<div className={css`
										display: flex;
										flex-direction: row;
										width: 100%;
										justify-content: space-between;
									`}>
										<div className={amount}>
											{`${item.amount} ${localizedText.units.quantity}.`}
										</div>										
										<div className={cost}>
											{currencyFormat(localizedDataState[index].price * item.amount, router.locale)}
										</div>		
									</div>
								</div>	
							</Paper>	
						))}
					</div>	
				</div>
				<div className={rightSection}>
					{
						shoppingCart.shoppingCartState.length === 0 && !isCheckingOut
							? 
								<div className={css`
									display: flex;
									justify-content: center;
									font-size: 20px;
									margin-top: 20px;	
								`}>
									{localizedText.emptyCart}
								</div>
							:
								<CheckoutForm 
									setFadeState={setFadeState}
									totalCost={totalCostState} 
									shoppingCart={shoppingCart}
									locale={router.locale}
									localizedText={localizedText.checkoutPanel}
									setIsCheckingOut={setIsCheckingOut}
									onSuccess={() => {
										for (const i of shoppingCart.shoppingCartState) {
											removeFromCart(i)
										}
										setLocalizedDataState([])
										shoppingCart.setShoppingCartState([])
									}}
									onFailure={() => {
									}}
									items={shoppingCart.shoppingCartState.map((item) => (
										{id: item.id, price: item.price, amount: item.amount}
									))}
								/>

								
					}			
				</div>
			</div>
		</div>	
	)
}

export async function getStaticProps({ locale }) {

	if (locale === 'default') {
		return {
			notFound: true,
		}
	}

  const fs = require('fs');

  const localizedText = JSON.parse(fs.readFileSync(`json/localization/${locale}/cart.json`))

  return {
    props: { localizedText }
  }  
}