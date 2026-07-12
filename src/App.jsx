import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import DialOverlay from './components/DialOverlay'
import { useDialScroll } from './useDialScroll'
import { pages } from './pages'
import './App.css'

function App() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', skipSnaps: true })
  const [selected, setSelected] = useState(0)
  const dial = useDialScroll(emblaApi, pages.length)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  // One mouse-wheel gesture flips exactly one page. Events arriving in
  // quick succession (fast wheel spins, trackpad inertia) count as the
  // same gesture and keep extending the lock instead of flipping again.
  useEffect(() => {
    if (!emblaApi) return
    const root = emblaApi.rootNode()
    let lockUntil = 0
    let lastEvent = 0
    let acc = 0
    const onWheel = (e) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastEvent > 250) acc = 0
      lastEvent = now
      if (now < lockUntil) {
        lockUntil = now + 250
        return
      }
      acc += e.deltaY
      if (Math.abs(acc) < 10) return
      if (acc > 0) emblaApi.scrollNext()
      else emblaApi.scrollPrev()
      acc = 0
      lockUntil = now + 250
    }
    root.addEventListener('wheel', onWheel, { passive: false })
    return () => root.removeEventListener('wheel', onWheel)
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
            aria-label={page.name}
            aria-current={i === selected ? 'page' : undefined}
          />
        ))}
      </nav>
      <DialOverlay
        names={pages.map((page) => page.dial ?? page.name)}
        dial={dial}
      />
    </div>
  )
}

export default App
