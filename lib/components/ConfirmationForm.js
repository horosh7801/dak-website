import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import { css, cx } from '@emotion/css'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup
import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'
import currencyFormat from '../modules/currencyFormat.js'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import roboto from '../modules/variableFont.js'
import CustomTextField from './CustomTextField.js'
import CircularProgress from '@mui/material/CircularProgress'
import subHeader from '../modules/styles/subHeader.js'
import CheckSharpIcon from '@mui/icons-material/CheckSharp'
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp'

const totalCostContainer = css`
	font-size: 26px;
	font-weight: 500;
	align-self: flex-start;
	margin-top: 20px;
	margin-left: 27px;
`

const errorText = css`
	color: #d32f2f;
	font-weight: 400;
	font-size: 12.5px;
	line-height: 1.66;
	letter-spacing: 0.03333em;	
	margin-bottom: -10px;
`

export default function ConfirmationForm({ localizedText, placeOrder, onFailure, formState, setFormState }) {

	const [registerSchemaState, setRegisterSchemaState] = useState()

	const [registerErrorState, setRegisterErrorState] = useState(null)

	const [state, setState] = useState(null)

	const [registerSubmitState, setRegisterSubmitState] = useState(false)

	useEffect(() => {
		registerFormik.resetForm()
		setRegisterSchemaState(yup.object({
		  email: yup
		    .string()
		    .min(6, localizedText.emailMin)
		    .email(localizedText.validation.emailChar)
		    .required(localizedText.validation.email),
		  phone: yup
		    .string()
		    .matches(/[0-9]/, localizedText.validation.phoneChar)
		    .required(localizedText.validation.phone),
		  name: yup
		  	.string()
		  	.matches(/[A-Za-z]/, localizedText.validation.nameChar)
		  	.required(localizedText.validation.name)
		}))					
	}, [localizedText])

	const registerFormik = useFormik({
		initialValues: {
			phone: '',
			name: '',
			email: '',
			password: '',
			confirm_password: '',
		},
		validationSchema: registerSchemaState,
		onSubmit: async (values) => {
			setRegisterSubmitState(true)
			placeOrder(setState)
			registerFormik.resetForm()
		}
	})

	return (
		<Dialog
			onClose={() => {
				if (state === null && registerSubmitState === true) {
					return
				}
				setState(null)
				setRegisterSubmitState(false)
				setFormState(false)
				onFailure()
			}}
			open={formState}
			sx={{paddingTop: '-100px'}}			
		>
			<Paper sx={{
				marginTop: '0px', 
				minWidth: '350px', 
				minHeight: '228px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingBottom: '20px', 
			}}>		
				<div className={cx(subHeader, css`padding-left: 0px; width: 100%; justify-content: center; margin-bottom: 20px;`, roboto)}>
					{localizedText.title}
				</div>	
				{state === null && registerSubmitState &&
					<div className={css`
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						flex-grow: 1;
					`}>
						<CircularProgress />
					</div>	
				||	
				state !== null && registerSubmitState &&
					<div className={css`display: flex; flex-direction: column; flex-grow: 1;`}>
						{state === true &&
							<div className={css`
								display: flex;
								flex-direction: column;
								align-items: center;
								width: 350px;
							`}>
								<CheckSharpIcon sx={{fontSize: '70px', color: '#02fd02', marginBottom: '12px'}}/>
								<div className={cx(css`font-size: 18px; margin-bottom: 20px; font-weight: 400`, roboto)}>
									{localizedText.orderConfirmation.success}
								</div>
								<div className={cx(css`
										padding-left: 15px;
										padding-right: 15px;
										font-weight: 300;
									`, roboto)}>
									{localizedText.orderConfirmation.successDetails}
								</div>							
							</div>
						||	
						state === false &&
							<div className={css`
								display: flex;
								flex-direction: column;
								flex-grow: 1;
								justify-content: center;
							`}>
								<div className={css`
									display: flex;
									flex-direction: column;
									align-items: center;
									width: 350px;
								`}>
									<ErrorOutlineSharpIcon sx={{fontSize: '70px', color: '#ff1515', marginBottom: '12px'}}/>
									<div className={cx(css`font-size: 18px; margin-bottom: 20px; font-weight: 400`, roboto)}>
										{localizedText.orderConfirmation.failure}
									</div>						
								</div>							
							</div>	
						}
					</div>
				||					
					<div className={css`
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						row-gap: 10px;
					`}>		
						<form 
							className={css`
								width: 100%;
								display: flex;
								flex-direction: column;
								align-items: center;
							`} 
							onSubmit={registerFormik.handleSubmit}
						>
							<div className={css`
								display: flex;
								flex-direction: column;
								align-items: center;
								flex-grow: 1;
								row-gap: 20px;
								width: 245px;
							`}>
								<div className={css`
									display: flex;
									flex-direction: column;
									align-items: center;
									row-gap: 15px;
								`}>
									{registerErrorState &&
										<div className={errorText}>
											{registerErrorState}
										</div>
									}		
									<div>
										<CustomTextField
											type='text'
											id='name'
											name='name'
											value={registerFormik.values.name}
											onChange={(e) => {
												if (registerErrorState !== null) {
													setRegisterErrorState(null)
												}
												registerFormik.handleChange(e)
											}}
											error={registerFormik.touched.name && Boolean(registerFormik.errors.name)}
											helperText={registerFormik.touched.name && registerFormik.errors.name}
											label={localizedText.name} 
											size='small'
										/>
									</div>														
									<div>
										<CustomTextField
											type='text'
											id='email'
											name='email'
											value={registerFormik.values.email}
											onChange={(e) => {
												if (registerErrorState !== null) {
													setRegisterErrorState(null)
												}
												registerFormik.handleChange(e)
											}}
											error={registerFormik.touched.email && Boolean(registerFormik.errors.email)}
											helperText={registerFormik.touched.email && registerFormik.errors.email}
											label={localizedText.email} 
											size='small'
										/>
									</div>		
									<div>
										<CustomTextField
											type='tel'
											id='phone'
											name='phone'
											value={registerFormik.values.phone}
											onChange={(e) => {
												if (registerErrorState !== null) {
													setRegisterErrorState(null)
												}
												registerFormik.handleChange(e)
											}}
											error={registerFormik.touched.phone && Boolean(registerFormik.errors.phone)}
											helperText={registerFormik.touched.phone && registerFormik.errors.phone}
											label={localizedText.phone} 
											size='small'
										/>
									</div>																												
								</div>																
								<Button 
									type='submit'
									disabled={registerSubmitState}
									sx={{
										alignSelf: 'center',
										width: '216px', 
										height: '50px', 
										fontSize: '18px'
									}} 
									size='large' 
									variant="contained"
								>
									{localizedText.submit}
								</Button>
							</div>	
						</form>	
					</div>					
				}		
			</Paper>	
		</Dialog>	
	)	
}	