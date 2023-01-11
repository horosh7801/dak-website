//import * as yup from 'yup'

const yup = require('yup')

const schema = yup.array().of(yup.object({
	name: yup
		.string()
		.matches(/[A-Za-z0-9_]/)
		.required(),
	length: yup
		.number()
		.integer()
		.required(),
	amount: yup
		.number()
		.integer()
		.required()		
})).min(1)

try 
	{schema.validateSync([{name: 'fwafwaf', amount: '1', length: 'wfawf', bl: 'blblbl'}], {stripUnknown: true})}
catch(err) {
	
}
