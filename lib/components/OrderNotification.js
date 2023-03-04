import { css, cx } from '@emotion/css'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import CheckSharpIcon from '@mui/icons-material/CheckSharp'
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp'
import roboto from '../modules/variableFont.js'
import CircularProgress from '@mui/material/CircularProgress'
import Link from 'next/link'


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
					font-size: 20px;
					font-weight: 456;
					color: ${state === 'success' ? '#52ab1d' : '#fb2d2d'};
					text-align: center;
					line-height: 1.4;
					margin-bottom: 10px;
				`)}>
					{localizedText[state]}
				</div>
				{state === 'success' &&		
					<div className={css`
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						width: 100%;
					`}>
						<Link className={css`
							text-decoration: none;
							color: black;
							`} 
							href='/account/orders'
						>
							<div className={cx(css`
								text-underline-offset: 4px;
								cursor: pointer;
								text-decoration: underline;
							`, roboto)}>
								{localizedText.orderLink}
							</div>
						</Link>	
					</div>	
				}		
			</Paper>
		</Dialog>
	)
}