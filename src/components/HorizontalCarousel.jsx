import useEmblaCarousel from 'embla-carousel-react'

function HorizontalCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'x' })

  return (
    <div className="embla-h">
      <div className="embla-h__viewport" ref={emblaRef}>
        <div className="embla-h__container">
          {slides.map((slide, i) => (
            <div className="embla-h__slide" key={i}>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="embla-h__buttons">
        <button onClick={() => emblaApi && emblaApi.scrollPrev()}>&larr;</button>
        <button onClick={() => emblaApi && emblaApi.scrollNext()}>&rarr;</button>
      </div>
    </div>
  )
}

export default HorizontalCarousel
