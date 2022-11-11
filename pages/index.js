import Head from 'next/head'
import Image from 'next/image'
import lamp1Image from '../public/lamp1.jpg'
import lamp2Image from '../public/lamp2.jpg'
import lamp3Image from '../public/lamp3.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { css } from '@emotion/css'
import Button from '../lib/components/Button.js'


const carouselHeight = 600;

const mainWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border-bottom: 1px solid black;
  padding-bottom: 42px;  
`

const featuredProducts = css`
  display: flex;
  flex-direction: column;
  margin-top: 50px;  
  align-items: center;
`  
const featuredProductsTitle = css`
  color: black;
  font-size: 30px;
  font-weight: 450;
  font-stretch: 55%;
` 

const featuredProductsList = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1183px;
  margin-top: 30px;
  margin-bottom: 30px;
  gap: 30px;

`

const featuredProductsListWrapper = css`
  width: 100em;
  background-color: #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
`

const katalogButton = css`
  font-size: 29px;
  font-weight: 250;
  margin-top: 10px;
`

export default function Home({ featuredItems }) {
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
        {['ceiling', 'floor', 'wall', 'singular', 'wall3D', 'mirror'].map((type, i) => <ProductType type={type} key={i} />)}
      </div> 
      <div className={featuredProducts}>
        <div className={featuredProductsTitle}>
          РЕКОМЕНДОВАННЫЕ ТОВАРЫ
        </div>
        <div className={featuredProductsListWrapper}>
          <div className={featuredProductsList}>
            {featuredItems.map((item, i) => <FeaturedProduct name={item[0]} url={item[1]} key={i} /> )}
          </div>
        </div> 
        <div className={katalogButton}>
          <Button label={'КАТАЛОГ'} width={210} height={70}/> 
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

function FeaturedProduct({ name, url}) {
  const productItem = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    color: black;
    font-size: 26px;
    font-weight: 441;
    font-stretch: 35%;   
    &:hover {
      transform: scale(1.2, 1.2);
      transition: 0.2s;
    }      
  `

  const itemName = css`
  `

  return (
    <div className={productItem}>
      <Image src={url} width={370} height={246.787109375} />
      <div className={itemName}>
        {name}
      </div>
      <div>
      </div>
      <div>
      </div>
    </div>  
  )
}

export async function getStaticProps() {
  const fs = require('fs');

  let data
  try {
    data = fs.readFileSync('json/featured_products.json', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }  

  const featuredItems = JSON.parse(data)

  return {
    props: { featuredItems }
  }  
}