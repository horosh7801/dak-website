import { css } from '@emotion/css'
import { useContext, useEffect, useState } from 'react'
import ShoppingCartContext from '../lib/context/shoppingCart.js'
import Image from 'next/image'
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'

const leftSection = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 1120px;
	background-color: #f7f7f7;
	min-height: 100vh;
`

const rightSection = css`
	display: flex;
	flex-direction: column;
	align-items: left;
	flex-grow: 1;
	position: sticky;
	top: 80px;
	height: calc(100vh - 80px);
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
	gap: 50px;
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
	top: 47px;
	display: flex;
	color: white;
	background-color: black;
	height: 33px;
	align-items: center;
	padding-left: 10px;
	font-size: 20px;
	z-index: 1;
`

export default function ShoppingCart() {

	const shoppingCart = useContext(ShoppingCartContext)

	const [totalCostState, setTotalCostState] = useState(0)

	useEffect(() => {
		let totalCost = 0
		for (const element of shoppingCart.shoppingCartState) {
			totalCost += element.price
		}
		setTotalCostState(totalCost)
		console.log(totalCost)
	}, [shoppingCart])

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
		`}>
			<div className={subHeader}>
				ОФОРМЛЕНИЕ ЗАКАЗА
			</div>
			<div className={css`
				display: flex;
				flex-direction: row;
			`}>
				<div className={leftSection}>
					{shoppingCart.shoppingCartState.map((item, index) => (
						<div className={itemRow}>
							<div className={css`
								flex-grow: 0.2;
							`}>
								<div className={imgContainer}>
									<Image
										src={item.img} 
										fill={true} 
										style={{objectFit: 'contain'}}
									/>
								</div>
							</div>	
							<div className={itemName}>
								{item.name}
							</div>
							<div className={specs}>
								<div>
									{`${item.length} см`}
								</div>
								<div>
									{`${item.power} Вт`}
								</div>	
							</div>
							<div className={amount}>
								{`1 шт.`}
							</div>
							<div className={cost}>
								{`${item.price} ₽`}
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
					))}
				</div>
				<div className={rightSection}>
					<div className={totalCostContainer}>
						{`ИТОГ: ${totalCostState} ₽`}
					</div>
					<div>
						<TextField
							type='tel'
							label='ТЕЛЕФОН' 
							size='small'
							sx={{
								width: '200px',
								marginLeft: '38px'
							
							}}/>
					</div>		
					<Button 
						sx={{
							alignSelf: 'center',
							width: '216px', 
							height: '50px', 
							fontSize: '18px'
						}} 
						size='large' 
						variant="contained"
					>
						ПОДТВЕРДИТЬ
					</Button>
				</div>
			</div>
		</div>	
	)
}

