import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { pages } from './pages'
import './App.css'

function App() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y' }, [
    WheelGesturesPlugin(),
  ])
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  return (
    <div className="embla-v">
      <div className="embla-v__viewport" ref={emblaRef}>
        <div className="embla-v__container">
          {pages.map((page) => (
            <section className="embla-v__slide" key={page.name}>
              {page.content}
            </section>
          ))}
        </div>
      </div>
      <nav className="page-nav">
        {pages.map((page, i) => (
          <button
            key={page.name}
            className={i === selected ? 'active' : ''}
            onClick={() => scrollTo(i)}
          >
            {page.name}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
