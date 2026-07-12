import HorizontalCarousel from './components/HorizontalCarousel'

const aboutSlides = [
  {
    kicker: 'The House',
    title: 'About',
    text: 'Finer Actual Designs is a small studio devoted to identities, interfaces, and printed matter of unreasonable quality. We keep the roster short and the standards long.',
    intro: true,
  },
  {
    kicker: 'Since 2019',
    title: 'Story',
    text: 'The studio began in 2019 as two designers sharing a single desk and a strong opinion about typefaces. Seven years and some forty commissions later, the desk is larger. The principle is unchanged: every decision should be defensible, and most of them should be invisible.',
  },
  {
    kicker: 'What We Hold To',
    title: 'Values',
    text: 'Craft over volume. We accept a handful of commissions each year so that each receives our complete attention. Clarity over cleverness. If a design requires explanation, it requires revision. Honesty over comfort. When the brief itself is the problem, we will say so, because polishing the wrong idea helps no one.',
  },
  {
    kicker: 'Four Chairs',
    title: 'Team',
    text: 'We are four people: two designers, one engineer, and one strategist who keeps the rest of us honest. There are no account managers and no handoffs. The people you meet on the first day are the people doing the work on the last.',
  },
  {
    kicker: 'The Practice',
    title: 'Craft',
    text: 'Everything leaves the studio proofed, printed, and pressure-tested. We draw our own letterforms when the occasion asks for it, retouch by hand, and keep a flat file of every project since the first. Perfection is not the goal. Intention is.',
  },
]

const portfolioSlides = [
  {
    kicker: 'Selected Work',
    title: 'Portfolio',
    text: 'A few recent commissions. Each began with a question worth answering; the design followed from there.',
    intro: true,
  },
  {
    kicker: 'Identity & Web',
    title: 'Meridian',
    text: 'A complete identity and web presence for a cartography startup. The wordmark, the grid, and the site itself all borrow from the discipline of charts: fixed bearings, honest scale, and no ornament that does not navigate.',
  },
  {
    kicker: 'Brand & Packaging',
    title: 'Hearth',
    text: 'Brand and packaging for a ceramics studio in the Hudson Valley. We built the identity around the kiln itself: warm neutrals, imperfect edges, and a mark that shifts slightly with every print run, the way no two firings are alike.',
  },
  {
    kicker: 'Product Design',
    title: 'Ledger',
    text: 'An interface overhaul for a bookkeeping platform drowning in its own features. We cut the primary navigation from eleven items to four, rebuilt the data views around what accountants actually scan for, and drew a type system that keeps dense tables legible at a glance. Support tickets about finding things fell by half within a quarter.',
  },
  {
    kicker: 'Exhibition',
    title: 'Aperture',
    text: 'Exhibition design and catalogue for a photography retrospective. Two hundred images across four rooms, sequenced so the story built rather than blurred. We treated the floor plan as an edit, not a hang.',
  },
  {
    kicker: 'Naming & App',
    title: 'Fieldnote',
    text: 'Naming, identity, and app design for a birding journal that wanted to feel like a pocket notebook rather than a database. Ink lines, paper textures, and not a single notification.',
  },
  {
    kicker: 'Identity & Packaging',
    title: 'Solstice',
    text: 'Identity and packaging for a small perfume house. Two ideas carried everything: light at its longest, and restraint at its most fragrant. Blind emboss, cotton paper, and a bottle that reads as well on a shelf as it does in the hand.',
  },
]

// Dial strips: the prefix sticks to the left of the dial anchor and the
// names scroll past it, so the strip reads "About Our Story", "Project
// Meridian", ... The intro slides contribute an empty name so the prefix
// stands alone. Portfolio's trailing "s" lives on the prefix and fades
// out when leaving the intro ("Projects" -> "Project Meridian").
const aboutDial = {
  prefix: 'About',
  names: ['', 'Our Story', 'Our Values', 'Our Team', 'Our Craft'],
}

const portfolioDial = {
  prefix: 'Project',
  prefixTail: 's',
  names: [
    '',
    'Meridian',
    'Hearth',
    'Ledger',
    'Aperture',
    'Fieldnote',
    'Solstice',
  ],
}

export const pages = [
  {
    name: 'Welcome',
    dial: '•••',
    content: (
      <>
        {/* FAD monogram in the YSL manner: italic serif capitals stacked
            in an overlapping downward cascade, drifting slightly right. */}
        <svg
          className="landing-monogram"
          viewBox="0 0 240 330"
          aria-hidden="true"
        >
          <g
            fontFamily="Didot, 'Bodoni MT', 'Playfair Display', Georgia, 'Times New Roman', serif"
            fontStyle="italic"
            fontSize="150"
            fill="currentColor"
          >
            <text x="96" y="122" textAnchor="middle">
              F
            </text>
            <text x="122" y="200" textAnchor="middle">
              A
            </text>
            <text x="148" y="278" textAnchor="middle">
              D
            </text>
          </g>
        </svg>
        {/* Fashion-house lockup: stacked caps in a high-contrast serif,
            tracked wide. Centered text gains a trailing letter-space, so
            x is nudged right by half the tracking. */}
        <svg
          className="landing-wordmark"
          viewBox="0 0 640 340"
          role="img"
          aria-label="Finer Actual Designs"
        >
          <title>Finer Actual Designs</title>
          <g
            fontFamily="Didot, 'Bodoni MT', 'Playfair Display', Georgia, 'Times New Roman', serif"
            fontSize="76"
            fill="currentColor"
          >
            <text x="335" y="92" textAnchor="middle" letterSpacing="30">
              FINER
            </text>
            <text x="333" y="182" textAnchor="middle" letterSpacing="26">
              ACTUAL
            </text>
            <text x="331" y="272" textAnchor="middle" letterSpacing="22">
              DESIGNS
            </text>
          </g>
          <text
            x="323"
            y="322"
            textAnchor="middle"
            fontFamily="Didot, 'Bodoni MT', 'Playfair Display', Georgia, 'Times New Roman', serif"
            fontSize="17"
            letterSpacing="7"
            fill="currentColor"
            opacity="0.65"
          >
            EST. 2019
          </text>
        </svg>
        <p className="landing-hint">Scroll to explore</p>
      </>
    ),
  },
  {
    name: 'Home',
    content: (
      <>
        <p className="slide-kicker">Est. 2019</p>
        <h1>The Studio</h1>
        <p>
          Finer Actual Designs is a four-person studio working across brand,
          digital, and print. We take on a small number of commissions at a
          time and stay close to every detail, from the first sketch to the
          final production file.
        </p>
        <p>
          The work is quiet by intention. A good identity does not raise its
          voice; it simply makes everything around it look considered. That is
          the standard we hold every project to, whether it is a wordmark, an
          interface, or a box that will be opened once and remembered.
        </p>
        <p>If you have something worth making carefully, we should talk.</p>
        <p className="services-line">
          Identity &middot; Digital &middot; Print &middot; Packaging
        </p>
      </>
    ),
  },
  {
    name: 'About',
    content: <HorizontalCarousel slides={aboutSlides} dial={aboutDial} />,
  },
  {
    name: 'Portfolio',
    content: (
      <HorizontalCarousel slides={portfolioSlides} dial={portfolioDial} />
    ),
  },
  {
    name: 'Contact',
    content: (
      <>
        <p className="slide-kicker">Correspondence</p>
        <h1>Enquiries</h1>
        <p>
          Tell us what you are making. We read everything and reply within two
          business days. The studio opens a small number of commissions each
          season; enquiries for autumn are welcome now.
        </p>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Thank you. (form not wired up yet)')
          }}
        >
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="What are you working on?"
              required
            />
          </label>
          <button type="submit">Send Enquiry</button>
        </form>
        <p>hello@fineractualdesigns.studio &middot; +1 (555) 010-0100</p>
      </>
    ),
  },
]
