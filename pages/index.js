import Head from 'next/head'
import Image from 'next/image'
import lamp1Image from '../public/lamp1.jpg'
import lamp2Image from '../public/lamp2.jpg'
import lamp3Image from '../public/lamp3.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { css } from '@emotion/css'

const mainWrapper = css`
  display: flex;
  flex-direction: column;
`

const carousel = css`
  display: flex;
  justify-content: center;
  background-color: #dfdfdf;
`

const slide = css`
  position: relative;
`

const slideText = css`
  text-align: left;
  position: absolute;
  color: white;
  top: 163px;
  left: 10px;
  font-size: 40px;
  font-weight: 250;
  width: 827px;

`

const dak = css`
  margin-bottom: 6px;
  color: white;
  font-size: 70px;
  font-weight: 795;
  font-style: oblique 10deg;
  font-variation-settings: "wdth" 151, "GRAD" -200, "YOPQ" 85, "YTUC" 760;  
`

const productTypes = css`

`

export default function Home() {
  return (
    <div className={mainWrapper}>
      <div className={carousel}>
        <Carousel showStatus={false} autoPlay={true} infiniteLoop={true} width={1024} dynamicHeight={true}>
          <div>
            <div className={slide}>
              <Image src={lamp1Image} width={1024} />
              <div className={slideText}>
                <div className={dak}>
                  DAK
                </div>
                <div>
                  ДИЗАЙНЕРСКИЕ СВЕТИЛЬНИКИ ИЗ ДЕРЕВА КАК НУЖНО ИМЕННО ВАМ
                </div>
              </div>  
            </div>  
          </div>
          <div>
            <Image src={lamp2Image} width={1024} />
          </div> 
          <div>
            <Image src={lamp3Image} width={1024} />
          </div>                
        </Carousel>
      </div> 
      <div className={productTypes}>

      </div> 
    </div>  
  )
}

