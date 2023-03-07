import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import { css, cx } from '@emotion/css'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import currencyFormat from '../modules/currencyFormat.js'
import { hasCookie } from 'cookies-next'
import ConfirmationForm from './ConfirmationForm.js'
import Link from 'next/link'

const totalCostContainer = css`
	font-size: 24px;
	font-weight: 500;
	align-self: center;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

export default function CheckoutForm({ totalCost, openConfirmationForm, buttonDisabled, localizedText, locale}) {

	return (
			<>
				<div className={css`
					margin-top: 50px;
					display: flex;
					flex-direction: column;
					align-items: left;
					flex-grow: 1;
					row-gap: 20px;
				`}>
					<div className={totalCostContainer}>
						<div className={css`
							display: flex;
							flex-direction: row;
						`}>
							<div className={css`
								width: 20px;
							`}>
							</div>						
							{`${localizedText.totalCost}:`}
						</div>	
						<div className={css`
							display: flex;
							flex-direction: row;
						`}>
							{`${currencyFormat(totalCost, locale)}`}
							<div className={css`
								width: 20px;
							`}>
							</div>
						</div>							
					</div>
					<div className={css`
						display: flex;
						flex-direction: column;
						align-items: center;
						row-gap: 15px;
					`}>		
					</div>																
					<Button 
						disabled={buttonDisabled}
						sx={{
							alignSelf: 'center',
							width: '100%', 
							height: '50px', 
							fontSize: '18px'
						}} 
						size='large' 
						variant="contained"
						onClick={() => {
							openConfirmationForm()
						}}
					>
						{localizedText.submit}
					</Button>
					<Link className={css`
						text-decoration: none;
						color: black;
						`} 
						href='/info/delivery'
					>
						<div className={css`
							text-underline-offset: 4px;
							cursor: pointer;
							text-decoration: underline;
							margin-left: 20px;
							margin-top: 30px;
						`}>
							{localizedText.delivery}
						</div>
					</Link>	
				</div>	
			</>
	)	
}	
