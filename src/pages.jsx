import HorizontalCarousel from './components/HorizontalCarousel'

const aboutSlides = [
  {
    kicker: 'The House',
    title: 'The Studio',
    text: [
      'Finer Actual Designs is a four-person studio working across brand, digital, and print. We take on a small number of commissions at a time and stay close to every detail, from the first sketch to the final production file.',
      'The work is quiet by intention. A good identity does not raise its voice; it simply makes everything around it look considered. If you have something worth making carefully, we should talk.',
    ],
    services: 'Identity · Digital · Print · Packaging',
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
    text: 'Three commitments, kept in this order.',
    people: [
      {
        name: 'Craft over volume',
        bio: 'We accept a handful of commissions each year so that each receives our complete attention. The calendar is the first design tool.',
      },
      {
        name: 'Clarity over cleverness',
        bio: 'If a design requires explanation, it requires revision. The audience should never need the deck.',
      },
      {
        name: 'Honesty over comfort',
        bio: 'When the brief itself is the problem, we will say so, because polishing the wrong idea helps no one.',
      },
    ],
  },
  {
    kicker: 'Four Chairs',
    title: 'Team',
    text: 'We are four people: two designers, one engineer, and one strategist who keeps the rest of us honest. There are no account managers and no handoffs. The people you meet on the first day are the people doing the work on the last.',
    people: [
      {
        name: 'Mara Ellingsen',
        role: 'Design, Co-founder',
        bio: 'Mara came up through editorial design in Oslo and still lays out a spread faster than anyone in the room. She leads identity work and keeps the studio type library, which outweighs the rest of the studio combined.',
      },
      {
        name: 'Jonah Reyes',
        role: 'Design, Co-founder',
        bio: 'Jonah spent six years designing exhibitions before switching to screens, and it shows: his interfaces read like well-hung rooms. He co-founded the studio with Mara over a shared desk and a disagreement about grids that neither has conceded.',
      },
      {
        name: 'Priya Raghunathan',
        role: 'Engineering',
        bio: 'Priya builds everything the studio ships, from single-page sites to full products. A recovering physicist, she holds animation to believable physics and reviews motion curves the way editors review sentences.',
      },
      {
        name: 'Camille Strand',
        role: 'Strategy',
        bio: 'Camille ran brand strategy at agencies too large to name before going small on purpose. She writes the briefs, questions the briefs, and makes sure the work answers to something real. Clients meet her first and thank her last.',
      },
    ],
  },
  {
    kicker: 'The Practice',
    title: 'Craft',
    text: 'Everything leaves the studio proofed, printed, and pressure-tested. We draw our own letterforms when the occasion asks for it, retouch by hand, and keep a flat file of every project since the first. Perfection is not the goal. Intention is.',
  },
]

// Marks for the portfolio's fictional clients, one line-drawn emblem
// each: a compass rose for the cartographers, a kiln arch for the
// ceramicists, ruled columns for the bookkeepers, a viewfinder for the
// photographers, a feather for the birders, and an eclipse for the
// perfumers.
function ProjectLogo({ children }) {
  return (
    <svg
      className="project-logo"
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

const logos = {
  meridian: (
    <ProjectLogo>
      {/* compass rose: four-point star, center pin, north tick */}
      <path d="M32 10 L36 28 L54 32 L36 36 L32 54 L28 36 L10 32 L28 28 Z" />
      <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
      <line x1="32" y1="6" x2="32" y2="2" />
    </ProjectLogo>
  ),
  hearth: (
    <ProjectLogo>
      {/* thrown bowl: open rim, round belly, small foot */}
      <ellipse cx="32" cy="22" rx="18" ry="5" />
      <path d="M14 22 A18 20 0 0 0 50 22" />
      <line x1="27" y1="47" x2="37" y2="47" />
    </ProjectLogo>
  ),
  ledger: (
    <ProjectLogo>
      <line x1="14" y1="21" x2="50" y2="21" />
      <line x1="14" y1="32" x2="50" y2="32" />
      <line x1="14" y1="43" x2="50" y2="43" />
      <line x1="26" y1="14" x2="26" y2="50" />
    </ProjectLogo>
  ),
  aperture: (
    <ProjectLogo>
      {/* viewfinder: corner brackets around a lens dot */}
      <path d="M12 22 V12 H22" />
      <path d="M42 12 H52 V22" />
      <path d="M52 42 V52 H42" />
      <path d="M22 52 H12 V42" />
      <circle cx="32" cy="32" r="6" />
      <circle cx="32" cy="32" r="1.5" fill="currentColor" stroke="none" />
    </ProjectLogo>
  ),
  fieldnote: (
    <ProjectLogo>
      <path d="M42 12 C 29 17 21 33 20 50" />
      <path d="M42 12 C 47 27 38 43 20 50" />
      <line x1="27" y1="39" x2="36" y2="36" />
      <line x1="31" y1="29" x2="40" y2="26" />
    </ProjectLogo>
  ),
  solstice: (
    <ProjectLogo>
      {/* eclipse: full disc kissing a hairline ring, light at its longest */}
      <circle cx="26" cy="38" r="12" fill="currentColor" stroke="none" />
      <circle cx="40" cy="24" r="12" />
    </ProjectLogo>
  ),
}

const portfolioSlides = [
  {
    kicker: 'Selected Work',
    title: 'Projects',
    text: "A few recent commissions. Each began with a question worth answering; the design followed from there. Several more live behind other people's launch dates; ask, and we may be able to show you.",
    intro: true,
  },
  {
    logo: logos.meridian,
    kicker: 'Identity & Web',
    title: 'Meridian',
    meta: '2025 · Wordmark, grid system, site',
    text: 'A complete identity and web presence for a cartography startup. The wordmark, the grid, and the site itself all borrow from the discipline of charts: fixed bearings, honest scale, and no ornament that does not navigate.',
  },
  {
    logo: logos.hearth,
    kicker: 'Brand & Packaging',
    title: 'Hearth',
    meta: '2024 · Mark, packaging, print',
    text: 'Brand and packaging for a ceramics studio in the Hudson Valley. We built the identity around the kiln itself: warm neutrals, imperfect edges, and a mark that shifts slightly with every print run, the way no two firings are alike.',
  },
  {
    logo: logos.ledger,
    kicker: 'Product Design',
    title: 'Ledger',
    meta: '2024 · Product audit, UI system, type',
    text: 'An interface overhaul for a bookkeeping platform drowning in its own features. We cut the primary navigation from eleven items to four, rebuilt the data views around what accountants actually scan for, and drew a type system that keeps dense tables legible at a glance. Support tickets about finding things fell by half within a quarter.',
  },
  {
    logo: logos.aperture,
    kicker: 'Exhibition',
    title: 'Aperture',
    meta: '2023 · Exhibition, catalogue, wayfinding',
    text: 'Exhibition design and catalogue for a photography retrospective. Two hundred images across four rooms, sequenced so the story built rather than blurred. We treated the floor plan as an edit, not a hang.',
  },
  {
    logo: logos.fieldnote,
    kicker: 'Naming & App',
    title: 'Fieldnote',
    meta: '2023 · Name, identity, iOS app',
    text: 'Naming, identity, and app design for a birding journal that wanted to feel like a pocket notebook rather than a database. Ink lines, paper textures, and not a single notification.',
  },
  {
    logo: logos.solstice,
    kicker: 'Identity & Packaging',
    title: 'Solstice',
    meta: '2022 · Identity, packaging, launch',
    text: 'Identity and packaging for a small perfume house. Two ideas carried everything: light at its longest, and restraint at its most fragrant. Blind emboss, cotton paper, and a bottle that reads as well on a shelf as it does in the hand.',
  },
]

const processSlides = [
  {
    kicker: 'How We Work',
    title: 'Process',
    text: [
      'Every commission moves through five phases. The order never changes; the care taken in each is the point.',
      'We run one project per designer at a time, so the calendar we quote is the calendar you get. A typical engagement runs ten to sixteen weeks from first letter to final files.',
    ],
    intro: true,
  },
  {
    kicker: 'Phase One',
    title: 'Enquiry',
    meta: 'An hour, on us',
    text: 'It starts with a letter, not a form. Tell us what you are making and why it matters. We reply within two business days, and the first conversation costs nothing but an hour. If we are not the right studio, we will say so and suggest who might be.',
  },
  {
    kicker: 'Phase Two',
    title: 'Brief',
    meta: 'Two weeks, together',
    text: 'We write the brief together and interrogate it until it stops moving. Budget, audience, appetite for risk: everything is on the table before anything is on the page. Most projects are won or lost here, which is why we refuse to hurry it.',
  },
  {
    kicker: 'Phase Three',
    title: 'Design',
    meta: 'Four to six weeks',
    text: 'Two or three directions, shown as real artifacts rather than mood boards: a cover, a homepage, a box. We present the thinking behind each and recommend one, with reasons you can repeat to your board.',
  },
  {
    kicker: 'Phase Four',
    title: 'Build',
    meta: 'Four to eight weeks',
    text: 'The chosen direction becomes the real thing: production files, a live site, a printed proof you can hold. Nothing ships that we have not used ourselves first.',
  },
  {
    kicker: 'Phase Five',
    title: 'Delivery',
    meta: 'One week, then forever',
    text: 'You receive the work, the sources, and a guide a future hire can follow without us. Then we stay reachable; small questions are answered for free, forever. Good identities are gardens, not monuments.',
  },
]

const honors = [
  {
    name: 'National Design Annual',
    detail: 'Identity of the Year shortlist, 2025 · Solstice',
  },
  {
    name: 'Type Directors Club',
    detail: 'Certificate of Typographic Excellence, 2024',
  },
  { name: 'The Brand Files', detail: 'Studio of the Month, March 2024' },
  { name: 'AIGA 50/50', detail: 'Selected work, 2023 · Hearth' },
  { name: 'Site Honors', detail: 'Site of the Day, 2023 · Meridian' },
  { name: 'Print Regional Annual', detail: 'Two selections, 2022' },
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

const processDial = {
  prefix: 'Process',
  names: ['', 'Enquiry', 'Brief', 'Design', 'Build', 'Delivery'],
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
        <p className="landing-hint">Hold and drag to explore</p>
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
    name: 'Process',
    content: <HorizontalCarousel slides={processSlides} dial={processDial} />,
  },
  {
    name: 'Recognition',
    content: (
      <>
        <p className="slide-kicker">Juries &amp; Journals</p>
        <h1>Recognition</h1>
        <p>
          The work answers to clients first; occasionally juries and journals
          answer too. A selection from recent years.
        </p>
        <ul className="credit-list">
          {honors.map((honor) => (
            <li key={honor.name}>
              <span className="credit-name">{honor.name}</span>
              <span className="credit-role">{honor.detail}</span>
            </li>
          ))}
        </ul>
        <div className="quote-grid">
          <blockquote className="pull-quote">
            &ldquo;A studio that treats restraint as a feature, not a
            compromise.&rdquo;
            <footer>The Brand Files</footer>
          </blockquote>
          <blockquote className="pull-quote">
            &ldquo;Proof that four people can out-craft forty.&rdquo;
            <footer>National Design Annual jury</footer>
          </blockquote>
        </div>
      </>
    ),
  },
  {
    name: 'Careers',
    content: (
      <>
        <p className="slide-kicker">Four Chairs, Occasionally Five</p>
        <h1>Careers</h1>
        <p>
          We hire rarely and slowly, which is exactly how we would want to be
          hired. There are no open roles at the moment.
        </p>
        <p>
          That said, we keep a short file of people we would like to work with
          someday, and we read every letter that arrives. If the work here
          feels like home, introduce yourself: show us three things you made
          and one thing you learned.
        </p>
        <ul className="credit-list">
          <li>
            <span className="credit-name">Hours</span>
            <span className="credit-bio">
              Nine to five, kept with unusual seriousness. Craft does not
              improve after dinner.
            </span>
          </li>
          <li>
            <span className="credit-name">Critique</span>
            <span className="credit-bio">
              Weekly, kind, and specific. The work gets questioned; the person
              never does.
            </span>
          </li>
          <li>
            <span className="credit-name">Tools</span>
            <span className="credit-bio">
              Whatever the work asks for, from lead type to live code.
            </span>
          </li>
          <li>
            <span className="credit-name">Location</span>
            <span className="credit-bio">
              Hudson, New York, with two desks kept warm for remote weeks.
            </span>
          </li>
        </ul>
        <p>work@fineractualdesigns.studio</p>
      </>
    ),
  },
  {
    name: 'Contact',
    content: (
      <>
        <p className="slide-kicker">Correspondence</p>
        <h1>Inquiries</h1>
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
        <p>
          hello@fineractualdesigns.studio &middot; +1 (555) 010-0100 &middot;
          214 Water Street, Hudson, New York
        </p>
      </>
    ),
  },
]
