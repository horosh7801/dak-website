import { css, cx } from '@emotion/css'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import CheckSharpIcon from '@mui/icons-material/CheckSharp'
import roboto from '../modules/variableFont.js'

export default function OrderNotification({ setState, state, shoppingCart, localizedText }) {

	return (
		<Dialog onClose={() => {
			setState(false)}} open={state && !(shoppingCart === [])
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
				<CheckSharpIcon sx={{fontSize: '80px', color: '#52ab1d'}}/>
				<div className={cx(roboto, css`
					margin-top: 5px;
					font-size: 30px;
					font-weight: 456;
					color: #52ab1d;
					text-align: center;
					line-height: 1.4;
					margin-bottom: 10px;
				`)}>
					{localizedText}
				</div>			
			</Paper>
		</Dialog>
	)
}