import { css, cx } from '@emotion/css'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import CheckSharpIcon from '@mui/icons-material/CheckSharp'
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp'
import roboto from '../modules/variableFont.js'
import CircularProgress from '@mui/material/CircularProgress'


export default function OrderNotification({ setState, state, localizedText }) {

	return (
		<Dialog 
			onClose={() => {
				setState(null)
			}} 
			open={(state !== null)}
		>
			<Paper 
				variant='outlined'
				sx={{
					width: '350px', 
					height: '200px', 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					flexDirection: 'column',
				}}
			>

				{(state === 'success') && <CheckSharpIcon sx={{fontSize: '65px', color: '#52ab1d'}}/> || (state === 'failure') && <ErrorOutlineSharpIcon sx={{fontSize: '80px', color: '#fb2d2d'}}/> || <CircularProgress />}
				<div className={cx(roboto, css`
					margin-top: 10px;
					font-size: 25px;
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