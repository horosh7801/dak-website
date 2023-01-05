import '../styles/globals.css'
import { css, cx, keyframes } from '@emotion/css'
import { Roboto_Flex } from '@next/font/google'
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
import LocaleContext from '../lib/context/locale.js'
import { useState, useContext, useEffect, useRef } from 'react'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'


const roboto = Roboto_Flex({
  subsets: ['latin', 'cyrillic','numbers', 'punctuation', 'currency'],
  axes: ['YOPQ', 'YTUC', 'GRAD', 'wdth']
})

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
  }
})

const defaultLocale = {language: 'EN', currency: 'EUR', 'rate': 1}

function MyApp({ Component, pageProps }) {

  const [localeState, setLocaleState] = useState({date: (new Date()).getTime(), ...defaultLocale})
  const [shoppingCartState, setShoppingCartState] = useState([])

  const sessionInitiated = useRef(false)                                             

  useEffect(() => {(async () => {

  })()}, [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const storedLocale = window.localStorage.getItem('locale')
    if (storedLocale !== null) {
      const parsedStoredLocale = JSON.parse(storedLocale)
      if ((new Date()).getTime() - parsedStoredLocale.date <= 21600000) {
        console.log(1)
        setLocaleState(parsedStoredLocale)
      } else {(async function() {
        const res = await fetch(`/api/getLocale?lang=${parsedStoredLocale.language}`)
        const parsedRes = await res.json()
        const newLocale = {date: (new Date()).getTime(), language: parsedStoredLocale.language, ...parsedRes}
        window.localStorage.setItem('locale', JSON.stringify(newLocale))
        console.log(2)
        setLocaleState(newLocale)
      })()}
    } else {(async function() {
      window.localStorage.setItem('locale', JSON.stringify(localeState))
    })()}
  }, [])

  const router = useRouter()
  const firstRender = useRef(true)
  useEffect(() => {
      console.log(localeState.language.toLowerCase())
      const { pathname, asPath, query } = router
      router.push({ pathname, query }, asPath, { locale: localeState.language.toLowerCase(), scroll: false })
  }, [localeState])

  useEffect(() => {
    const cartItems = window.localStorage.getItem('shopping_cart')
    if (!sessionInitiated.current) {
      if (cartItems === null) {
        window.localStorage.setItem('shopping_cart', JSON.stringify([]))
      } else {
        setShoppingCartState(JSON.parse(cartItems))
      }
    } else {
      const newCartItems = JSON.stringify(shoppingCartState)
      if (cartItems !== newCartItems) {
        window.localStorage.setItem('shopping_cart', newCartItems)
      }
    }
    sessionInitiated.current = true
  }, [shoppingCartState])

  return (
    <LocaleContext.Provider value={{ localeState, setLocaleState }}>
          <ShoppingCartContext.Provider value={{ shoppingCartState, setShoppingCartState }}>
            <ThemeProvider theme={theme}>
              <div className={roboto.className}>
                <StickyHeader/>
                <Component {...pageProps} />
              </div>
            </ThemeProvider>  
          </ShoppingCartContext.Provider>  
    </LocaleContext.Provider>  
  )
}

function MenuBarButton({ name }) {

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
    <div className={menuButton}>
      {name}
    </div>
  )
}

function StickyHeader() {

  const shoppingCart = useContext(ShoppingCartContext)

  const locale = useContext(LocaleContext)

  const router = useRouter()

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
    margin-left: 30px;
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
    justify-content: space-around;
    flex-grow: 1;
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
        <div className={menuBarFirst}>
          {
           ['КАТАЛОГ', 'ДОСТАВКА', 'КОНТАКТЫ', 'ФОТОГАЛЕРЕЯ'].map((name, i) => {

              return (
                <>
                  {(name === 'КАТАЛОГ'
                    ? <div
                          onClick={() => {
                                                    
                          }}
                      >
                        <MenuBarButton 
                          name={name} 
                          key={i} 
                        />
                      </div>   
                     
                    : <MenuBarButton 
                        name={name} 
                        key={i} 
                      />
                  )}
                
                </>  
              )
            })
            ||
            ['CATALOG', 'DELIVERY', 'CONTACTS', 'PHOTOS'].map((name, i) => <MenuBarButton name={name} key={i} />)
          }
        </div>    
        <div className={menuBarLast}>
          <div className={cartButtonContainer}>
              {shoppingCart.shoppingCartState.length > 0 && Array(2).fill(1).map((element, index) => (
                <div className={cx(waveEffect, css`animation-delay: ${waveDelay * index}s`)}>
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
          `}>
            <Select
              variant='standard'
              sx={{width: 85, height: 30}}
              value={locale.localeState.language}
              onChange={async (event) => {
                const res = await fetch(`/api/getLocale?lang=${event.target.value}`)
                const parsedRes = await res.json()
                const newLocale = {date: (new Date()).getTime(), language: event.target.value, ...parsedRes}
                window.localStorage.setItem('locale', JSON.stringify(newLocale))
                locale.setLocaleState(newLocale)

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