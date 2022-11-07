import '../styles/globals.css'
import { css } from '@emotion/css'
import { Roboto_Flex } from '@next/font/google'


const roboto = Roboto_Flex({display: 'swap'})

const header = css`
  height: 50px;
`
const stickyHeader = css`
  height: 30px;
  background-color: #1a88ad;
`

function MyApp({ Component, pageProps }) {
  return (
    <div className={roboto.className}>
      <div className={header}>

      </div>
      <Component {...pageProps} />
    </div>  
  )
}

export default MyApp
