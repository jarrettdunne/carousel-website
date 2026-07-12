import { useEffect, useState } from 'react'

// Dial-style scroll feel shared by the vertical page carousel and the
// horizontal carousels: drag distance is amplified, and while dragging a
// blur overlay (rendered by DialOverlay) shows the index names, holding
// on each one before ticking to the next.
export const DRAG_MULTIPLIER = 10
// Fraction of the way to the neighboring index the dial stays pinned on
// each side; the remaining middle span is a quick smoothstep transition.
const HOLD = 0.4
// Don't show the overlay on mere touch — wait until the carousel has
// moved this many indices from where the finger went down.
const SHOW_THRESHOLD = 0.1

// Hold on each index, then tick to the next.
export function detent(p) {
  const page = Math.floor(p)
  const t = p - page
  const u = Math.min(Math.max((t - HOLD) / (1 - 2 * HOLD), 0), 1)
  return page + u * u * (3 - 2 * u)
}

export function useDialScroll(emblaApi, count) {
  const [dial, setDial] = useState({ visible: false, position: 0 })

  // Track the drag and expose the dial position, held on each index by
  // the detent curve; hide the moment the pointer lifts.
  useEffect(() => {
    if (!emblaApi || count < 2) return
    const raw = () => emblaApi.scrollProgress() * (count - 1)
    let downPosition = null
    const onPointerDown = () => {
      downPosition = raw()
    }
    const onPointerUp = () => {
      downPosition = null
      setDial((d) => ({ ...d, visible: false }))
    }
    const onScroll = () => {
      if (downPosition === null) return
      const moved = Math.abs(raw() - downPosition) > SHOW_THRESHOLD
      setDial((d) =>
        d.visible || moved ? { visible: true, position: detent(raw()) } : d
      )
    }
    emblaApi.on('pointerDown', onPointerDown)
    emblaApi.on('pointerUp', onPointerUp)
    emblaApi.on('scroll', onScroll)
    return () => {
      emblaApi.off('pointerDown', onPointerDown)
      emblaApi.off('pointerUp', onPointerUp)
      emblaApi.off('scroll', onScroll)
    }
  }, [emblaApi, count])

  // Amplify drag distance so flipping feels like spinning a dial: every
  // finger-move while the pointer is down is scaled by the multiplier
  // (clamped at the first/last index so it can't overshoot the bounds).
  useEffect(() => {
    if (!emblaApi) return
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

  return dial
}
