export default async function handler(req, res) {

	const { secret, item, type } = req.query

	if (secret !== process.env.REVALIDATION_TOKEN) {
		return res.status(401).json({ message: 'Invalid token' })
	}
 try {
      await res.revalidate(`/products/${type}/${item}`)
      return res.json({ revalidated: true })

    } catch (err) {
    	console.log(err)
      return res.status(500).send({error: 'Error revalidating'})
    }	
}