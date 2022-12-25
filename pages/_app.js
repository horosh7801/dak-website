import '../styles/globals.css'
import { css } from '@emotion/css'
import { Roboto_Flex } from '@next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../public/logo.jpg'
import euImg from '../public/locale/european-union.png'
import ruImg from '../public/locale/russia.png'
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import LanguageContext from '../lib/context/language.js'
import ShoppingCartContext from '../lib/context/shoppingCart.js'
import { useState, useContext, useEffect, useRef } from 'react'
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next'

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

function MyApp({ Component, pageProps }) {

  const [languageState, setLanguageState] = useState('russian')
  const [shoppingCartState, setShoppingCartState] = useState([])

  const sessionInitiated = useRef(false)                                             

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'shopping_cart') {
        setShoppingCartState(JSON.parse(event.newValue))
      }
    })
  }, [])

/*  useEffect(() => {
    (async () => {
      const res = await fetch('/api/getLocale', {headers: {'X-Client-IP': '178.18.32.23'}})
    })()
  }, [])*/

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
    <LanguageContext.Provider value={languageState}>
      <ShoppingCartContext.Provider value={{ shoppingCartState, setShoppingCartState }}>
        <ThemeProvider theme={theme}>
          <div className={roboto.className}>
            <StickyHeader setLanguage={setLanguageState}/>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>  
      </ShoppingCartContext.Provider>  
    </LanguageContext.Provider>    
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

function StickyHeader({ setLanguage }) {

  const language = useContext(LanguageContext)

  const shoppingCart = useContext(ShoppingCartContext)

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

  const locale = css`
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    flex-grow: 0.025;
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
            (language === 'russian') && ['КАТАЛОГ', 'ДОСТАВКА', 'КОНТАКТЫ', 'ФОТОГАЛЕРЕЯ'].map((name, i) => {

              return (
                <>
                  {(name === 'КАТАЛОГ'
                    ? <Link 
                        href='/#catalog'
                        scroll={false}
                        className={css`
                          text-decoration: none;
                          color: black;
                        `}
                      > 
                        <MenuBarButton 
                          name={name} 
                          key={i} 
                        /> 
                      </Link>
                    : <MenuBarButton 
                        name={name} 
                        key={i} 
                      />
                  )}
                
                </>  
              )
            })
            ||
            (language === 'english') && ['CATALOG', 'DELIVERY', 'CONTACTS', 'PHOTOS'].map((name, i) => <MenuBarButton name={name} key={i} />)
          }
        </div>    
        <div className={menuBarLast}>
          <div>
            <Link href='/cart'>
                <IconButton color="primary">
                  <Badge badgeContent={shoppingCart.shoppingCartState.length} color='secondary'>
                    <ShoppingBagSharpIcon />
                  </Badge>   
                </IconButton>    
            </Link>   
          </div>
          <div className={locale}>
            <Image style={{width: 28, height: 'auto'}} src={ruImg} onClick={() => setLanguage('russian')} />
            <Image style={{width: 28, height: 'auto'}} src={euImg} onClick={() => setLanguage('english')} />
          </div>
        </div>           
      </div> 
    </div>
  )  
}

export default MyApp
