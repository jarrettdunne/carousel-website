import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// A page's horizontal carousel titles as an inline dial. On the intro
// item the prefix sits centered on the anchor like a plain dial row;
// scrolling toward the named items slides it left until its right edge
// reaches the anchor, where it sticks. The names scroll through a
// clipped window on its right, translated so the item at `position`
// (interpolated between neighbors while spinning) starts at the anchor —
// letters that scroll past it vanish under the window's edge. An
// optional prefix tail ("Project[s]") fades and collapses as the strip
// leaves the intro item. Measured from the DOM because widths vary.
function Strip({ prefix, prefixTail, names, position }) {
  const ref = useRef(null)
  const shiftRef = useRef(null)
  const prefixRef = useRef(null)
  const t = Math.min(Math.max(position, 0), 1)
  useLayoutEffect(() => {
    const el = ref.current
    if (el && el.children.length) {
      const lefts = Array.from(el.children).map((item) => item.offsetLeft)
      const max = lefts.length - 1
      const clamped = Math.min(Math.max(position, 0), max)
      const i = Math.floor(clamped)
      const j = Math.min(i + 1, max)
      const left = lefts[i] + (lefts[j] - lefts[i]) * (clamped - i)
      el.style.transform = `translateX(${lefts[0] - left}px)`
    }
    const shift = shiftRef.current
    if (shift) {
      const w = prefixRef.current ? prefixRef.current.offsetWidth : 0
      shift.style.transform = `translateX(${(w / 2) * (1 - t)}px)`
    }
  })
  return (
    <span className="page-dial__strip-shift" ref={shiftRef}>
      {prefix && (
        <span className="page-dial__strip-prefix" ref={prefixRef}>
          {prefix}
          {prefixTail && (
            <span
              className="page-dial__strip-tail"
              style={{ opacity: 1 - t, width: `${(1 - t) * 0.7}em` }}
            >
              {prefixTail}
            </span>
          )}
        </span>
      )}
      <span className="page-dial__strip-window">
        <span className="page-dial__strip" ref={ref}>
          {names.map((name, k) => {
            const d = Math.min(Math.max(k - position, 0), 2)
            return (
              <span
                key={k}
                className="page-dial__strip-item"
                style={{
                  opacity: 1 - d * 0.45,
                  transform: `scale(${1 - d * 0.35})`,
                }}
              >
                {name}
              </span>
            )
          })}
        </span>
      </span>
    </span>
  )
}

// Full-screen blur overlay listing the page names like a dial. A row may
// carry a `strip` — the horizontal carousel of that page — rendered as a
// horizontal dial of titles inline, in place of the page's name.
// Rendered in a portal: an Embla container's transform would otherwise
// hijack position:fixed and pin the overlay to the wrong page.
function DialOverlay({ rows, dial }) {
  const offset = `calc((${(rows.length - 1) / 2} - ${dial.position}) * var(--dial-step))`
  return createPortal(
    <div
      className={'page-dial' + (dial.visible ? ' page-dial--visible' : '')}
      aria-hidden="true"
    >
      <div
        className="page-dial__track"
        style={{ transform: `translateY(${offset})` }}
      >
        {rows.map((row, i) => {
          const distance = Math.min(Math.abs(i - dial.position), 2)
          const style = {
            opacity: 1 - distance * 0.4,
            transform: `scale(${1 - distance * 0.2})`,
          }
          if (!row.strip) {
            return (
              <span key={row.key} className="page-dial__item" style={style}>
                {row.label}
              </span>
            )
          }
          return (
            <span
              key={row.key}
              className="page-dial__item page-dial__item--strip"
              style={style}
            >
              <Strip
                prefix={row.strip.prefix}
                prefixTail={row.strip.prefixTail}
                names={row.strip.names}
                position={row.strip.position}
              />
            </span>
          )
        })}
      </div>
    </div>,
    document.body
  )
}

export default DialOverlay
