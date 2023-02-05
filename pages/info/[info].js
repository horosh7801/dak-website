import { css, cx } from '@emotion/css'
import { useState, useContext, useEffect } from 'react'
import roboto from '../../lib/modules/variableFont.js'
import Link from 'next/link'
import subHeader from '../../lib/modules/styles/subHeader.js'
import Image from 'next/image'
import useMediaQuery from '@mui/material/useMediaQuery'

const pages = ['about', 'contacts', 'delivery', 'colors']

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

export default function Info({ pageIndex, pageNames, about, contacts, delivery }) {

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
						pageIndex === 0 &&
							<About localization={about} />
						|| pageIndex === 1 &&
							<Contacts localization={contacts} />
						|| pageIndex === 2 &&
							<Delivery localization={delivery} />	
						|| pageIndex === 3 &&
							<Colors />		
					}
				</div>

			</div>

		</div>	
	)

}

function About({localization}) {
console.log(localization)
	const paragraph = css`
		margin-bottom: 0px;
		margin-top: 10px;
	`

	return (
		<div className={css`
			max-width: 1100px;
		`}>
			<p className={css`margin-top: 0px;`}> DAK LUMINA </p>
			<p> {localization[0]} </p>
			<p>  {localization[1]} </p>
			<div>	
				<p>{localization[2]}</p>
				<p>{localization[3]}</p>
				<p>{localization[4]}</p>
				<p>{localization[5]}</p>
			</div>
		</div>
	)
}

function Contacts({localization}) {

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
			row-gap: 15px;
			margin-top: 31px;
			padding-left: 148px;
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

function Delivery({localization}) {

	const regionText = css`
		margin-left: 20px;
	`

	const deliveryDescription = css`
		margin-left: 10px;
	`

	const rowContainer = css`
		display: flex;
		flex-direction: row;
		margin-top: 20px;

	`

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
			max-width: 1100px;
		`}>
			<div> {localization['delivery']} </div>
			<div className={rowContainer}>
				<div className={regionText}> {`${localization['russia']}:`} </div>
				<div className={deliveryDescription}> {localization['russiaDesc']} </div>
			</div>
			<div className={rowContainer}>
				<div className={regionText}> {`${localization['europe']}:`} </div>
				<div className={deliveryDescription}> {localization['europeDesc']} </div>
			</div>			
			<div className={css`
				margin-top: 40px;
			`}> {localization['payment']} </div>
			<div className={css`margin-left: 20px; margin-top: 15px;`}> {localization['paymentDesc']} </div>	

		</div>
	)
}

function Colors() {

	const colors = ['Peanut', 'Smoke', 'Black_charcoal', 'Natural', 'Dark_chocolate', 'Caramel', 'Honey', 'Brown', 'Walnut']

	const scaleRate = 0.8
	const imgBaseWidth = 280
	const imgBaseHeight = 280

	const imgSize = 500

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 100px;
		`}>
			<div className={css`
		    display: flex;
		    flex-direction: row;
		    flex-wrap: wrap;
		    justify-content: flex-start;
		    gap: 20px;
		    width: 1180px;
		    justify-self: center;
		    @media (max-width: 1457px) {
		    	width: 880px;
		    }
		    @media (max-width: 1157px) {
		    	width: 580px;
		    }
		    @media (max-width: 857px) {
		    	width: 468px;
		    }
		    @media (max-width: 745px) {
		    	width: 224px;
		    }
			`}>
				{colors.map((color, index) => (
					<div className={css`
						display: flex;
						flex-direction: column;
						align-items: center;
						row-gap: 10px;
					`}>
						<div className={css`
							position: relative;
							width: ${imgBaseWidth}px;
							height: ${imgBaseHeight}px;
							overflow: hidden;
							@media (max-width: 857px) {
								width: ${imgBaseWidth * scaleRate}px;
								height: ${imgBaseHeight * scaleRate}px;
							}
						`}>
							<Image    	
		           	style={{objectFit: 'cover'}} 
	              src={`/colors/${color}.jpg`} 
	              fill={true}
	              sizes={`(max-width: 857px) ${imgSize * scaleRate}`, `${imgSize}px`}
	              quality={100}
	            />
						</div>	
						<div className={css`
							font-size: 20px;
						`}>
							{color.replace('_', ' ').toUpperCase()}
						</div>
					</div>
				))}

			</div>
		</div>	
	)
}

export async function getStaticProps({ locale, params }) {
	const fs = require('fs')

	const localizedText = JSON.parse(fs.readFileSync(`json/localization/${locale}/info.json`))	

	const pageIndex = pages.indexOf(params.info) 

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
			paths.push({ 'params': { info: page }, 'locale': locale })
		}	
	}

	return {
		paths: paths,
		fallback: false
	}
}
