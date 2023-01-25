export default async function handler(req, res) {

	const { secret, item, type, locale, page } = req.query

	if (secret !== process.env.REVALIDATION_TOKEN) {
		return res.status(401).json({ message: 'Invalid token' })
	}

	if (page === 'item') {
		try {
	  	await res.revalidate(`/${locale}/products/${type}/${item}`)
	    return res.json({ revalidated: true })

	  } catch (err) {
	  	console.log(err)
	    return res.status(500).send({error: 'Error revalidating'})
	  }			
	}

	if (page === 'index') {
		try {
	    await res.revalidate(`/${locale}`)
	    return res.json({ revalidated: true })

	  } catch (err) {
	    console.log(err)
	     return res.status(500).send({error: 'Error revalidating'})
	  }					
	}

}