import '../styles/globals.css'
import { css, cx, keyframes } from '@emotion/css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logoImg from '../public/logo.jpg'
import euImg from '../public/locale/european-union.png'
import ruImg from '../public/locale/russia.png'
import mlImg from '../public/locale/moldova.png'
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ShoppingCartContext from '../lib/context/shoppingCart.js'
import { useState, useContext, useEffect, useRef } from 'react'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import roboto from '../lib/modules/variableFont.js'
import CircularProgress from '@mui/material/CircularProgress'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#ececec'
    },
    info: {
      main: '#FFF'
    },
    neutral: {
      main: '#FFF'
    }
  },

})

const breakpoints = [890]

const navbarLocalization = {en: ['CATALOG', 'DELIVERY', 'CONTACTS'], ru: ['КАТАЛОГ', 'ДОСТАВКА', 'КОНТАКТЫ'], ro: ['КАТАЛОГ', 'ДОСТАВКА', 'КОНТАКТЫ']}

function MyApp({ Component, pageProps }) {

  const [shoppingCartState, setShoppingCartState] = useState([])

  const sessionInitiated = useRef(false)                                             

  const [renderState, setRenderState] = useState(false)

  const [catalogScrollState, setCatalogScrollState] = useState(false)

  useEffect(() => {
    setRenderState(true)
  }, [])

 /* useEffect(() => {
    window.addEventListener('storage', (event) => {
      switch (event.key) {
        case 'shopping_cart':
          setShoppingCartState(JSON.parse(event.newValue))
          break
        case 'locale':
          if (event.newValue === null) {
            setLocaleState({date: (new Date()).getTime(), ...defaultLocale})
          } else {
            setLocaleState(JSON.parse(event.newValue))  
          }  
      }
    })
  }, [])*/

  const router = useRouter()
  const firstRender = useRef(true)

  useEffect(() => {
    const cartItems = window.localStorage.getItem('shopping_cart')
    if (cartItems === null) {
      window.localStorage.setItem('shopping_cart', JSON.stringify([]))
    } else {

      setShoppingCartState(JSON.parse(cartItems))
    }
  }, [])

  return (
    <ShoppingCartContext.Provider value={{ shoppingCartState, setShoppingCartState }}>
      <ThemeProvider theme={theme}>
        <div className={roboto}>
         {!renderState ? <CircularProgress sx={{marginLeft: '50vw', marginTop: '50vh'}}/> :
          <>
            <StickyHeader catalogScroll={{state: catalogScrollState, setState: setCatalogScrollState}} />
            <Component {...pageProps} catalogScroll={{state: catalogScrollState, setState: setCatalogScrollState}} />
          </>  
        }
        </div>
      </ThemeProvider>  
    </ShoppingCartContext.Provider>  
  )
}

function MenuBarButton({ name, onClick }) {

  const menuButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 5px white solid;
    border-right: 5px white solid;
    height: 41px;
    cursor: pointer;
    &:hover {
      border-left: 5px black solid;
      border-right: 5px black solid;
      background-color: black;
      color: white;
    }
  `

  return (
    <div onClick={onClick} className={menuButton}>
      {name}
    </div>
  )
}

function StickyHeader({ catalogScroll }) {

  const shoppingCart = useContext(ShoppingCartContext)

  const router = useRouter()

  const match0 = useMediaQuery(`(min-width: ${breakpoints[0] + 1}px)`)

  const stickyHeader = css`
    box-shadow: 0px 1px 3px -2px;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0px;
    z-index: 10;
    background-color: white;
  `

  const logoWrapper = css`
    border:  3px black solid;
    margin: 6px;
    margin-left: 40px;
    cursor: pointer;
  `

  const logo = css`
    background-color: black;
    border: 3px white solid;
    width: 86px;
    height: 35px;
    padding-top: 0px;
    padding-left: 0px;
  `

  const logoText = css`
    color: white;
    font-size: 35px;
    font-weight: 795;
    font-style: oblique 10deg;
    font-variation-settings: "wdth" 151, "GRAD" -200, "YOPQ" 85, "YTUC" 760;
  `

  const menuBar = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
    align-self: center;
    font-size: 19px;
    font-weight: 418;
    font-variation-settings: "YOPQ" 85;
  `

  const menuBarFirst = css`
    display: flex;
    column-gap: 50px;
    flex-grow: 1;
    padding-left: 20px;
    margin-left: 40px;
  `

  const menuBarLast = css`
    flex-grow: 1.5;
    display: flex;
    align-items: center;
    justify-content: end;
    column-gap: 40px;
  `

  const localeSelection = css`
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    flex-grow: 0.025;

  `

  const waveDuration = 1.3
  const waveInterval = 2
  const waveDelay = 0.3

  const waveAnimation = keyframes`
    from {
      width: 20px;
      height: 20px;
    }

    ${ Math.round((waveDuration / (waveInterval + waveDuration)) * 100) }% {
      width: 50px;
      height: 50px;
      border-color: rgb(2, 253, 2, 0);
    }

    to {
      border-color: rgb(2, 253, 2, 0);
    }
  `

  const waveEffect = css`
    position: absolute;
    justify-content: center;
    align-items: center;
    margin: auto;
    border: 1px solid rgb(2, 253, 2, 1);
    border-radius: 50%;
    animation-name: ${waveAnimation};
    animation-iteration-count: infinite;
    animation-duration: ${waveDuration + waveInterval}s;

  `

  const cartButtonContainer = css`
    width: 60px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const selectItemContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `

  return (
    <div className={stickyHeader}>
      <Link
        className={css`
          text-decoration: none;
        `} 
        href='/'
      >
        <div className={logoWrapper}>
          <div className={logo}>
            <div className={logoText}>
              DAK
            </div>  
          </div>
        </div>
      </Link>  
      <div className={menuBar}>
        {match0 &&
          <div className={menuBarFirst}>
            {
              ['catalog', 'delivery', 'contacts'].map((name, i) => {
                return (
                    <MenuBarButton 
                      key={i} 
                      name={navbarLocalization[router.locale][i]} 
                      onClick={() => {
                        console.log('scroll')
                        catalogScroll.setState(true)
                        router.push('/', '/', {scroll: false})
                      }}
                    />    
                )
              })
            }
          </div>   
        }
        <div className={menuBarLast}>
          <div className={cartButtonContainer}>
              {shoppingCart.shoppingCartState.length > 0 && Array(2).fill(1).map((element, index) => (
                <div key={index} className={cx(waveEffect, css`animation-delay: ${waveDelay * index}s`)}>
                </div>   
              ))}              
              <Link href='/cart'>
                <IconButton sx={{color: shoppingCart.shoppingCartState.length > 0 ? '#02fd02' : 'none'}} color="primary">
                  <Badge badgeContent={shoppingCart.shoppingCartState.length} color='secondary'>
                    <ShoppingBagSharpIcon />
                  </Badge>   
                </IconButton>  
              </Link>    
          </div>
          <div className={css`
            width: 100px;
            height: 45px;
            display: flex;
            align-items: center;
            margin-right: 35px;
          `}>
            <Select
              MenuProps={{ disableScrollLock: true }}
              variant='standard'
              sx={{width: 85, height: 30}}
              value={router.locale.toUpperCase()}
              onChange={async (event) => {
                setCookie('NEXT_LOCALE', event.target.value.toLowerCase())
                console.log('selected')
              //  router.push(router.asPath, router.asPath, {scroll: false, locale: event.target.value.toLowerCase()})
                router.reload()
              }}
            >
              <MenuItem 
                value={'EN'}
                disableGutters
                sx={{
                  '.css-iz83cf': {
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: '13px' ,
                  width: '100%'
                }
              }}>
                <div className={selectItemContainer}>
                  <div className={css`
                    padding-top: 6px;
                  `}>
                    EN
                  </div>
                  <Image style={{width: 23, height: 'auto'}} src={euImg}/>
                </div>    
              </MenuItem>
              <MenuItem 
                value={'RU'}
                disableGutters
                sx={{
                  '.css-iz83cf': {
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: '13px' ,
                  width: '100%'
                }}}
              >
                <div className={selectItemContainer}>
                  <div className={css`
                    padding-top: 6px;
                  `}>
                    RU
                  </div>
                  <Image style={{width: 23, height: 'auto'}} src={ruImg}/>
                </div>    
              </MenuItem>             
              <MenuItem 
                value={'RO'}
                disableGutters
                sx={{
                  '.css-iz83cf': {
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: '13px' ,
                  width: '100%'
                }}}
              >
                <div className={selectItemContainer}>
                  <div className={css`
                    padding-top: 6px;
                  `}>
                    RO
                  </div>
                  <Image style={{width: 23, height: 'auto'}} src={mlImg}/>
                </div>    
              </MenuItem>                           
            </Select>
          </div>
        </div>           
      </div> 
    </div>
  )  
}

export default MyApp