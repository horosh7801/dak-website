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
import OrderNotification from '../lib/components/OrderNotification.js'
import roboto from '../lib/modules/variableFont.js'
import currencyFormat from '../lib/modules/currencyFormat.js'
import {addToCart, removeFromCart} from '../lib/modules/cartOperations.js'
import CircularProgress from '@mui/material/CircularProgress'

const leftSection = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 1120px;
	background-color: #f7f7f7;
	padding-top: 20px;
	gap: 10px;
`

const rightSection = css`
	display: flex;
	flex-direction: column;
	align-items: left;
	flex-grow: 1;
	position: sticky;
	top: 92px;
	height: calc(100vh - 92px);
	row-gap: 20px;
	
`

const imgContainer = css`
	position: relative;
	width: 150px;
	height: 150px;
	margin-left: 10px;
	top: -8px;
`

const itemRow = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	border-bottom: 2px solid white;
	width: 450px;
	font-size: 20px;
`

const itemName = css`
	display: flex;
	justify-content: center;
	font-size: 21px;
	margin-top: 15px;
`

const specs = css`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	color: #000000a3;
	font-weight: 200;
	font-size: 17px;
	flex-grow: 1;
`

const cost = css`
	display: flex;
	justify-content: flex-end;
	font-weight: 550;
	font-size: 21px;
	margin-right: 5px;
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
`

const clearIcon = css`
	display: flex;
	align-self: start;
	height: 100%;
`

const totalCostContainer = css`
	font-size: 30px;
	align-self: flex-start;
	margin-top: 20px;
	margin-left: 38px;
`

const phoneContainer = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const subHeader = css`
	position: sticky;
	top: 59px;
	display: flex;
	color: white;
	background-color: black;
	height: 33px;
	align-items: center;
	padding-left: 10px;
	font-size: 20px;
	z-index: 1;
`

export default function ShoppingCart({ localizedText }) {

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
console.log(parsedRes)
		setLocalizedDataState(parsedRes)
	})()}, [])

	useEffect(() => {
		if (localizedDataState !== null) {
			let totalCost = 0
			for (const i in shoppingCart.shoppingCartState) {
				totalCost += localizedDataState[i].price * shoppingCart.shoppingCartState[i].amount
			}
			setTotalCostState(totalCost)
		}	
	}, [localizedDataState])

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
		`}>
			<OrderNotification 
				state={dialogState} 
				setState={setDialogState} 
				localizedText={localizedText.checkoutPanel.orderConfirmation}					
			/>
			<div className={subHeader}>
				{localizedText.pageLabel}
			</div>
			<div className={css`
				display: flex;
				flex-direction: row;
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
					`}>
						{
							(localizedDataState === null) && <CircularProgress sx={{marginLeft: '50%', marginTop: '25%'}}/> ||
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
									`}>												
										<div className={imgContainer}>
											<Link href={`/products/${item.type}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}`}>
												<Image
													src={`/products/${item.type}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}/item0.jpg`} 
													fill={true} 
													style={{objectFit: 'contain'}}
												/>
											</Link>	
										</div>	
										<div className={css`
											display: flex;
											flex-direction: column;
											width: calc(100% - 150px);
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
						shoppingCart.shoppingCartState.length === 0
							? 
								<div className={css`
									display: flex;
									justify-content: center;
									font-size: 30px;
									margin-top: 20px;	
								`}>
									{localizedText.emptyCart}
								</div>
							:
								<CheckoutForm 
									totalCost={totalCostState} 
									shoppingCart={shoppingCart}
									locale={router.locale}
									localizedText={localizedText.checkoutPanel}
									onSuccess={() => {
										setDialogState('success')
										for (const i of shoppingCart.shoppingCartState) {
											removeFromCart(i)
										}
										setLocalizedDataState([])
										shoppingCart.setShoppingCartState([])
									}}
									onFailure={() => {
										setDialogState('failure')
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