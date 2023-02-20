import { css, cx } from '@emotion/css'
import { useState, useContext, useEffect } from 'react'
import roboto from '../../lib/modules/variableFont.js'
import Link from 'next/link'
import subHeader from '../../lib/modules/styles/subHeader.js'
import Image from 'next/image'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router'
import currencyFormat from '../../lib/modules/currencyFormat.js'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'	

const pages = ['orders', 'info']

const breakpoints = [1374, 555]

const title = css`
  width: calc(100% - 10px);
  display: flex;
  color: white;
  background-color: black;
  height: 35px;
  align-items: center;
  padding-left: 10px;
  font-size: 20px;
	z-index: 1;
`

const scaleRate = 0.75

const itemRow = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	border-bottom: 2px solid white;
	width: 450px;
	font-size: 20px;
	@media (max-width: 480px) {
		width: ${450 * scaleRate}px;
		font-size: ${20 * scaleRate}px;
	}
`

const imgContainer = css`
	position: relative;
	width: 150px;
	height: 150px;
	margin-left: 10px;
	top: -8px;
	@media (max-width) {
		width: ${150 * scaleRate}px;
		height: ${150 * scaleRate}px;
		margin-left: ${10 * scaleRate}px;
		top: -${8 * scaleRate}px
	}
`

const specs = css`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	color: #000000a3;
	font-weight: 200;
	font-size: 17px;
	flex-grow: 1;
	@media (max-width: 480px) {
		font-size: ${17 * scaleRate}px;
	}
`

export default function Account({ pageIndex, pageNames, orders, info, setFooterState }) {

  useEffect(() => {
    setFooterState(true)
  }, [])

	const [ordersState, setOrdersState] = useState(null)

  const router = useRouter()

  const date = new Date()

  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc2ODI0ODMwLCJleHAiOjE2Nzk0MTY4MzB9.mT58Jp5DPxdV242tRnNrN3V75L9nzUBh9DjMZ1hwWpg'

	useEffect(() => {(async () => {
		const res = await fetch(`/api/getOrders?locale=${router.locale}&token=${jwt}`)
		const parsedRest = await res.json()
		setOrdersState(parsedRes)
	})()}, [router.locale])

	const matches = useMediaQuery(`(min-width: ${breakpoints[1]}px)`)

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
		`}>

			<div className={subHeader}>
				{pageNames[pageIndex].toUpperCase()}
			</div>

			<div className={css`
				display: flex;
				flex-direction: row;
			`}>
				{matches &&
					<div className={css`
						margin-top: 31px;
						width: 200px;
						min-width: 200px;
						border-right: 2px solid black;
						height: 150px;
						padding-left: 112px;
						padding-top: 10px;
						@media (max-width: 787px) {
							padding-left: 56px;
						}
					`}>
						{pages.map((page, index) => (
							<div key={index} className={css`
								text-decoration: ${pageIndex === index ? 'underline' : 'none'};
								text-underline-offset: 4px;
								margin-bottom: 20px;
								cursor: pointer;
								&:hover {
									text-decoration: underline;

								}
							`}>
								<Link href={`/info/${pages[index]}`} className={css`
									text-decoration: none;
									color: black;
								`}>
									{pageNames[index]}
								</Link>	
							</div>
						))}
					</div>
				}	

				<div className={css`
					margin-top: 30px;
					flex-grow: 1;
					padding-left: 30px;
					padding-right: 30px;
					min-height: calc(100vh - 35px - 59px);
				`}>
					{
						pageIndex === 0 && ordersState &&
							<Orders localization={orders} ordersList={ordersState} />
						|| pageIndex === 1 &&
							<Info localization={info} />	
					}
				</div>

			</div>

		</div>	
	)

}

function Orders({localization, ordersList}) {
	const paragraph = css`
		margin-bottom: 0px;
		margin-top: 10px;
	`

	return (
		<div className={css`
			max-width: 1100px;
		`}>
			{ordersList.map((order, index) => (
				<Accordion>
	        <AccordionSummary
	          expandIcon={<ExpandMoreIcon />}
	        >
	        	<div className={css`
	        		display: flex;
	        		flex-direction: row;
	        		justify-content: space-around;
	        		width: 100%;
	        	`}>
	        		<div>
	        			{order.date}
	        		</div>
	        		<div>
	        			{order.items.join(', ')}
	        		</div>       
	        		<div>
	        			{order.cost}
	        		</div>    	  
	        		<div>
	        			{order.status}
	        		</div>    	        		      		 		
	        	</div>
	        </AccordionSummary>
	        <AccordionDetails sx={{padding: '0px 0px 0px 0px'}}>
	        	{order.items.map((item, index) => (
							<Paper key={index}>
								<div className={itemRow}>
									<div className={css`
										display: flex;
										flex-direction: row;
										justify-content: flex-end;
										width: 100%;
									`}>
									</div>

									<div className={css`
										display: flex;
										flex-direction: row;
										width: 100%;
										column-gap: 10px;
										@media (max-width: 480px) {
											column-gap: ${10 * scaleRate}px;
										}
									`}>												
										<div className={imgContainer}>
											<Link href={`/products/${item.type}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}`}>
												<Image
													src={`/products/${item.type}/${item.name.toLowerCase().replace(/[\s-]/g, '_')}/item0.jpg`} 
													fill={true} 
													style={{objectFit: 'contain'}}
													sizes={`(max-width: 480px) ${143 * scaleRate}px, 143px`}
												/>
											</Link>	
										</div>	
										<div className={css`
											display: flex;
											flex-direction: column;
											width: calc(100% - 150px);
											@media (max-width: 480px) {
												width: calc((100% - 150px) * ${scaleRate});
											}
										`}>
											<div className={css`
												display: flex;
												flex-direction: row;
											`}>
												<div className={itemName}>
													{item.name}	
												</div>
											</div>
											<div className={specs}>
												<div>
													{`${ordersState[index].desc.toLowerCase()}`}
												</div>
											</div>	
										</div>
									</div>								
									<div className={css`
										display: flex;
										flex-direction: row;
										width: 100%;
										justify-content: space-between;
									`}>
										<div className={amount}>
											{`${item.amount} ${localizedText.units.quantity}.`}
										</div>										
										<div className={cost}>
											{ordersState[index].price}
										</div>		
									</div>
								</div>	
							</Paper>	   
						))}	     
	        </AccordionDetails>
	      </Accordion>	
	    ))}
		</div>
	)
}

function Info({localization}) {

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
			row-gap: 15px;
			margin-top: 31px;
			padding-left: 148px;
			@media (max-width: 787px) {
				padding-left: 0px;			
			}
		`}>
			<div className={css`
				display: flex;
				flex-direction: row;
			`}>
				<div className={css`margin-right: 5px;`}> {`${localization[0]}:`} </div> <a href='tel:+37368077331' className={css`color: black; text-underline-offset: 4px;`}> +37368077331 </a>
			</div>	
			<div className={css`
				display: flex; 
				flex-direction: row;
			`}>
				<div className={css`
					margin-right: 5px;`
				}> E-mail:</div> <a href='mailto: daklumina@gmail.com' className={css`color: black; text-underline-offset: 4px;`}> daklumina@gmail.com </a>
			</div>	
			<div className={css`
				display: flex; 
				flex-direction: row;
			`}>
				<div className={css`
					margin-right: 5px;`
				}> {`${localization[1]}: ${localization[2]}`} </div>
			</div>				
		</div>
	)
}

export async function getStaticProps({ locale, params }) {
	const fs = require('fs')

	const localizedText = JSON.parse(fs.readFileSync(`json/localization/${locale}/account.json`))	

	const pageIndex = pages.indexOf(params.page) 

	return {
		props: { pageIndex, ...localizedText }
	}
}

export async function getStaticPaths({ locales }) {

	const paths = []

	for (const locale of locales) {
		if (locale === 'default') {
			continue
		}
		for (const page of pages) {
			paths.push({ 'params': { page: page }, 'locale': locale })
		}	
	}

	return {
		paths: paths,
		fallback: false
	}
}
