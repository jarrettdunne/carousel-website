import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { registerHCarousel } from '../dialRegistry'

function HorizontalCarousel({ slides, dial }) {
  // Native dragging is off: the combined dial gesture in App drives this
  // carousel from the horizontal movement of the same touch that flips
  // the vertical pages (see useHorizontalDialGesture).
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'x', watchDrag: false })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    return registerHCarousel({
      emblaApi,
      names: slides.map((slide) => slide.title),
      dial,
    })
  }, [emblaApi, slides, dial])

  return (
    <div className="embla-h">
      <div className="embla-h__viewport" ref={emblaRef}>
        <div className="embla-h__container">
          {slides.map((slide, i) => (
            <div className="embla-h__slide" key={i}>
              {slide.kicker && <p className="slide-kicker">{slide.kicker}</p>}
              {slide.intro ? <h1>{slide.title}</h1> : <h3>{slide.title}</h3>}
              <p>{slide.text}</p>
            </div>
          ))}
        </div>
      </div>
      <nav className="embla-h__dots">
        {slides.map((slide, i) => (
          <button
            key={i}
            className={i === selected ? 'active' : ''}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            aria-label={slide.title}
            aria-current={i === selected ? 'true' : undefined}
          />
        ))}
      </nav>
    </div>
  )
}

export default HorizontalCarousel
