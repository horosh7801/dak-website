import Head from 'next/head'
import Image from 'next/image'
import lamp1Image from '../public/lamp1.jpg'
import lamp2Image from '../public/lamp2.jpg'
import lamp3Image from '../public/lamp3.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { css } from '@emotion/css'

const carouselHeight = 600;

const mainWrapper = css`
  display: flex;
  flex-direction: column;
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
`

const recommendedProducts = css`

`  
const recommendedProductsTitle = css`
  color: black;
` 

export default function Home() {
  return (
    <div className={mainWrapper}>
      <div className={carousel}>
        <Carousel 
          height={carouselHeight}
          showStatus={false}
          autoPlay={true} 
          infiniteLoop={true} 
          showThumbs={false} 
        >
          <div>
            <Slide 
              img={lamp1Image} 
              title={'DAK'} 
              txt={'ДИЗАЙНЕРСКИЕ СВЕТИЛЬНИКИ ИЗ ДЕРЕВА КАК НУЖНО ИМЕННО ВАМ'} /> 
          </div>
          <div>
            <Slide
              img={lamp2Image}
            />  
          </div> 
          <div>
            <Slide
              img={lamp3Image}
            />
          </div>                
        </Carousel>
      </div> 
      <div className={productTypes}>
        {['ceiling', 'floor', 'wall', 'singular', 'wall3D', 'mirror'].map(type => <ProductType type={type} />)}
      </div> 
      <div className={recommendedProducts}>
        <div className={recommendedProductsTitle}>
        </div>
      </div>      
      <div className={css`height: 500px;`}>
      </div>
    </div>  
  )
}


function Slide({ img, title, txt }) {

  const slide = css`
    position: relative;
    overflow: hidden;
    height: ${carouselHeight}px;   
  `

  const slideTitle = css`
    margin-bottom: 6px;
    color: white;
    font-size: 70px;
    font-weight: 795;
    font-variation-settings: "wdth" 151, "GRAD" -200, "YOPQ" 85, "YTUC" 760;  
  `

  const slideText = css`
    text-align: left;
    position: absolute;
    color: white;
    top: 163px;
    left: 100px;
    font-size: 40px;
    font-weight: 250;
    width: 827px;
  `

  return (
    <div className={slide}>
      <Image className='slideImage' src={img} />  
      <div className={slideText}>
        <div className={slideTitle}>
          {title}
        </div>
        <div>
          {txt}
        </div>
      </div>       
    </div>
  )
}

function ProductType({ type }) {
  let title
  switch (type) {
    case 'ceiling':
      title = 'ПОДВЕСНЫЕ'
      break
    case 'floor':
        title = 'НАПОЛЬНЫЕ'
        break
    case 'singular':
      title = 'ТОЧЕЧНЫЕ'
      break
    case 'wall':
      title = 'НАСТЕННЫЕ'
      break
    case 'wall3D':
      title = 'НАСТЕННЫЕ 3D'
      break
    case 'mirror':
      title = 'ЗЕРКАЛА'
      break          
  }

  const wrapper = css`
    display:flex;
    flex-direction: column;
    align-items: center;
  `

  const button = css`
    border: 1px solid white;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 125px;
    height: 33px;
    background-color: black;
    color: white;
    font-size: 15px;
    vertical-align: center;
    transition: 0.2s;
    &:hover {
      background-color: white;
      border: 1px solid black;
      color: black; 
    }  
  `

  return (
    <div className={wrapper}>
      <Image src={`/${type}Type.png`} height={70} width={70} />
      <div className={button}>
        <div>
          {title}
        </div> 
      </div>
    </div>
  )  
}