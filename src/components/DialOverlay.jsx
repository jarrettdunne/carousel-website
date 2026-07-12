import { createPortal } from 'react-dom'

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
              <span
                className="page-dial__strip"
                style={{
                  transform: `translateX(calc(${-(row.strip.position + 0.5)} * var(--dial-step-h)))`,
                }}
              >
                {row.strip.names.map((name, j) => {
                  const d = Math.min(Math.abs(j - row.strip.position), 2)
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
            </span>
          )
        })}
      </div>
    </div>,
    document.body
  )
}

export default DialOverlay
