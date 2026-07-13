import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import DialOverlay from './components/DialOverlay'
import { useDialGesture } from './useDialGesture'
import { detent } from './dialTuning'
import { entryForSlide } from './dialRegistry'
import { pages } from './pages'
import './App.css'

function App() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', watchDrag: false })
  const [selected, setSelected] = useState(0)
  const { vDial, hDial } = useDialGesture(emblaApi)

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
            aria-label={page.name}
            aria-current={i === selected ? 'page' : undefined}
          />
        ))}
      </nav>
      <DialOverlay
        rows={pages.map((page, i) => {
          const row = { key: page.name, label: page.dial ?? page.name }
          const entry = emblaApi && entryForSlide(emblaApi.slideNodes()[i])
          if (entry) {
            const count = entry.emblaApi.scrollSnapList().length
            row.strip = {
              names: entry.dial?.names ?? entry.names,
              prefix: entry.dial?.prefix,
              prefixTail: entry.dial?.prefixTail,
              position: detent(entry.emblaApi.scrollProgress() * (count - 1)),
            }
          }
          return row
        })}
        dial={{
          visible: vDial.visible || hDial.visible,
          position: vDial.visible ? vDial.position : selected,
        }}
      />
    </div>
  )
}

export default App
