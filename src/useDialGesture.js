import { useEffect, useState } from 'react'
import { entryForSlide } from './dialRegistry'
import { DRAG_MULTIPLIER, SHOW_THRESHOLD, detent } from './dialTuning'

// The combined dial gesture. Native Embla dragging is disabled on every
// carousel; this hook tracks the touch itself and drives both axes
// directly — vertical movement scrolls the page carousel, horizontal
// movement scrolls the carousel on the page whose dial row is in focus.
// Driving both manually means neither axis can lock the other out (Embla
// abandons a drag whose first movement is cross-axis). On release every
// touched carousel snaps to its nearest index.
export function useDialGesture(emblaApi) {
  const [vDial, setVDial] = useState({ visible: false, position: 0 })
  const [hDial, setHDial] = useState({ visible: false, position: 0 })

  useEffect(() => {
    if (!emblaApi) return
    const root = emblaApi.rootNode()

    // The slides move through the same detent as the dial rows: the raw
    // finger position accumulates per carousel, while the rendered
    // location holds on the nearest snap and ticks over with detent().
    const raw = new Map()

    const indexAt = (engine, loc) => {
      const snaps = engine.scrollSnaps
      return snaps.length > 1 ? (loc - snaps[0]) / (snaps[1] - snaps[0]) : 0
    }

    const drive = (api, delta) => {
      const engine = api.internalEngine()
      const prev = raw.has(api) ? raw.get(api) : engine.location.get()
      const next = engine.limit.constrain(prev + delta * DRAG_MULTIPLIER)
      raw.set(api, next)
      const snaps = engine.scrollSnaps
      let display = next
      if (snaps.length > 1) {
        const step = snaps[1] - snaps[0]
        display = snaps[0] + detent(indexAt(engine, next)) * step
      }
      engine.location.set(display)
      engine.target.set(display)
      engine.offsetLocation.set(display)
      engine.translate.to(display)
    }

    // Positions derive from the raw (undetented) location so the dial's
    // own detent, the show threshold, and settling all see the finger.
    const positionOf = (api) => {
      const engine = api.internalEngine()
      const loc = raw.has(api) ? raw.get(api) : engine.location.get()
      const count = api.scrollSnapList().length
      return Math.min(Math.max(indexAt(engine, loc), 0), count - 1)
    }

    const settle = (api) => api.scrollTo(Math.round(positionOf(api)))

    // Focus follows the dial: the page whose row is nearest the center.
    const focusedEntry = () =>
      entryForSlide(emblaApi.slideNodes()[Math.round(positionOf(emblaApi))])

    let last = null
    let vStart = 0
    let vShown = false
    let movedH = 0
    let active = null
    const driven = new Set()

    const onPointerDown = (e) => {
      if (!e.isPrimary) return
      // leave form fields and buttons to their own devices
      if (e.target.closest('input, textarea, select, button')) return
      last = { x: e.clientX, y: e.clientY }
      raw.clear()
      vStart = positionOf(emblaApi)
      vShown = false
      movedH = 0
      active = null
      driven.clear()
    }

    const onPointerMove = (e) => {
      if (!e.isPrimary || !last) return
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      last = { x: e.clientX, y: e.clientY }

      if (dy !== 0) {
        drive(emblaApi, dy)
        driven.add(emblaApi)
      }
      const vPos = positionOf(emblaApi)
      if (!vShown && Math.abs(vPos - vStart) > SHOW_THRESHOLD) vShown = true
      if (vShown) setVDial({ visible: true, position: detent(vPos) })

      const entry = focusedEntry()
      if (entry !== active) {
        active = entry
        movedH = 0
        if (!entry) setHDial((d) => (d.visible ? { ...d, visible: false } : d))
      }
      if (!entry) return
      if (dx !== 0) {
        drive(entry.emblaApi, dx)
        driven.add(entry.emblaApi)
        movedH += Math.abs(dx)
      }
      if (movedH > 10 || vShown) {
        setHDial({ visible: true, position: positionOf(entry.emblaApi) })
      }
    }

    const onPointerUp = (e) => {
      if (!e.isPrimary || !last) return
      last = null
      driven.forEach(settle)
      driven.clear()
      raw.clear()
      active = null
      setVDial((d) => ({ ...d, visible: false }))
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
  }, [emblaApi])

  return { vDial, hDial }
}
