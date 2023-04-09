import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import lampImage1 from '../public/featured_products/wave.jpg'
import lampImage2 from '../public/featured_products/venera.jpg'
import lampImage3 from '../public/featured_products/snake.jpg'
import ceilingType from '../public/ceilingType.png'
import floorType from '../public/floorType.png'
import wallType from '../public/wallType.png'
import wall3dType from '../public/wall3dType.png'
import mirrorType from '../public/mirrorType.png'
import pointType from '../public/pointType.png'
import { cx, css, keyframes } from '@emotion/css'
//import Button from '../lib/components/Button.js'
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useState, useEffect, useContext, useRef } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import currencyFormat from '../lib/modules/currencyFormat.js'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import subHeader from '../lib/modules/styles/subHeader.js'

const carouselHeight = 600;

const breakpoints = [1340, 1030, 890, 820, 555]
const mobileBreakpoint = 690

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
    margin-top: -95px;
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

const imageFadeScreen = css`
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
  top: 0px;
  opacity: 0;
  z-index: 1;
  transition: 0.1s;
  &:hover {
    opacity: 0.2;
  };
`

export default function Home({ items, localizedText, catalogScroll, setFooterState }) {

  const catalogRef = useRef()

  const matches2 = useMediaQuery(`(min-width: ${breakpoints[2] + 1}px)`)

  const router = useRouter()

  useEffect(() => {
    setFooterState(true)
  }, [])

  useEffect(() => {
    if (catalogScroll.state === true) {
      catalogRef.current.scrollIntoView()
      catalogScroll.setState(false)
    }
  }, [catalogScroll.state])

  return (
    <div className={mainWrapper}>
      <Head>
        <meta name="google-site-verification" content="-0eGFyxqEOfFRTsJgb8qpR3LwLbY9-_mnwgZSbRvmp0" />
        <div>
          <!-- Google tag (gtag.js) -->
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-PF3PDR0WMX"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-PF3PDR0WMX');
            `}
          </Script>  
        </div>     
      </Head>
      {matches2 &&
        <div className={subHeader}>
          {localizedText.main}
        </div>      
      }
      {matches2 && 
        <div className={imageSet}>
          <Link href={'/info/about'}>
            <div 
              className={imageSetItem}
            >
              <div className={imageFadeScreen}>
              </div>              
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
                <div className={imageFadeScreen}>
                </div>                
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
                className={css`position: relative; transition: 0.1s; cursor: pointer;`}
              >
                <div className={imageFadeScreen}>
                </div>                
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

  const baseWidth = 320
  const baseHeight = 400

  const scaleRate = 0.8

  const [hoverState, setHoverState] = useState(false)

  const productItem = css`
    box-shadow: 0px 0px 3px -2px;
    width: ${baseWidth}px;
    height: ${baseHeight}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    color: black;
    border-radius: 2px;
    @media(max-width: ${breakpoints[2]}px) {
      width: ${baseWidth * scaleRate}px;
      height: ${baseHeight * scaleRate}px;
    }       
  `

  const imgBaseWidth = 280
  const imgBaseHeight = 280

  const imageWrapper = css`
    position: relative;
    width: ${imgBaseWidth}px;
    height: ${imgBaseHeight}px;  
    @media (max-width: ${breakpoints[2]}px) {
      width: ${imgBaseWidth * scaleRate}px;
      height: ${imgBaseHeight * scaleRate}px;
    } 
  `

  const itemName = css`
    position: relative;
    align-self: center;
    top: -29%

  `

  const priceBaseSize = 19

  const onHoverOpacity = 0.01
  const onHoverTransition = 0.1

  const itemPrice = css`
    font-size: ${priceBaseSize}px;
    font-weight: 330;
    position: relative;
    background-color: white;
    margin-right: 5px;
    margin-top: 5px;
    padding: 3px;ё
    padding-left: 6px;
    padding-right: 6px;
    color: #222;
    border-radius: 20px;
    animation-name: ${ hoverState ? keyframes`
      to {
        background-color: #222;
        color: white;
      }
    ` : ''};
    animation-duration: ${onHoverTransition}s;
    animation-fill-mode: forwards;



    @media (max-width: ${breakpoints[2]}px) {
      font-size: ${priceBaseSize * scaleRate}px;
    } 

  `

  const textBaseSize = 24

  const textWrapper = css`
    width: 100%;
    font-size: ${textBaseSize}px;
    font-weight: 441;
    font-stretch: 35%;   
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: white;
    animation-name: ${hoverState ? keyframes`
      to {
        color: #222;
      }
    ` : ''};
    animation-duration: ${onHoverTransition}s;
    animation-delay: ${onHoverTransition}s;
    animation-fill-mode: forwards;
    @media (max-width: ${breakpoints[2]}px) {
      font-size: ${textBaseSize * scaleRate}px;
    }    
  `

  return (
    <Link 
      style={{textDecoration: 'none'}} 
      href={`/products/${type}/${name.toLowerCase().replace(/[\s-]/g, '_')}`}
    >
      <div 
        onMouseEnter={() => {
          setHoverState(true)
        }}
        onMouseLeave={() => {
          setHoverState(false)
        }}
        className={productItem}
      >           
        <div className={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          padding-top: 10px;
          position: relative;
        `}>
          <div className={css`
            position: absolute;
            background-color: black;
            width: 100%;
            height: 100%;
            transition: ${onHoverTransition}s;
            opacity: ${hoverState ? 0.2 : 0};
            top: 0px;
            z-index: 1;
          `}>
          </div>           
          <div className={imageWrapper}>
            <Image 
              style={{objectFit: 'contain'}} 
              src={`/products/${type}/${name.toLowerCase().replace(/[\s-]/g, '_')}/item0.jpg`} 
              fill={true} 
              sizes={`
                (max-width: ${breakpoints[2]}px) ${imgBaseWidth * scaleRate}px, 
                ${imgBaseWidth}px`
              }                 
            />
          </div> 
        </div>  
        <div className={css`
          width: 100%;
          background-color: #222222;
          display: flex;
          justify-content: center;
          animation-name: ${hoverState ? keyframes`
            to {
              background-color: white; 
              color: black;
            }
          ` : ''};
          animation-fill-mode: forwards;
          animation-duration: ${onHoverTransition}s;   
          animation-delay: ${onHoverTransition}s;       
        `}>
          <div className={textWrapper}>
            <div className={itemPrice}>
              {currencyFormat(price, router.locale)}
            </div>          
            <div className={itemName}>
              {name}
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

  const matches = useMediaQuery(`(min-width: 691px)`)

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

  const productsListWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media (max-width: ${breakpoints[2]}px) {
    }
    @media (max-width: ${breakpoints[3]}px) {

    }
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
    @media (max-width: ${breakpoints[2]}px) {
      width: 788px;
    }
    @media (max-width: ${breakpoints[3]}px) {
      width: 523px;
    }
    @media (max-width: ${breakpoints[4]}px) {
      width: 257px;
    }    
    margin-bottom: 30px;
    gap: 10px;
    padding-top: 10px;
    min-height: calc(100vh - 59px - 35px);
  `

  const buttonScaleRate = 0.85

  return (
    <div className={catalog}>
        <div ref={catalogRef} id='catalog' className={css`
          position: relative;
          top: -45px;
        `}></div> 
      <div className={subHeader}>
        {
          localizedText.catalog.catalog
        }
      </div>

      <div className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (max-width: ${breakpoints[2]}px) {
          width: 100%
        }
      `}>
        {matches &&

          <div className={css`
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            margin-top: 30px;
            column-gap: 20px;
          `}>
           {['ceiling', 'wall', 'floor', 'wall3d', 'point', 'mirror'].map((type, index) => (
              <div key={index} className={css`
                opacity: ${catalogState === type ? 1 : 0.4};
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: opacity 0.2s, border-bottom 0s;
                cursor: pointer;
                padding-bottom: 2px;
                border-bottom: 2px solid ${catalogState === type ? 'black' : 'white'};
                &:hover {
                  opacity: 1;
                }
              `} onClick={() => {
                if (type !== catalogState) {
                  setCatalogState(type)
                  setItemsState(false)
                }  
              }}>
                <Image src={`/${type}Type.png`} width='70' height='70' />
                <div className={css`
                  font-size: 15px;
                  margin-top: 8px;
                `}>
                  {localizedText.catalog[type]}
                </div>
              </div>
            ))}
          </div>

        }

        {!matches &&
          <div className={css`
            margin-top: 20px;
            margin-bottom: 10px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;

          `}>
            <Select
              MenuProps={{ disableScrollLock: true }}
              sx={{width: 'calc(100% - 100px)'}}
              value={catalogState}
              variant='standard'
              onChange={(event) => {
                if (event.target.value !== catalogState) {
                  setItemsState(false)
                  setCatalogState(event.target.value)
                }  
              }}              
            >
              {['ceiling', 'floor', 'wall', 'point', 'wall3d', 'mirror'].map((item, i) => (
                <MenuItem
                  value={item}
                  key={i}
                >
                
                    <div className={css`
                      display: flex;
                      flex-direction: row;
                      justify-content: center;
                      padding-left: 24px;
                    `}>
                      {localizedText.catalog[item]}
                    </div>
                </MenuItem>
              ))}
            </Select>
          </div>  

        }
        {!itemsState &&
          <div className={css`
            width: 100%;
            height: 100%;
            height: 350px;
            display: flex;
            justify-content: center;
            align-items: center;

          `}>
            <CircularProgress/>
          </div>
        }  
        {itemsState &&
          <div className={productsListWrapper}>
            <div className={productsList}>
              {
                items[catalogState].map((item, i) => (<ProductItem
                  itemID={item.id}
                  type={catalogState} 
                  name={item.name} 
                  price={item.price[0].price} 
                  key={i} 
                  locale={router.locale}
              
                />))
              }
            </div>
          </div>  
        } 
      </div>

    </div>
  )
}

function CatalogToggleButtonGroup({ catalogState, localizedText, setItemsState, setCatalogState }) {

  const matches2 = useMediaQuery(`(min-width: ${breakpoints[2] + 1}px)`)

  return (
    <ToggleButtonGroup
      className={css`
      font-weight: 500;
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 50px;
      & .Mui-selected, .Mui-selected:hover {
        background-color: #222222;
        color: white;
      }
      & .MuiToggleButton-root {
        border-radius: 0;
      }
    `}
      exclusive
      color='primary'
      value={catalogState}  
      orientation='horizontal'
      onChange={(event) => {
        if (event.target.value !== catalogState) {
          setItemsState(false)
          setCatalogState(event.target.value)
        }  
      }}
    >
      <div className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}>
        <ToggleButton 
          value='ceiling'
        >
          {
            localizedText.catalog.ceiling
          }
        </ToggleButton>
      </div>  

      <div className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}>
        <ToggleButton 
          value='floor'
        >
          {
            localizedText.catalog.floor
          }
        </ToggleButton>
      </div>  

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
          localizedText.catalog.mirror
        }
      </ToggleButton>                                        
    </ToggleButtonGroup>
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
      if (name === 'Snake') {
        console.log(`${price[i].price} ${locale}`)
      }
    }
    items[itemTypes[type]].push({ id: itemID, name, price })    
  }

  return {
    props: { items, localizedText }
  }  
}