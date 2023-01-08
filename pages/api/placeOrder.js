import fetch from 'node-fetch'

const token = '4dae396ee347c5878279ce87babd7cf7f6ce5345e5c223e9e5e0b065d6560bef20899296c5b1ff62a862db954e596f1f72a02d4009d6b8611c26aa101be4e71b8fd15f027bd940362eeef1ed3e6f3d82733cc480acc3d00fd193587d7b424b01de9da13fabdfeb5b61f735ed8a70f5a9977413d0036b6c3f5befc55c7484cd14';

export default async function handler(req, res) {
			const resp = await fetch('http://127.0.0.1:1337/api/orders', {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `bearer ${token}`}, 
				body: JSON.stringify({
					data: {					
						name: "Oleg", 
						phone: 88005553535,
						email: 'lox@gmail.com',
						date: new Date().getTime(),
						date: 101010,
						item: {name: 'snake', length: 160, quantity: 1}
					}
				})
			})
		const parsedRes = await resp.json()
		console.log(parsedRes)

}

