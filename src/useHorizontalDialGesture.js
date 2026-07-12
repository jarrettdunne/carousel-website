import { useEffect, useState } from 'react'
import { entryForSlide } from './dialRegistry'
import { DRAG_MULTIPLIER, detent } from './useDialScroll'

// Second half of the combined dial gesture: while a touch drags the
// vertical page carousel, the same touch's horizontal movement drives
// the horizontal carousel on the currently selected page. Horizontal
// carousels have native dragging disabled and register themselves in
// dialRegistry. The titles show alongside the vertical page dial as a
// cross — engagedRef mirrors whether the page dial is up, so the titles
// row appears with it (or on its own after enough sideways movement).
export function useHorizontalDialGesture(emblaApi, engagedRef) {
  const [hDial, setHDial] = useState({
    visible: false,
    position: 0,
    names: null,
  })

  useEffect(() => {
    if (!emblaApi) return
    const root = emblaApi.rootNode()
    let lastX = null
    let moved = 0
    let active = null
    const driven = new Set()

    // Focus follows the dial: the page whose row is nearest the center
    // line, not Embla's lagging "selected" snap.
    const focusedIndex = () => {
      const count = emblaApi.scrollSnapList().length
      const progress = Math.min(Math.max(emblaApi.scrollProgress(), 0), 1)
      return Math.round(progress * (count - 1))
    }
    const currentEntry = () =>
      entryForSlide(emblaApi.slideNodes()[focusedIndex()])

    const drive = (entry, dx) => {
      const engine = entry.emblaApi.internalEngine()
      const next = engine.limit.constrain(
        engine.location.get() + dx * DRAG_MULTIPLIER
      )
      engine.location.set(next)
      engine.target.set(next)
      engine.offsetLocation.set(next)
      engine.translate.to(next)
    }

    const position = (entry) => {
      const count = entry.emblaApi.scrollSnapList().length
      return entry.emblaApi.scrollProgress() * (count - 1)
    }

    const settle = (entry) => {
      const api = entry.emblaApi
      const count = api.scrollSnapList().length
      const clamped = Math.min(Math.max(api.scrollProgress(), 0), 1)
      api.scrollTo(Math.round(clamped * (count - 1)))
    }

    const onPointerDown = (e) => {
      if (!e.isPrimary) return
      lastX = e.clientX
      moved = 0
      active = null
      driven.clear()
    }

    const onPointerMove = (e) => {
      if (!e.isPrimary || lastX === null) return
      const dx = e.clientX - lastX
      lastX = e.clientX
      const entry = currentEntry()
      if (entry !== active) {
        active = entry
        moved = 0
      }
      if (!entry) {
        setHDial((d) => (d.visible ? { ...d, visible: false } : d))
        return
      }
      if (dx !== 0) {
        drive(entry, dx)
        driven.add(entry)
        moved += Math.abs(dx)
      }
      const show = moved > 10 || engagedRef.current
      setHDial((d) =>
        show || d.visible
          ? {
              visible: true,
              position: detent(position(entry)),
              names: entry.names,
            }
          : d
      )
    }

    const onPointerUp = (e) => {
      if (!e.isPrimary) return
      lastX = null
      driven.forEach(settle)
      driven.clear()
      active = null
      setHDial((d) => ({ ...d, visible: false }))
    }

    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointermove', onPointerMove)
    root.addEventListener('pointerup', onPointerUp)
    root.addEventListener('pointercancel', onPointerUp)
    return () => {
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerup', onPointerUp)
      root.removeEventListener('pointercancel', onPointerUp)
    }
  }, [emblaApi, engagedRef])

  return hDial
}
