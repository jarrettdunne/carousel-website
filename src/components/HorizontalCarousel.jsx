import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import DialOverlay from './DialOverlay'
import { useDialScroll } from '../useDialScroll'

function HorizontalCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'x', skipSnaps: true })
  const [selected, setSelected] = useState(0)
  const dial = useDialScroll(emblaApi, slides.length)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

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
      <DialOverlay
        names={slides.map((slide) => slide.title)}
        dial={dial}
        horizontal
      />
    </div>
  )
}

export default HorizontalCarousel
