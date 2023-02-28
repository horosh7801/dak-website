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

export default function AuthenticationForm({ localizedText, onSuccess }) {

	const [loginSchemaState, setLoginSchemaState] = useState()
	const [registerSchemaState, setRegisterSchemaState] = useState()

	const [loginErrorState, setLoginErrorState] = useState(null)
	const [registerErrorState, setRegisterErrorState] = useState(null)

	const [state, setState] = useState(false)

	const [loginSubmitState, setLoginSubmitState] = useState(false)
	const [registerSubmitState, setRegisterSubmitState] = useState(false)

	useEffect(() => {
		loginFormik.resetForm()
		setLoginSchemaState(yup.object({
		  email: yup
		    .string()
		    .email(localizedText.validation.emailChar)
		    .required(localizedText.validation.email),
		  password: yup
		    .string()
		    .required(localizedText.validation.password),
		}))
	}, [localizedText])

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
		  	.matches(/[A-Za-z]/, localizedText.validation.nameChar),
		  password: yup
		    .string()
		    .min(8, localizedText.min)
		    .minLowercase(1, localizedText.minLowercase)
		    .minUppercase(1, localizedText.minUppercase)
		    .minNumbers(1, localizedText.minNumbers)
		    .minSymbols(1, localizedText.minSymbols)
		    .required(localizedText.validation.password),	
		  confirm_password: yup
		  	.string()
		  	.oneOf([yup.ref('password'), null], localizedText.validation.confirm_password)
		  	.required(localizedText.validation.password),
		}))					
	}, [localizedText])

	const loginFormik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: loginSchemaState,
		onSubmit: async (values) => {
			setLoginSubmitState(true)
			const res = await fetch(`/api/auth?credentials=${JSON.stringify(values)}`)
			console.log(res)
			if (res.ok) {
				onSuccess()
			} else if (res.status === 400) {
				setLoginErrorState(localizedText.error1)
			} else {
				setLoginErrorState(localizedText.error2)
//				onFailure()
			}
			loginFormik.resetForm()
			setLoginSubmitState(false)
		}
	})

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
			const res = await fetch(`/api/register?credentials=${JSON.stringify(values)}`)
			if (res.ok) {
				onSuccess()
			} else if (res.status === 400) {
				setRegisterErrorState(localizedText.error3)
			} else {
				setRegisterErrorState(localizedText.error2)
//				onFailure()
			}
			registerFormik.resetForm()
			setRegisterSubmitState(false)
		}
	})

	return (
		<Paper sx={{
			marginTop: '50px', 
			minWidth: '216px', 
			minHeight: '228px',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center' 
		}}>
			<div className={css`
				display: flex;
				flex-direction: column;
				align-items: center;
				row-gap: 10px;
			`}>
				<div onClick={() => {setState(!state)}} className={css`
					display: flex;
					flex-direction: row;
					align-items: center;
					align-self: flex-start;
					transform: scale(0.88);	
					cursor: pointer;				
				`}>
					<ArrowBackIcon />
					<div className={css`
						text-decoration: underline;
					`}>
						{!state ? localizedText['register'] : localizedText['login']}
					</div>
				</div>
				<div className={css`
				`}>
					{state ? localizedText['register'] : localizedText['login']}
				</div>
				{!state &&
					<form onSubmit={loginFormik.handleSubmit}>
						<div className={css`
							display: flex;
							flex-direction: column;
							align-items: left;
							flex-grow: 1;
							row-gap: 20px;
						`}>
							<div className={css`
								display: flex;
								flex-direction: column;
								align-items: center;
								row-gap: 15px;
							`}>
								{loginErrorState &&
									<div className={errorText}>
										{loginErrorState}
									</div>
								}
								<div>
									<CustomTextField
										type='text'
										id='email'
										name='email'
										value={loginFormik.values.email}
										onChange={(e) => {
											if (loginErrorState !== null) {
												setLoginErrorState(null)
											}
											loginFormik.handleChange(e)
										}}
										error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
										helperText={loginFormik.touched.email && loginFormik.errors.email}
										label={localizedText.email} 
										size='small'
										sx={{
											width: '200px',
														
										}}/>
								</div>		
								<div>
									<CustomTextField
										FormHelperTextProps={{className: roboto}}
										type='password'
										id='password'
										name='password'
										value={loginFormik.values.password}
										onChange={(e) => {
											if (loginErrorState !== null) {
												setLoginErrorState(null)
											}
											loginFormik.handleChange(e)
										}}	
										error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
										helperText={loginFormik.touched.password && loginFormik.errors.password}													
										label={localizedText.password}
										size='small'
										sx={{
											width: '200px',
												
									}}/>
								</div>			
							</div>																
							<Button 
								type='submit'
								disabled={loginSubmitState}
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
					||
					<form onSubmit={registerFormik.handleSubmit}>
						<div className={css`
							display: flex;
							flex-direction: column;
							align-items: center;
							flex-grow: 1;
							row-gap: 20px;
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
										sx={{
											width: '200px',
														
										}}/>
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
										sx={{
											width: '200px',
														
										}}/>
								</div>			
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
										sx={{
											width: '200px',
														
										}}/>
								</div>															
								<div>
									<CustomTextField
										type='password'
										id='password'
										name='password'
										value={registerFormik.values.password}
										onChange={(e) => {
											if (registerErrorState !== null) {
												setRegisterErrorState(null)
											}
											registerFormik.handleChange(e)
										}}	
										error={registerFormik.touched.password && Boolean(registerFormik.errors.password)}
										helperText={registerFormik.touched.password && registerFormik.errors.password}													
										label={localizedText.password}
										size='small'
										sx={{
											width: '200px',
												
									}}/>
								</div>			
								<div>
									<CustomTextField
										type='password'
										id='confirm_password'
										name='confirm_password'
										value={registerFormik.values.confirm_password}
										onChange={(e) => {
											if (registerErrorState !== null) {
												setRegisterErrorState(null)
											}
											registerFormik.handleChange(e)
										}}	
										error={registerFormik.touched.confirm_password && Boolean(registerFormik.errors.confirm_password)}
										helperText={registerFormik.touched.confirm_password && registerFormik.errors.confirm_password}													
										label={localizedText.confirm_password}
										size='small'
										sx={{
											width: '200px',
												
									}}/>
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
				}	
			</div>	
		</Paper>	
	)	
}	