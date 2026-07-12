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

  // Embla ignores drags that start on form fields, so vertical swipes
  // beginning on an input/textarea flip the page via this handler instead.
  useEffect(() => {
    if (!emblaApi) return
    const root = emblaApi.rootNode()
    let startX = 0
    let startY = 0
    let tracking = false
    let fired = false

    const onTouchStart = (e) => {
      if (!e.target.closest('input, textarea, select')) return
      tracking = true
      fired = false
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (!tracking || fired) return
      const dx = e.touches[0].clientX - startX
      const dy = e.touches[0].clientY - startY
      if (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx)) {
        fired = true
        document.activeElement?.blur()
        if (dy < 0) emblaApi.scrollNext()
        else emblaApi.scrollPrev()
      }
    }
    const onTouchEnd = () => {
      tracking = false
    }

    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchmove', onTouchMove, { passive: true })
    root.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchmove', onTouchMove)
      root.removeEventListener('touchend', onTouchEnd)
    }
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
