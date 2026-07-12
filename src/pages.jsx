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
  { title: 'Who We Are', text: lorem.short },
  { title: 'Our Story', text: lorem.medium },
  { title: 'Our Values', text: lorem.long },
  { title: 'The Team', text: lorem.short },
]

const portfolioSlides = [
  { title: 'Project One', text: lorem.short },
  { title: 'Project Two', text: lorem.medium },
  { title: 'Project Three', text: lorem.long },
  { title: 'Project Four', text: lorem.medium },
  { title: 'Project Five', text: lorem.short },
]

export const pages = [
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
    content: (
      <>
        <h1>About</h1>
        <p>{lorem.short}</p>
        <HorizontalCarousel slides={aboutSlides} />
      </>
    ),
  },
  {
    name: 'Portfolio',
    content: (
      <>
        <h1>Portfolio</h1>
        <p>{lorem.short}</p>
        <HorizontalCarousel slides={portfolioSlides} />
      </>
    ),
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
