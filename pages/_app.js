import '../styles/globals.css'
import { css } from '@emotion/css'
import { Roboto_Flex } from '@next/font/google'
import Image from 'next/image'
import logoImg from '../public/logo.jpg'
import euImg from '../public/locale/european-union.png'
import ruImg from '../public/locale/russia.png'
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import LanguageContext from '../lib/context/language.js'
import { useState, useContext } from 'react'

const roboto = Roboto_Flex({
  subsets: ['latin', 'cyrillic','numbers', 'punctuation', 'currency'],
  axes: ['YOPQ', 'YTUC', 'GRAD', 'wdth']
})


function MyApp({ Component, pageProps }) {

  const [languageState, setLanguageState] = useState('russian')

  return (
    <LanguageContext.Provider value={languageState}>
      <div className={roboto.className}>
        <StickyHeader setLanguage={setLanguageState}/>
        <Component {...pageProps} />
      </div>
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
  console.log(language)

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

  const shoppingCart = css`
    margin-left: 20px;
  `

  const locale = css`
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    flex-grow: 0.025;
  `

  return (
    <div className={stickyHeader}>
      <div className={logoWrapper}>
        <div className={logo}>
          <div className={logoText}>
            DAK
          </div>  
        </div>
      </div>
      <div className={menuBar}>
        <div className={menuBarFirst}>
          {
            (language === 'russian') && ['КАТАЛОГ', 'ДОСТАВКА', 'КОНТАКТЫ', 'ФОТОГАЛЕРЕЯ'].map((name, i) => <MenuBarButton name={name} key={i} />)
            ||
            (language === 'english') && ['CATALOG', 'DELIVERY', 'CONTACTS', 'PHOTOS'].map((name, i) => <MenuBarButton name={name} key={i} />)
          }
        </div>    
        <div className={menuBarLast}>
          <div className={shoppingCart}>
            <ShoppingBagSharpIcon />
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
