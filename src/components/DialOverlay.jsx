import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// A page's horizontal carousel titles as an inline dial. Items keep their
// natural width and a constant gap; the strip is translated so the item
// at `position` (interpolated between neighbors while spinning) sits on
// the anchor. Measured from the DOM because title widths vary.
function Strip({ names, position }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !el.children.length) return
    const centers = Array.from(el.children).map(
      (item) => item.offsetLeft + item.offsetWidth / 2
    )
    const max = centers.length - 1
    const clamped = Math.min(Math.max(position, 0), max)
    const i = Math.min(Math.floor(clamped), max - 0)
    const j = Math.min(i + 1, max)
    const center = centers[i] + (centers[j] - centers[i]) * (clamped - i)
    el.style.transform = `translateX(${-center}px)`
  })
  return (
    <span className="page-dial__strip" ref={ref}>
      {names.map((name, k) => {
        const d = Math.min(Math.abs(k - position), 2)
        return (
          <span
            key={name}
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
              <Strip names={row.strip.names} position={row.strip.position} />
            </span>
          )
        })}
      </div>
    </div>,
    document.body
  )
}

export default DialOverlay
