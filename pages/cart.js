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
import CheckoutForm from '../lib/components/CheckoutForm.js'
import OrderNotification from '../lib/components/OrderNotification.js'
import roboto from '../lib/modules/variableFont.js'

const leftSection = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 1120px;
	background-color: #f7f7f7;
	min-height: calc(100vh - 112px);
	row-gap: 10px;
	padding-top: 20px;
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
	margin-left: 20px;
`

const itemRow = css`
	width: 100%;
	height: 170px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-bottom: 2px solid white;
	font-size: 20px;
`

const itemName = css`
	font-size: 26px;
	flex-grow: 1;
`

const specs = css`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`

const cost = css`
	display: flex;
	flex-grow: 1;
	margin-right: 10px;
`

const amount = css`
	display: flex;
	flex-grow: 1;
`

const clearIcon = css`
	display: flex;
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

const paramContainer = css`
	display: flex;
	flex-direction: column;
	justify-content:  center;
`

export default function ShoppingCart({ localizedText }) {

	const shoppingCart = useContext(ShoppingCartContext)

	const locale = useContext(LocaleContext)

	const [totalCostState, setTotalCostState] = useState(0)

	const [dialogState, setDialogState] = useState(null)

	useEffect(() => {
		let totalCost = 0
		for (const element of shoppingCart.shoppingCartState) {
			totalCost += Math.round(element.price * locale.localeState.rate) * element.amount
		}
		setTotalCostState(totalCost)
	}, [shoppingCart])

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
		`}>
			<OrderNotification 
				state={dialogState} 
				setState={setDialogState} 
				shoppingCart={shoppingCart.shoppingCartState} 
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
					{shoppingCart.shoppingCartState.map((item, index) => (
						<Paper key={index} sx={{width: '1050px'}}>
							<div className={itemRow}>
								<div className={css`
									flex-grow: 1;
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
								</div>	
								<div className={cx(paramContainer, itemName)}>
									{item.name}
								</div>
								<div className={cx(paramContainer, specs)}>
									<div>
										{`${item.params.toLowerCase()}`}
									</div>
								</div>
								<div className={cx(paramContainer, amount)}>
									{`${item.amount} ${localizedText.units.quantity}.`}
								</div>
								<div className={cx(paramContainer, cost)}>
									{`${Math.round(item.price * locale.localeState.rate) *  item.amount } ${locale.localeState.currency}`}
								</div>
								<div className={clearIcon}>
									<div>
										<IconButton onClick={() => {
											const newState = shoppingCart.shoppingCartState.slice(0, index)
												.concat(shoppingCart.shoppingCartState.slice(index + 1, shoppingCart.shoppingCartState.length))
											shoppingCart.setShoppingCartState(newState)
										}}>
											<ClearSharpIcon/>
										</IconButton>
									</div>	
								</div>	
							</div>	
						</Paper>	
					))}
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
									currency={locale.localeState.currency}
									localizedText={localizedText.checkoutPanel}
									onSuccess={() => {
										setDialogState('success')
										shoppingCart.setShoppingCartState([])
									}}
									onFailure={() => {
										setDialogState('failure')
									}}
									items={shoppingCart.shoppingCartState.map((item) => (
										{name: item.name, length: item.length, amount: item.amount}
									))}
								/>

								
					}			
				</div>
			</div>
		</div>	
	)
}

export async function getStaticProps({ locale }) {
  const fs = require('fs');

  const localizedText = JSON.parse(fs.readFileSync(`json/localization/${locale}/cart.json`))

  return {
    props: { localizedText }
  }  
}