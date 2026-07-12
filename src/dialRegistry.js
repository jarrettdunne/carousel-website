// Horizontal carousels register here so the combined dial gesture can
// find the one sitting on the page the vertical carousel has selected.
export const hCarousels = new Set()

export function registerHCarousel(entry) {
  hCarousels.add(entry)
  return () => hCarousels.delete(entry)
}

export function entryForSlide(slideNode) {
  for (const entry of hCarousels) {
    if (slideNode.contains(entry.emblaApi.rootNode())) return entry
  }
  return null
}
