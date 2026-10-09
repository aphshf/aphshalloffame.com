/* eslint-disable @next/next/no-img-element */
'use client'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PrevArrow = ({ onClick, className }) => (
  <ChevronDoubleLeftIcon
    className={`${className} h-8 w-8 text-black hover:text-black`}
    style={{ left: '-38px' }}
    onClick={onClick}
  />
)

const NextArrow = ({ onClick, className }) => (
  <ChevronDoubleRightIcon
    className={`${className} h-8 w-8 text-black hover:text-black`}
    style={{ right: '-38px' }}
    onClick={onClick}
  />
)

const GallerySlider = ({ photos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // @ts-ignore
    nextArrow: <NextArrow />,
    // @ts-ignore
    prevArrow: <PrevArrow />,
  }

  return (
    <div className="mx-auto w-100 text-center my-12 my-lg-5">
      <Slider {...settings}>
        {photos?.map(({ altText, src, height, width }, index) => (
          <div key={`slide-${index}`}>
            <img
              // Slides display 600px tall, so request 2x that instead of the original upload
              src={src.replace('/f_auto,q_auto/', '/f_auto,q_auto,h_1200/')}
              alt={altText}
              width={Math.round((width / height) * 600)}
              height={600}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="mx-auto"
              style={{
                height: 600,
                width: 'auto',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default GallerySlider
