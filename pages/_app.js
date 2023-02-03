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
import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import Drawer from '@mui/material/Drawer'
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

const footerItem = css`
  text-underline-offset: 4px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;  
`

const footerColumn = css`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-bottom: 40px;
`

const breakpoints = [950]

const navbarLocalization = {
  en: ['CATALOG', 'DELIVERY', 'CONTACTS', 'COLORS', 'ABOUT US'], 
  ru: ['КАТАЛОГ', 'ДОСТАВКА', 'КОНТАКТЫ', 'ЦВЕТА', 'О НАС'], 
  ro: ['КАТАЛОГ', 'ДОСТАВКА', 'КОНТАКТЫ', 'ЦВЕТА', 'О НАС']
}

const footerLocalization = {
  en: ['CATALOG', 'PAYMENT AND DELIVERY', 'CONTACT INFORMATION', 'COLORS', 'ABOUT US'], 
  ru: ['КАТАЛОГ', 'ДОСТАВКА И ОПЛАТА', 'КОНТАКТНАЯ ИНФОРМАЦИЯ', 'ЦВЕТОВАЯ ГАММА', 'О НАС'], 
  ro: ['КАТАЛОГ', 'ДОСТАВКА И ОПЛАТА', 'КОНТАКТНАЯ ИНФОРМАЦИЯ', 'ЦВЕТОВАЯ ГАММА', 'О НАС']  
}

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
            <div className={css`
              min-height: 200px;
              background-color: #cdcdcd;
              display: flex;
              flex-direction: row;
              padding-left: 30px;
              padding-top: 20px;
              column-gap: 50px;
              font-size: 15px;
              flex-wrap: wrap;
            `}>
              <div className={footerColumn}>
                <div 
                  className={footerItem}
                  onClick={() => {
                    setCatalogScrollState(true)
                    router.push('/', '/', {scroll: false})
                  }}                  
                >
                  {footerLocalization[router.locale][0]}
                </div>
                <Link href='/info/colors' style={{textDecoration: 'none', color: 'black'}}>
                  <div className={footerItem}>
                    {footerLocalization[router.locale][3]}
                  </div>   
                </Link>                     
              </div>
              <div className={footerColumn}>
                <Link href='/info/delivery' style={{textDecoration: 'none', color: 'black'}}>
                  <div className={footerItem}>
                    {footerLocalization[router.locale][1]}
                  </div>   
                </Link>                                           
              </div>
              <div className={footerColumn}>
                <div className={footerItem}>
                  <a 
                    href='tel:+37368077331'
                    className={css`
                      text-decoration: none;
                      color: black;
                    `}
                  >
                    +37368077331
                  </a>  
                </div>
                <Link href='/info/contacts' style={{textDecoration: 'none', color: 'black'}}>
                  <div className={footerItem}>
                    {footerLocalization[router.locale][2]}
                  </div>
                </Link>  
                <Link href='/info/about' style={{textDecoration: 'none', color: 'black'}}>
                  <div className={footerItem}>
                    {footerLocalization[router.locale][4]}
                  </div>       
                </Link>           
              </div>
            </div>
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

  const [navbarState, setNavbarState] = useState(false)

  const stickyHeader = css`
    box-shadow: 0px 1px 3px -2px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
    width: 92px;
    @media (max-width: ${breakpoints[0]}px) {
      flex-grow: 0;
      transform: scale(0.9);
      margin: 0px 0px 0px 0px;
      margin-left: 0px;
    } 
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
    font-size: 16px;
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
    max-width: 100%;
    column-gap: 40px;
    @media (max-width: ${breakpoints[0]}px) {
      flex-grow: 2;
    }
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
  const menuIconContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-left: 20px;
  `

  return (
    <div className={stickyHeader}>
      {!match0 &&
        <SideNavbar 
          open={navbarState} 
          onClose={() => {setNavbarState(false)}}
          catalogScroll={catalogScroll}
        />
      }
      {!match0 &&
        <div className={css`
          flex-grow: 2;
        `}>
          <IconButton 
            color="primary" 
            className={css`
              width: 40px;
              height: 40px;
              margin-left: 10px;
            `}
            onClick={() => {
              setNavbarState(!navbarState)
            }}
          >
              <MenuIcon sx={{fontSize: '31px'}} />
          </IconButton> 
        </div>   
      }  
      <Link
        className={css`
          text-decoration: none;
          @media (max-width: ${breakpoints[0]}px) {
            flex-grow: 1;
          }
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
            <MenuBarButton
              key={0}
              name={navbarLocalization[router.locale][0]}
              onClick={() => {
                catalogScroll.setState(true)
                router.push('/', '/', {scroll: false})
              }}
            />
            {
              ['delivery', 'contacts', 'colors'].map((name, i) => {
                return (
                  <Link style={{textDecoration: 'none', color: 'black'}} href={`/info/${name}`, `/info/${name}`}>
                    <MenuBarButton 
                      key={i} 
                      name={navbarLocalization[router.locale][i + 1]} 
                    />    
                  </Link>  
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
            @media (max-width: ${breakpoints[0]}px) {
              display: none;
            }
          `}>
          {match0 && 
            <LanguageSelection />
          }
          </div>
        </div>           
      </div> 
    </div>
  )  
}

function SideNavbar({ open, onClose, catalogScroll }) {

  const router = useRouter()

  return(
    <Drawer 
      anchor='left'
      open={open}
      onClose={onClose}

    >
      <div className={css`
        width: 200px;
        background-color: white;  
        display: flex;
        flex-direction: column;  
      `}>
        <div className={css`
          display: flex;
          flex-direction: row;
        `}>
          <IconButton 
            color="primary" 
            className={css`
              width: 40px;
              height: 40px;
              margin-left: 10px;
              margin-top: 3px;
              margin-right: 55px;
            `}
            onClick={onClose}
          >
            <CloseSharpIcon sx={{fontSize: '31px'}} />
          </IconButton>  
          <div className={css`
            align-self: start;
            margin-top: 7px;
          `}>
            <LanguageSelection />
          </div>  
        </div>  
        <div className={cx(roboto, css`
          display: flex;
          flex-direction: column;
          margin-top: 30px;
          row-gap: 10px;
          font-size: 20px;
          align-items: start;
          margin-left: 20px;
        `)}>
          <MenuBarButton
            key={0}
            name={navbarLocalization[router.locale][0]}
            onClick={() => {
              catalogScroll.setState(true)
              router.push('/', '/', {scroll: false})
              onClose()
            }}
          />
          {
            ['delivery', 'contacts', 'colors','about'].map((name, i) => {
              return (
                <Link style={{textDecoration: 'none', color: 'black'}} href={`/info/${name}`, `/info/${name}`}>
                  <MenuBarButton 
                    key={i} 
                    name={navbarLocalization[router.locale][i + 1]} 
                    onClick={() => {onClose()}}
                  />    
                </Link>  
              )
            })
          }        
        </div>
      </div>
    </Drawer>    
  )
}

function LanguageSelection() {

  const router = useRouter()

  const selectItemContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
  
  return (
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
          <Image style={{width: 23, height: 'auto'}} priority={true} src={euImg}/>
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
          <Image style={{width: 23, height: 'auto'}} priority={true} src={ruImg}/>
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
          <Image style={{width: 23, height: 'auto'}} priority={true} src={mlImg}/>
        </div>    
      </MenuItem>                           
    </Select>
  )
}

export default MyApp