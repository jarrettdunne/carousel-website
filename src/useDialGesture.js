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

    const drive = (api, delta) => {
      const engine = api.internalEngine()
      const next = engine.limit.constrain(
        engine.location.get() + delta * DRAG_MULTIPLIER
      )
      engine.location.set(next)
      engine.target.set(next)
      engine.offsetLocation.set(next)
      engine.translate.to(next)
    }

    const positionOf = (api) => {
      const count = api.scrollSnapList().length
      const progress = Math.min(Math.max(api.scrollProgress(), 0), 1)
      return progress * (count - 1)
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
