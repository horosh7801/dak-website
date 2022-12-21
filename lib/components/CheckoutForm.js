import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { css, cx } from '@emotion/css'

const totalCostContainer = css`
	font-size: 30px;
	align-self: flex-start;
	margin-top: 20px;
	margin-left: 38px;
`

export default function CheckoutForm({ totalCost }) {
	return (
		<>
			<div className={totalCostContainer}>
				{`ИТОГ: ${totalCost} ₽`}
			</div>
			<div className={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				row-gap: 15px;
			`}>
				<div>
					<TextField
						type='tel'
						label='ТЕЛЕФОН' 
						size='small'
						sx={{
							width: '200px',
										
						}}/>
				</div>		
				<div>
					<TextField
						type='tel'
						label='ИМЯ' 
						size='small'
						sx={{
							width: '200px',
								
					}}/>
				</div>		
				<div>
					<TextField
						type='tel'
						label='EMAIL'
						size='small'
						sx={{
							width: '200px',
													
					}}/>
				</div>		
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
		</>	
	)	
}	