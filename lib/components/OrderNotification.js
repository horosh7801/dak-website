import { css, cx } from '@emotion/css'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import CheckSharpIcon from '@mui/icons-material/CheckSharp'
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp'
import roboto from '../modules/variableFont.js'

export default function OrderNotification({ setState, state, shoppingCart, localizedText }) {

	return (
		<Dialog 
			onClose={() => {
				setState(null)
			}} 
			open={(state !== null) && !(shoppingCart === [])
			}>
			<Paper 
				variant='outlined'
				sx={{
					width: '400px', 
					height: '200px', 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					flexDirection: 'column',
				}}
			>
				{state === 'success'
					? <CheckSharpIcon sx={{fontSize: '80px', color: '#52ab1d'}}/>
					:	<ErrorOutlineSharpIcon sx={{fontSize: '80px', color: '#fb2d2d'}}/>
				}
				<div className={cx(roboto, css`
					margin-top: 5px;
					font-size: 30px;
					font-weight: 456;
					color: ${state === 'success' ? '#52ab1d' : '#fb2d2d'};
					text-align: center;
					line-height: 1.4;
					margin-bottom: 10px;
				`)}>
					{localizedText[state]}
				</div>			
			</Paper>
		</Dialog>
	)
}