# DriveAI: The Future of Aetheria Motors

Hey there! Thanks for taking the time to review my submission for the Full Stack Engineer role.

**Live Demo URL**: https://aetheria-drive-ai.vercel.app/

For this challenge, I built a single-page dealership site for a fictional brand called **Aetheria Motors**. The core idea was to make the AI assistant feel less like a side-widget and more like a co-pilot that actually controls the page. When you ask it to find an SUV or book a test drive, it physically scrolls you to the right section, filters the React state, and pre-fills the forms for you.

## How to run this locally

1. Clone the repo
2. Create a `.env.local` file in the root and drop in your Gemini API key like this: `VITE_GEMINI_API_KEY=your_api_key_here`
3. Run `npm install`
4. Run `npm run dev` and check it out at `http://localhost:5173`.

_(Note: If you don't want to mess with API keys locally, just use the live demo link above! I've attached my own key to the Vercel deployment for your convenience)._

## My Stack & Why I Chose It

- **React + Vite**: Honestly, Vite is just so fast. I wanted a snappy development experience without the overhead of a full SSR framework for a single-page app.
- **Tailwind CSS**: I wanted the site to look super premium and dark-themed (think Tesla or Lucid). Tailwind let me build that out incredibly fast without getting bogged down in writing custom CSS files.
- **Framer Motion**: I used this specifically for the car grid. I wanted it so when you ask the AI to "only show SUVs", the other cars don't just abruptly disappear, but rather the remaining ones slide smoothly into place.
- **Google Gemini API**: I brought in the `@google/generative-ai` package. Getting an LLM to reliably return JSON so I could hook it into my React state was the trickiest part, but writing a really strict system prompt solved it.

## Things you can try asking the AI

I've wired up the AI to handle a bunch of different scenarios. Try pasting these into the chat:

1. _"Show me your SUVs under 40 lakhs"_ (Watch the grid filter itself)
2. _"Compare the Nova and Zenith"_ (It'll scroll you to the comparison table and load them in)
3. _"Book a test drive for Atlas this Saturday in Mumbai"_ (It pre-fills the booking form at the bottom!)
4. _"Which car is best for a family of 5?"_ (It will highlight the Atlas in the grid and explain why)
5. _"Show prices in USD"_ (Updates the global currency state)

## If I had another week...

If I wasn't just building a quick prototype, I'd definitely move the Gemini API call to a secure backend (like a Next.js API route or an Express server). Right now, since it's a Vite app, the API key is exposed in the frontend build. I'd also love to add Three.js so you could actually spin 3D models of the cars around while talking to the AI.

Thanks again for the opportunity to build this, it was a really fun weekend project!
