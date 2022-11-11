import { css } from '@emotion/css'


export default function Button({ label, width=100, height=50 }) {

  const button = css`
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${height}px;
    background-color: black;
    color: white;
    vertical-align: center;
    transition: 0.2s;
    &:hover {
      background-color: white;
      border: 1px solid black;
      color: black; 
    }  
  `

  return (
    <div className={button}>
      <div>
        {label}
      </div>
    </div>  
  )
}