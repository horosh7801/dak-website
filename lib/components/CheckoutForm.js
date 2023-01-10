import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper'
import { css, cx } from '@emotion/css'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useRef, useEffect, useState } from 'react'

const totalCostContainer = css`
	font-size: 30px;
	align-self: flex-start;
	margin-top: 20px;
	margin-left: 38px;
`

export default function CheckoutForm({ totalCost, currency, localizedText, items, shoppingCart, onSuccess }) {

	const [validationSchemaState, setValidationSchemaState] = useState()

	useEffect(() => {
		formik.resetForm()
		setValidationSchemaState(yup.object({
		  email: yup
		    .string()
		    .email(localizedText.formValidation.email),
		  phone: yup
		    .string()
		    .required(localizedText.formValidation.phone),
		  name: yup
		  	.string()
		  	.required(localizedText.formValidation.name)  
		}))
	}, [localizedText])

	const formik = useFormik({
		initialValues: {
			phone: '',
			name: '',
			email: '',
		},
		validationSchema: validationSchemaState,
		onSubmit: async (values) => {
			console.log(items)
			const order = {...values, item: items}
			const res = await fetch(`/api/placeOrder?order=${JSON.stringify(order)}`)
			if (res.status === 200) {
				onSuccess()
			}
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={css`
				display: flex;
				flex-direction: column;
				align-items: left;
				flex-grow: 1;
				position: sticky;
				top: 47px;
				height: calc(100vh - 80px);
				row-gap: 20px;
			`}>
				<div className={totalCostContainer}>
					{`${localizedText.totalCost}: ${totalCost} ${currency}`}
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
							id='phone'
							name='phone'
							value={formik.values.phone}
							onChange={formik.handleChange}
							error={formik.touched.phone && Boolean(formik.errors.phone)}
							helperText={formik.touched.phone && formik.errors.phone}
							label={localizedText.phone} 
							size='small'
							sx={{
								width: '200px',
											
							}}/>
					</div>		
					<div>
						<TextField
							type='text'
							id='name'
							name='name'
							value={formik.values.name}
							onChange={formik.handleChange}	
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}													
							label={localizedText.name}
							size='small'
							sx={{
								width: '200px',
									
						}}/>
					</div>		
					<div>
						<TextField
							type='text'
							id='email'
							name='email'
							value={formik.values.email}
							onChange={formik.handleChange}		
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}												
							label={localizedText.email}
							size='small'
							sx={{
								width: '200px',
														
						}}/>
					</div>		
				</div>																
				<Button 
					type='submit'
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
	)	
}	