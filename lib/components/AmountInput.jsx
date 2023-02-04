import roboto from '../modules/variableFont.js'
import {css, cx} from '@emotion/css'
import MuiInput from '@mui/material/Input'

export default function AmountInput({localization, state, setState}) {
	return(
		<div className={css`
			margin-top: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			column-gap: 5px;
		`}>
			<div>
				{`${localization}:`}
			</div>
			<MuiInput
				className={cx(roboto, css`

					& .MuiInput-input {
						padding: 0px;
						text-align: center;
						 width: 45px;
					}
				`)}

				value={state}
				onChange={(event) => {
					let value
					if (event.target.value < 1) {
						value = 1
					} else if (event.target.value > 99) {
						value = 99
					} else {
						value = event.target.value
					}
					setState(value)
				}}
				inputProps={{
					type: 'number',
					min: 1,
					step: 1,
					max: 99
				}}
			/>
		</div>
	)	
}	