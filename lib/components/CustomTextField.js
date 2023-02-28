import { css, cx } from '@emotion/css'
import TextField from '@mui/material/TextField'
import roboto from '../modules/variableFont.js'

export default function CustomTextField({
	type, 
	id, 
	name,
	value, 
	onChange, 
	error, 
	helperText, 
	label,
	size,
	sx,

}) {

	return(
		<div>
			<TextField
				FormHelperTextProps={{className: cx(roboto, css`font-size: 12.5px`)}}
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				error={error}
				helperText={helperText}
				label={label} 
				size={size || 'small'}
				sx={{
					width: '200px',
					...sx								
				}}/>
		</div>
	)
}