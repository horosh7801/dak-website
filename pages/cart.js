import { css } from '@emotion/css'
import { useContext } from 'react'
import ShoppingCartContext from '../lib/context/shoppingCart.js'

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

export default function ShoppingCart() {

	const shoppingCart = useContext(ShoppingCartContext)

	return (
		<div>
			<div className={leftSection}>
				<div>
					gesnklesgmesgmklegs
				</div>
				{shoppingCart.shoppingCartState.map((item, index) => {
					console.log(shoppingCart)
					return(<div className={css`width: 10px; height: 10px; baclground-color: black;`}>
						{index}
					</div>)
				})}
			</div>
			<div className={rightSection}>
			</div>
		</div>
	)
}