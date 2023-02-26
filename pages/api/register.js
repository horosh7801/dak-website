import fetch from 'node-fetch'
import { setCookie, getCookie } from 'cookies-next'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

const url = 'http://127.0.0.1:1337/auth/local/register'

const schema = yup.object({
	email: yup
		.string()
		.email()
		.required(),
  phone: yup
    .string()
    .matches(/[0-9]/)
    .required(),
  name: yup
  	.string()
  	.matches(/[A-Za-z]/)    
	password: yup
		.string()
		.password()
		.required(),			
})

export default function handler(req, res) {

	const { credentials } = req.query
	(async () => {
		try{
			const validatedCredentials = schema.validateSync(credentials, {stripUnknown: true})
			const token = getCookie('user_token', {req, res})
			const response = await fetch(url, {
				method: 'post',
				body: JSON.stringify({
					email: credentials.email, 
					username: credentials.email, 
					password: credentials.password
				}),
				headers: {
						'Content-Type': 'application/json',
						'Authorization': `bearer ${process.env.AUTH_TOKEN}`,
					},

			});

			if (response.status === 200) {
				const data = await response.json();
				setCookie('user_token', data.jwt, {req, res, maxAge: 3600*24*30 - 60})
				res.status(200).send()				
			} else {
				res.status(response.status).send()
			}
			
		} catch (err) {
			console.log(err)
			res.status(500).send()
		}	
	})()	
}