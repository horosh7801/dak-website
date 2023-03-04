import fetch from 'node-fetch'
import { setCookie, getCookie } from 'cookies-next'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

const url = 'http://127.0.0.1:1337/api/auth/local/register'

const schema = yup.object({
	email: yup
		.string()
		.min(6)
		.email()
		.required(),
  phone: yup
    .string()
    .matches(/[0-9]/)
    .required(),
  name: yup
  	.string()
  	.transform(value => !value ? null : value)
  	.matches(/[A-Za-z]/)
  	.nullable(),    
	password: yup
		.string()
    .min(8)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1)
		.required(),			
})

export default async function handler(req, res) {

	const { credentials } = req.query
	try{
		const validatedCredentials = schema.validateSync(credentials, {stripUnknown: true})
		console.log(validatedCredentials)
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
					email: validatedCredentials.email, 
					username: validatedCredentials.email, 
					password: validatedCredentials.password,
					name: validatedCredentials.name,
					phone: validatedCredentials.phone
			}),
			headers: {
					'Content-Type': 'application/json',
					'Authorization': `bearer ${process.env.AUTH_TOKEN}`,
				},

		});
		const data = await response.json();
		if (response.status === 200) {
			setCookie('user_token', data.jwt, {req, res, maxAge: 3600*24*30 - 60})
			res.status(200).send()				
		} else {
			res.status(response.status).send()
		//	res.status(500).send()
		}
		
	} catch (err) {
		console.log(err)
		res.status(500).send()
	}	
}