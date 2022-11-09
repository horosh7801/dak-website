import '../styles/globals.css'
import { css } from '@emotion/css'
//import { Inter } from '@next/font/google'
import { Roboto_Flex } from '@next/font/google'
import Image from 'next/image'
import logoImg from '../public/logo.jpg'

//const roboto = Inter({display: 'optional', axes: ['YOPQ', 'YTUC', 'GRAD', 'wdth']})
const roboto = Roboto_Flex({
  subsets: ['latin', 'cyrillic','numbers', 'punctuation'],
  axes: ['YOPQ', 'YTUC', 'GRAD', 'wdth']
})

const header = css`
`
const stickyHeader = css`
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

const menuButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 5px white solid;
  border-right: 5px white solid;
  height: 41px;
  &:hover {
    border-left: 5px black solid;
    border-right: 5px black solid;
    background-color: black;
    color: white;
  }
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
  justify-content: space-between;
`

const phoneNumber = css`
  font-size: 20px;
  font-weight: 600;
`

const shoppingCart = css`
  width: 10px;
  height: 10px;
`

function MyApp({ Component, pageProps }) {
  return (
    <div className={roboto.className}>
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
            <div className={menuButton}>
              КАТАЛОГ
            </div>
            <div className={menuButton}>  
              ДОСТАВКА
            </div>
            <div className={menuButton}>  
              КОНТАКТЫ
            </div>
            <div className={menuButton}>  
              ФОТОГАЛЕРЕЯ
            </div>
          </div>    
          <div className={menuBarLast}>
            <div className={phoneNumber}>
                +375(29)569-34-76
            </div>
            <div className={shoppingCart}>
            </div>
          </div>           
        </div> 
      </div>
      <Component {...pageProps} />
    </div>  
  )
}

export default MyApp
