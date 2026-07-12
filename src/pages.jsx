import HorizontalCarousel from './components/HorizontalCarousel'

const lorem = {
  short:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  medium:
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  long:
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
}

const aboutSlides = [
  { title: 'About', text: lorem.short, intro: true },
  { title: 'Story', text: lorem.medium },
  { title: 'Values', text: lorem.long },
  { title: 'Team', text: lorem.short },
]

const portfolioSlides = [
  { title: 'Portfolio', text: lorem.short, intro: true },
  { title: 'One', text: lorem.short },
  { title: 'Two', text: lorem.medium },
  { title: 'Three', text: lorem.long },
  { title: 'Four', text: lorem.medium },
  { title: 'Five', text: lorem.short },
]

export const pages = [
  {
    name: 'Welcome',
    dial: '\u2022',
    content: (
      <>
        <p className="landing-kicker">Lorem ipsum dolor</p>
        <h1 className="landing-title">Sit Amet Consectetur</h1>
        <p>{lorem.short}</p>
        <p className="landing-hint">Scroll to explore.</p>
      </>
    ),
  },
  {
    name: 'Home',
    content: (
      <>
        <h1>Home</h1>
        <p>{lorem.medium}</p>
        <p>{lorem.short}</p>
      </>
    ),
  },
  {
    name: 'About',
    content: <HorizontalCarousel slides={aboutSlides} />,
  },
  {
    name: 'Portfolio',
    content: <HorizontalCarousel slides={portfolioSlides} />,
  },
  {
    name: 'Contact',
    content: (
      <>
        <h1>Contact</h1>
        <p>{lorem.short}</p>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Lorem ipsum! (form not wired up yet)')
          }}
        >
          <label>
            Name
            <input type="text" name="name" placeholder="Lorem Ipsum" required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="lorem@ipsum.dolor"
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Dolor sit amet, consectetur adipiscing elit..."
              required
            />
          </label>
          <button type="submit">Send</button>
        </form>
        <p>lorem@ipsum.dolor &middot; +1 (555) 010-0100</p>
      </>
    ),
  },
]
