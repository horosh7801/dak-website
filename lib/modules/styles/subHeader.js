import { css } from '@emotion/css'

const subHeader = css`
  width: calc(100% - 100px);
  display: flex;
  color: white;
  background-color: #222222;
  height: 35px;
  align-items: center;
  padding-left: 100px;
  font-size: 20px;
  z-index: 1;
  @media (max-width: 520px) {
  	width: calc(100% - 30px);
  	padding-left: 30px;
  }
`

export default subHeader