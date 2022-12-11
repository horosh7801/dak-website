import { css } from '@emotion/css'
import { useContext } from 'react'
import ShoppingCartContext from '../lib/context/shoppingCart.js'
import Image from 'next/image'
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import IconButton from '@mui/material/IconButton'
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
	align-items: center;
	flex-grow: 1;
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

export default function ShoppingCart() {

	const shoppingCart = useContext(ShoppingCartContext)

	return (
		<div>
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
			</div>
		</div>
	)
}

