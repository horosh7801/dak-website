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
import AuthenticationForm from './AuthenticationForm.js'

const totalCostContainer = css`
	font-size: 26px;
	font-weight: 500;
	align-self: center;
`

export default function CheckoutForm({ totalCost, localizedText, items, onSuccess, onFailure, locale, setDialogState}) {

	const [submitButtonState, setSubmitButtonState] = useState(false)

	const [authFormState, setAuthFormState] = useState(false)

	return (
			<>
				<Dialog
					onClose={() => {
						setAuthFormState(false)
					}}
					open={authFormState}
					sx={{paddingTop: '-100px'}}
				>
					<AuthenticationForm 
						localizedText={localizedText.authForm}
						onSuccess={async () => {
							setAuthFormState(false)
							setDialogState('loading')
							setSubmitButtonState(true)
							const res = await fetch(`/api/placeOrder?order=${JSON.stringify(items)}`)
							if (res.ok) {
								onSuccess()
							} else {
								onFailure()
							}
							setSubmitButtonState(false)							
						}}
					/>
				</Dialog>
				<div className={css`
					margin-top: 50px;
					display: flex;
					flex-direction: column;
					align-items: left;
					flex-grow: 1;
					row-gap: 20px;
				`}>
					<div className={totalCostContainer}>
						{`${localizedText.totalCost}: ${currencyFormat(totalCost, locale)}`}
					</div>
					<div className={css`
						display: flex;
						flex-direction: column;
						align-items: center;
						row-gap: 15px;
					`}>		
					</div>																
					<Button 
						disabled={submitButtonState}
						sx={{
							alignSelf: 'center',
							width: '100%', 
							height: '50px', 
							fontSize: '18px'
						}} 
						size='large' 
						variant="contained"
						onClick={async () => {

							if (hasCookie('user_token') === false) {
								setAuthFormState(true)
								return
							}

							setDialogState('loading')
							setSubmitButtonState(true)
							const res = await fetch(`/api/placeOrder?order=${JSON.stringify(items)}`)
							if (res.ok) {
								onSuccess()
							} else {
								onFailure()
							}
							setSubmitButtonState(false)
						}}
					>
						{localizedText.submit}
					</Button>
				</div>	
			</>
	)	
}	