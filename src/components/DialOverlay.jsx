import { createPortal } from 'react-dom'

// Full-screen blur overlay listing a carousel's index names like a dial.
// Rendered in a portal: an Embla container's transform would otherwise
// hijack position:fixed and pin the overlay to the wrong page.
function DialOverlay({ names, dial, horizontal = false }) {
  const offset = `calc((${(names.length - 1) / 2} - ${dial.position}) * var(--dial-step))`
  return createPortal(
    <div
      className={
        'page-dial' +
        (horizontal ? ' page-dial--h' : '') +
        (dial.visible ? ' page-dial--visible' : '')
      }
      aria-hidden="true"
    >
      <div
        className="page-dial__track"
        style={{
          transform: horizontal
            ? `translateX(${offset})`
            : `translateY(${offset})`,
        }}
      >
        {names.map((name, i) => {
          const distance = Math.min(Math.abs(i - dial.position), 2)
          return (
            <span
              key={name}
              className="page-dial__item"
              style={{
                opacity: 1 - distance * 0.4,
                transform: `scale(${1 - distance * 0.2})`,
              }}
            >
              {name}
            </span>
          )
        })}
      </div>
    </div>,
    document.body
  )
}

export default DialOverlay
