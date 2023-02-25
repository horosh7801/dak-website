import { useState, useContext, useEffect } from 'react'
import { css, cx } from '@emotion/css'
import subHeader from '../lib/modules/styles/subHeader.js'
import Paper from '@mui/material/Paper'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function ShoppingCart({ setFooterState }) {

	useEffect(() => {
		setFooterState(true)
	}, [])

	return (
		<div className={css`
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
		`}>
			<div className={subHeader}>
				LOGIN
			</div>
				<Paper sx={{minHeight: '500px', minWidth: '200px', marginTop: '20px'}}>
					<div className={css`
						display: flex;
						flex-direction: column;
						row-gap: 15px;
					`}>

					</div>
				</Paper>
		</div>
	)
}