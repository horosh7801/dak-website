import fetch from 'node-fetch'
import { setCookie } from 'cookies-next'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

const url = 'http://127.0.0.1:1337/api/auth/local'

const schema = yup.object({
	email: yup
		.string()
		.email()
		.required(),
	password: yup
		.string()
		.required(),	
})

export default function handler(req, res) {

	const { credentials } = req.query;
	(async () => {
		try{
			const validatedCredentials = schema.validateSync(credentials, {stripUnknown: true})
			const response = await fetch(url, {
				method: 'post',
				body: JSON.stringify({identifier: credentials.email, password: credentials.password}),
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