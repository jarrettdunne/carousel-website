import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { pages } from './pages'
import './App.css'

function App() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', skipSnaps: true })
  const [selected, setSelected] = useState(0)
  const [dial, setDial] = useState({ visible: false, position: 0 })

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  // Blur the page and show the index names as a dial only while the
  // pointer is down (touch drag, or wheel gestures which emulate one);
  // it hides the moment the pointer lifts.
  useEffect(() => {
    if (!emblaApi) return
    // Hold on each index, then tick to the next. HOLD is the fraction of
    // the way to the neighboring page the name stays pinned on each side;
    // the remaining middle span is a quick smoothstep transition.
    const HOLD = 0.2
    const detent = (p) => {
      const page = Math.floor(p)
      const t = p - page
      const u = Math.min(Math.max((t - HOLD) / (1 - 2 * HOLD), 0), 1)
      return page + u * u * (3 - 2 * u)
    }
    const position = () =>
      detent(emblaApi.scrollProgress() * (pages.length - 1))
    const onPointerDown = () => setDial({ visible: true, position: position() })
    const onPointerUp = () => setDial((d) => ({ ...d, visible: false }))
    const onScroll = () =>
      setDial((d) => (d.visible ? { visible: true, position: position() } : d))
    emblaApi.on('pointerDown', onPointerDown)
    emblaApi.on('pointerUp', onPointerUp)
    emblaApi.on('scroll', onScroll)
    return () => {
      emblaApi.off('pointerDown', onPointerDown)
      emblaApi.off('pointerUp', onPointerUp)
      emblaApi.off('scroll', onScroll)
    }
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

  // Amplify drag distance so flipping pages feels like spinning a dial:
  // every finger-move while the pointer is down is scaled by this factor
  // (clamped at the first/last page so it can't overshoot the bounds).
  useEffect(() => {
    if (!emblaApi) return
    const DRAG_MULTIPLIER = 10
    const engine = emblaApi.internalEngine()
    let prev = null
    const onPointerDown = () => {
      prev = engine.location.get()
    }
    const onPointerUp = () => {
      prev = null
    }
    const onScroll = () => {
      if (prev === null || !engine.dragHandler.pointerDown()) return
      const current = engine.location.get()
      const boosted = engine.limit.constrain(
        prev + (current - prev) * DRAG_MULTIPLIER
      )
      const extra = boosted - current
      if (extra !== 0) {
        engine.location.add(extra)
        engine.target.add(extra)
        engine.offsetLocation.set(engine.location.get())
        engine.translate.to(engine.offsetLocation.get())
      }
      prev = engine.location.get()
    }
    emblaApi.on('pointerDown', onPointerDown)
    emblaApi.on('pointerUp', onPointerUp)
    emblaApi.on('scroll', onScroll)
    return () => {
      emblaApi.off('pointerDown', onPointerDown)
      emblaApi.off('pointerUp', onPointerUp)
      emblaApi.off('scroll', onScroll)
    }
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
      <div
        className={`page-dial${dial.visible ? ' page-dial--visible' : ''}`}
        aria-hidden="true"
      >
        <div
          className="page-dial__track"
          style={{
            transform: `translateY(calc((${(pages.length - 1) / 2} - ${dial.position}) * var(--dial-step)))`,
          }}
        >
          {pages.map((page, i) => {
            const distance = Math.min(Math.abs(i - dial.position), 2)
            return (
              <span
                key={page.name}
                className="page-dial__item"
                style={{
                  opacity: 1 - distance * 0.4,
                  transform: `scale(${1 - distance * 0.2})`,
                }}
              >
                {page.name}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
