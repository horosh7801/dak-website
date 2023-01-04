import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import lampImage1 from '../public/featured_products/wave.jpg'
import lampImage2 from '../public/featured_products/venera.jpg'
import lampImage3 from '../public/featured_products/snake.jpg'
import { cx, css } from '@emotion/css'
//import Button from '../lib/components/Button.js'
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useState, useEffect, useContext } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import LanguageContext from '../lib/context/language.js'
import LocaleContext from '../lib/context/locale.js'
import setCurrency from '../lib/modules/setCurrency.js'


const carouselHeight = 600;

const mainWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const carousel = css`
  display: flex;
  justify-content: center;
  background-color: #dfdfdf;
`

const productTypes = css`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-around;
  width: 1150px;
  border-bottom: 1px solid black;
  padding-bottom: 42px;  
`
const featuredProductsTitle = css`
  color: black;
  font-size: 30px;
  font-weight: 450;
  font-stretch: 55%;
  margin-bottom: 25px;
` 

const katalogButton = css`
  font-size: 29px;
  font-weight: 250;
  margin-bottom: 20px;
`

const imageSet = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`

const imageSetItem = css`
  width: 1024px;
  height: 380px;
  position: relative;
  overflow: hidden;
  margin-bottom: 6px;
  transition: 0.1s;
  &:hover {
    opacity: 0.9;
  }
` 

const imageSetRow = css`
  display: flex;
  flex-direction: row;
`

const imageSetItem1 = css`
  margin-right: 6px;
  position: relative;
  transition: 0.1s;
  &:hover {
    opacity: 0.9;
  }
`

const imageCaption = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 140px;
  background-color: #0000008f;
  top: 250px;
  color: white;
  font-size: 33px;
`

const imageCaptionText = css`
  margin-left: 10px;
`

export default function Home({ items, localizedText }) {

  const language = useContext(LanguageContext)

  return (
    <div className={mainWrapper}>
      <div className={imageSet}>
        <div className={imageSetItem}>
          <Image style={{width: 1024, height: 'auto', position: 'absolute', top: -48}} src={lampImage1} />
          <div className={cx(imageCaption, css`height: 160px; top: 230px`)}>
            <div className={cx(css`font-weight: 700; font-size: 45px;`, imageCaptionText)}>
              DAK
            </div>
            <div className={imageCaptionText}>
              {
                localizedText.imageSet.about
              }
            </div>
          </div>
        </div>
        <div className={imageSetRow}>
          <div className={imageSetItem1}>
            <Image style={{width: 509, height: 'auto',}} src={lampImage2} />
            <div className={cx(imageCaption, css`height: 110px; top: 228px;`)}>
              <div className={cx(imageCaptionText, css`font-size: 30px;`)}>
                {
                  localizedText.imageSet.contactInfo
                }
              </div>            
            </div>
          </div>
          <div className={css`position: relative; transition: 0.1s; &:hover {opacity: 0.9;}`}>
            <Image style={{width: 509, height: 'auto',}} src={lampImage3} />
            <div className={cx(imageCaption, css`height: 110px; top: 228px;`)}>
              <div className={cx(imageCaptionText, css`font-size: 30px;`)}>
                {
                  localizedText.imageSet.paymentDelivery
                }
              </div>
            </div>            
          </div>          
        </div>  
      </div>  
      <Catalog items={items} localizedText={localizedText}/>
      <div className={css`height: 500px;`}>
      </div>
    </div>  
  )
}


function Slide({ img, title, txt }) {

  const slide = css`
    position: relative;
    overflow: hidden;
    height: ${carouselHeight}px;   
  `

  const slideTitle = css`
    margin-bottom: 6px;
    color: white;
    font-size: 70px;
    font-weight: 795;
    font-variation-settings: "wdth" 151, "GRAD" -200, "YOPQ" 85, "YTUC" 760;  
  `

  const slideText = css`
    text-align: left;
    position: absolute;
    color: white;
    top: 163px;
    left: 100px;
    font-size: 40px;
    font-weight: 250;
    width: 827px;
  `

  return (
    <div className={slide}>
      <Image className='slideImage' src={img} />  
      <div className={slideText}>
        <div className={slideTitle}>
          {title}
        </div>
        <div>
          {txt}
        </div>
      </div>       
    </div>
  )
}

function ProductType({ type }) {
  let title
  switch (type) {
    case 'ceiling':
      title = 'ПОДВЕСНЫЕ'
      break
    case 'floor':
        title = 'НАПОЛЬНЫЕ'
        break
    case 'singular':
      title = 'ТОЧЕЧНЫЕ'
      break
    case 'wall':
      title = 'НАСТЕННЫЕ'
      break
    case 'wall3D':
      title = 'НАСТЕННЫЕ 3D'
      break
    case 'mirror':
      title = 'ЗЕРКАЛА'
      break          
  }

  const wrapper = css`
    display:flex;
    flex-direction: column;
    align-items: center;
  `

  const button = css`
    border: 1px solid white;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 33px;
    background-color: black;
    color: white;
    font-size: 15px;
    vertical-align: center;
    transition: 0.2s;
    &:hover {
      background-color: white;
      border: 1px solid black;
      color: black; 
    }  
  `

  return (
    <div className={wrapper}>
      <Image src={`/${type}Type.png`} height={70} width={70} />
      <div className={button}>
        <div>
          {title}
        </div> 
      </div>
    </div>
  )  
}

function ProductItem({ name, priceRUB, url, type}) {
  const productItem = css`
    box-shadow: 0px 0px 4px -1px;
    width: 320px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    color: black;
    border-radius: 2px;
    &:hover {
      transform: scale(1.06, 1.06);
      transition: 0.1s;
      z-index: 1;
      cursor: pointer;
    }      
  `

  const imageWrapper = css`
    position: relative;
    width: 280px;
    height: 280px;   
  `

  const itemName = css`
  `

  const itemPrice = css`
    font-size: 30px;
    font-weight: 500;
  `

  const textWrapper = css`
    border-top: 2px solid black;
    width: 160px;
    font-size: 24px;
    font-weight: 441;
    font-stretch: 35%;   
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
  `

  return (
    <Link style={{textDecoration: 'none'}} href={`/products/${type}/${url.split('/')[3].split('.jpg')[0]}`}>
      <div className={productItem}>
        <div className={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          padding-top: 10px;
        `}>
          <div className={imageWrapper}>
            <Image style={{objectFit: 'contain'}} src={url} fill={true} />
          </div> 
        </div>  
        <div className={css`
          width: 100%;
          background-color: black;
          display: flex;
          justify-content: center;
        `}>
          <div className={textWrapper}>
            <div className={itemName}>
              {name}
            </div>
            <div className={itemPrice}>
              {priceRUB}
            </div>
          </div>
        </div>  
      </div>  
    </Link>  
  )
}

function Catalog ({ items, localizedText }) {

  const [catalogState, setCatalogState] = useState('ceiling')

  const language = useContext(LanguageContext)

  const locale = useContext(LocaleContext)

  const catalog = css`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
  `

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

  const productsListWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  `

  const productsList = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    width: 1310px;
    margin-bottom: 30px;
    gap: 10px;
    padding-top: 10px;
  `

  return (
    <div className={catalog}>
        <div id='catalog' className={css`
          position: relative;
          top: -46px;
        `}></div> 
      <div className={title}>
        {
          localizedText.catalog.catalog
        }
      </div>
      <ToggleButtonGroup
        className={css`font-weight: 500;`}
        exclusive
        sx={{
          '& button.MuiButtonBase-root.MuiToggleButton-root.Mui-selected.MuiToggleButton-sizeMedium.MuiToggleButton-standard.MuiToggleButtonGroup-grouped.MuiToggleButtonGroup-groupedHorizontal.css-ueukts-MuiButtonBase-root-MuiToggleButton-root': {
            backgroundColor: 'black',
            color: 'white',
          },
          '& .css-ueukts-MuiButtonBase-root-MuiToggleButton-root': {
            borderRadius: 0
          },
        }}
        value={catalogState}  
        onChange={(event) => {
          setCatalogState(event.target.value)
        }}
      >
        <ToggleButton value='ceiling'>
          {
            localizedText.catalog.ceiling
          }
        </ToggleButton>
        <ToggleButton value='floor'>
          {
            localizedText.catalog.floor
          }
        </ToggleButton>
        <ToggleButton value='wall'>
          {
            localizedText.catalog.wall
          }
        </ToggleButton>
        <ToggleButton value='point'>
          {
            localizedText.catalog.point
          }
        </ToggleButton>
        <ToggleButton value='wall3d'>
          {
            localizedText.catalog.wall3d
          }
        </ToggleButton>
        <ToggleButton value='mirror'>
          {
            localizedText.catalog.mirrors
          }
        </ToggleButton>                                        
      </ToggleButtonGroup>

      <div className={productsListWrapper}>
        <div className={productsList}>
          {items[catalogState].map((item, i) => (<ProductItem
            type={catalogState} 
            name={item['name']} 
            priceRUB={`${Math.round(item['priceRUB'] * locale.localeState.rate)} ${locale.localeState.currency}`} 
            url={item['img']} 
            key={i} 
          /> ))}
        </div>
      </div>     
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const fs = require('fs');

  const localizedText = JSON.parse(fs.readFileSync(`json/localization/${locale}/index.json`))

  const items = {ceiling: [], floor: [], wall: [], point: [], wall3d: [], mirror: []}
  for (const itemType in items) {
    try {
      const data = fs.readFileSync(`json/${itemType}.json`, 'utf8')
      const productItems = JSON.parse(data)
      items[itemType] = productItems
    } catch (err) {
      console.log(err)
    }
  }
  return {
    props: { items, localizedText }
  }  
}