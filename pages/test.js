import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

export default function Test() {

	return (

		<FormControl>
			<RadioGroup>
				<FormControlLabel control={<Radio />} label='Подвесные' />
			</RadioGroup>
		</FormControl>

	)
}