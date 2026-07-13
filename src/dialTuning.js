// Shared tuning for the combined dial gesture (see useDialGesture).
export const DRAG_MULTIPLIER = 7
// Fraction of the way to the neighboring index the dial stays pinned on
// each side; the remaining middle span is a quick smoothstep transition.
const HOLD = 0.3
// Don't show the dial on mere touch — wait until the carousel has moved
// this many indices from where the finger went down.
export const SHOW_THRESHOLD = 0.1
// A touchpad reports nothing while fingers rest on it (wheel events only
// fire on movement), so a stationary hold is indistinguishable from a
// lift. Hold the dial through this much quiet before settling and hiding.
export const WHEEL_HOLD_MS = 1000

// Hold on each index, then tick to the next.
export function detent(p) {
  const page = Math.floor(p)
  const t = p - page
  const span = 1 - 2 * HOLD
  // A HOLD of 0.5 leaves no transition span; round instead of dividing
  // by zero (t exactly at HOLD would yield NaN, and a NaN position
  // leaves stale, half-clipped transforms on the dial strips).
  const u =
    span > 0
      ? Math.min(Math.max((t - HOLD) / span, 0), 1)
      : t < 0.5
        ? 0
        : 1
  return page + u * u * (3 - 2 * u)
}
