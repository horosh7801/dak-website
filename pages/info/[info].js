import { css, cx } from '@emotion/css'
import { useState, useContext, useEffect } from 'react'
import roboto from '../../lib/modules/variableFont.js'
import Link from 'next/link'

const pages = ['about', 'contacts', 'delivery']

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

export default function Info({ pageIndex, pageNames }) {

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
		`}>

			<div className={title}>
				{pageNames[pageIndex].toUpperCase()}
			</div>

			<div className={css`
				display: flex;
				flex-direction: row;
			`}>

				<div className={css`
					margin-top: 20px;
					margin-right: 30px;
					width: 200px;
					border-right: 2px solid black;
					height: 150px;
					padding-left: 15px;
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

				<div className={css`
					margin-top: 30px;
					width: 1100px;
				`}>
					{
						pageIndex === 0 &&
							<About />
						|| pageIndex === 1 &&
							<Contacts />
						|| pageIndex === 2 &&
							<Delivery />		
					}
				</div>

			</div>

		</div>	
	)

}

function About() {

	const paragraph = css`
		margin-bottom: 0px;
		margin-top: 10px;
	`

	return (
		<div>
			<p className={css`margin-top: 0px;`}> DAK LUMINA </p>
			<p> Компания занимается художественным проектированием и ручным изготовлением настенных, потолочных и напольных светильников высокого класса по мировым стандартам.  </p>
			<p>  Светильники DAK LUMINA - это изысканный стиль Вашего дома. Они легко и выгодно впишутся в любой интерьер. Добавят уют, колорит и подчеркнут достоинство помещения, не зависимо от его размеров и назначения, будь это квартира, дом, бильярдная, сауна, беседка, служебное помещение, концертный зал или офис.</p>
			<div>	
				<p>Каждое наше изделие уникально из-за не повторяющейся текстуры дерева, способов его обработки, а так же самой формы светильника.</p>
				<p>-  Для обработки поверхности дерева применяются современные европейские технологии с использованием итальянских материалов.</p>
				<p>-   При изготовлении светильников цветовая гамма обработки дерева Вашего бра, люстры, торшера или зеркала оговаривается заранее. На выбор в каталоге представлены 10 оттенков.</p>
				<p>Безусловно, цвет изделия и его форма должны гармонировать с дизайном Вашего помещения.</p>
			</div>
		</div>
	)
}

function Contacts() {

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
			row-gap: 8px;
		`}>
			<div className={css`margin-right: 5px;`}> Телефон:</div> <div></div>
			<div className={css`margin-right: 5px;`}> E-mail:</div> <div></div>
		</div>
	)
}

function Delivery() {

	return (
		<div className={css`
			display: flex;
			flex-direction: column;
		`}>
			<div> ДОСТАВКА </div>
			<div className={css`margin-left: 20px; margin-top: 15px;`}> Доставка осуществляется из Молдовы по Европе </div>
			<div className={css`
				margin-top: 40px;
			`}> ОПЛАТА </div>
			<div className={css`margin-left: 20px; margin-top: 15px;`}> Оплата осуществляется по карте. Перед оплатой свяжитесь с нами. </div>	

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
