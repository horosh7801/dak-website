import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lampImage1 from '../public/featured_products/wave.jpg'
import lampImage2 from '../public/featured_products/venera.jpg'
import lampImage3 from '../public/featured_products/snake.jpg'
import { cx, css } from '@emotion/css'
//import Button from '../lib/components/Button.js'
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useState, useEffect, useContext, useRef } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import currencyFormat from '../lib/modules/currencyFormat.js'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'

const carouselHeight = 600;

const breakpoints = [1340, 1030, 890]

const mainWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
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
  max-width: 100%;
  @media (max-width: ${breakpoints[1]}px) {
    transform: scale(0.74);
    margin-top: -94px;
  }  
  @media (max-width: ${breakpoints[2]}px) {

  }
`

const imageSetItem = css`
  width: 1024px;
  height: 380px;
  position: relative;
  overflow: hidden;
  margin-bottom: 6px;
  transition: 0.1s;
  cursor: pointer;
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
  cursor: pointer;
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

export default function Home({ items, localizedText, catalogScroll }) {

  const catalogRef = useRef()

  const matches2 = useMediaQuery(`(min-width: ${breakpoints[2] + 1}px)`)

  const router = useRouter()

  useEffect(() => {
    if (catalogScroll.state === true) {
      catalogRef.current.scrollIntoView()
      catalogScroll.setState(false)
    }
  }, [catalogScroll.state])

  return (
    <div className={mainWrapper}>
      {matches2 && 
        <div className={imageSet}>
          <Link href={'/info/about'}>
            <div 
              className={imageSetItem}
            >
              <Image 
                style={{width: 1024, height: 'auto', position: 'absolute', top: -48}} 
                src={lampImage1} 
                sizes={`
                  (max-width: ${breakpoints[1]}px) 757.76px,
                  1024px
                `}
              />
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
        </Link>  
          <div className={imageSetRow}>
            <Link href='/info/contacts'>
              <div
                className={imageSetItem1}
              >
                <Image 
                  style={{width: 509, height: 'auto',}} 
                  src={lampImage2} 
                  sizes={`
                    (max-width: ${breakpoints[1]}px) 376.66px,
                    509px
                  `}                
                />

                <div className={cx(imageCaption, css`height: 110px; top: 228px;`)}>
                  <div className={cx(imageCaptionText, css`font-size: 30px;`)}>
                    {
                      localizedText.imageSet.contactInfo
                    }
                  </div>            
                </div>
              </div>
            </Link>  
            <Link href='/info/delivery'>
              <div 
                className={css`position: relative; transition: 0.1s; &:hover {opacity: 0.9;}; cursor: pointer;`}
              >
                <Image 
                  style={{width: 509, height: 'auto',}} 
                  src={lampImage3} 
                  sizes={`
                    (max-width: ${breakpoints[1]}px) 376.66px,
                    509px
                  `}                   
                />
                <div className={cx(imageCaption, css`height: 110px; top: 228px;`)}>
                  <div className={cx(imageCaptionText, css`font-size: 30px;`)}>
                    {
                      localizedText.imageSet.paymentDelivery
                    }
                  </div>
                </div>            
              </div>      
            </Link>      
          </div>  
        </div>  
      }
      <Catalog catalogRef={catalogRef} items={items} localizedText={localizedText}/>
    </div>  
  )
}

function ProductItem({ itemID, name, price, type, locale}) {

  const router = useRouter()

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
    <Link 
      style={{textDecoration: 'none'}} 
      href={`/products/${type}/${name.toLowerCase().replace(/[\s-]/g, '_')}`}
    >
      <div className={productItem}>
        <div className={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          padding-top: 10px;
        `}>
          <div className={imageWrapper}>
            <Image 
              style={{objectFit: 'contain'}} 
              src={`/products/${type}/${name.toLowerCase().replace(/[\s-]/g, '_')}/item0.jpg`} 
              fill={true} 
              sizes={'280px'}                 
            />
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
              {currencyFormat(price, router.locale)}
            </div>
          </div>
        </div>  
      </div>  
    </Link>  
  )
}

function Catalog ({ items, localizedText, catalogRef }) {

  const [catalogState, setCatalogState] = useState('ceiling')

  const [itemsState, setItemsState] = useState(false)

  useEffect(() => {
    setItemsState(true)
  }, [catalogState])

  const router = useRouter()

  const catalog = css`
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    @media (max-width: ${breakpoints[1]}px), (min-width: ${breakpoints[2]}px + 1) {
      margin-top: -44px;
    }
    @media (max-width: ${breakpoints[2]}px) {
      margin-top: 0px;
    }
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
    justify-content: flex-start;
    width: 1310px;
    @media (max-width: ${breakpoints[0]}px) {
      width: 980px;
    }
    @media (max-width: ${breakpoints[1]}px) {
      width: 650px;
    }
    margin-bottom: 30px;
    gap: 10px;
    padding-top: 10px;
    min-height: calc(100vh - 59px - 35px);
  `

  return (
    <div className={catalog}>
        <div ref={catalogRef} id='catalog' className={css`
          position: relative;
          top: -59px;
        `}></div> 
      <div className={title}>
        {
          localizedText.catalog.catalog
        }
      </div>
      <ToggleButtonGroup
        className={css`
        font-weight: 500;
        & .Mui-selected, .Mui-selected:hover {
          background-color: black;
          color: white;
        }
        & .MuiToggleButton-root {
          border-radius: 0;
        }
      `}
        exclusive
        color='primary'
        value={catalogState}  
        onChange={(event) => {
          if (event.target.value !== catalogState) {
            setItemsState(false)
            setCatalogState(event.target.value)
          }  
        }}
      >
        <ToggleButton 
          value='ceiling'
        >
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
          {!itemsState && <CircularProgress sx={{marginLeft: '50%', marginTop: 'calc((100vh - (59px + 35px)) / 2 - 48.5px)'}}/> || items[catalogState].map((item, i) => (<ProductItem
            itemID={item.id}
            type={catalogState} 
            name={item.name} 
            price={item.price[0].price} 
            key={i} 
            locale={router.locale}
          /> ))}
        </div>
      </div>     
    </div>
  )
}

export async function getStaticProps({ locale }) {

  if (locale === 'default') {
    return {
      notFound: true,
    }
  }

  const fs = require('fs');

  const localizedText = JSON.parse(fs.readFileSync(`json/localization/${locale}/index.json`))

  const itemTypes = JSON.parse(fs.readFileSync('json/product_types.json'))

  const currencyRate = JSON.parse(fs.readFileSync('json/EURCurrencyRates.json'))[locale.toUpperCase()].rate

  const items = {}
  for (const itemType of itemTypes) {
    items[itemType] = []
  }

  let parsedItems
  switch (locale) {
    case 'en':
      parsedItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))
      break
    case 'ru': 
      parsedItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))  
      break
    case 'ro':
      parsedItems = JSON.parse(fs.readFileSync('json/itemsRU.json'))  
      break
    default:
      parsedItems = JSON.parse(fs.readFileSync('json/itemsEN.json'))  
  }

  for (const itemID in parsedItems) {
    const item = parsedItems[itemID]
    const { name, price, img, type } = item
    for (const i in price) {
      price[i].price = Math.round(price[i].price * currencyRate)
    }
    items[itemTypes[type]].push({ id: itemID, name, price })    
  }

  return {
    props: { items, localizedText }
  }  
}