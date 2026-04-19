# Learnings & Reflections

This challenge was honestly a blast. I've built a lot of React apps and I've played around with LLMs, but wiring them together so the LLM actually *drives* the UI state was a really cool paradigm shift.

## What was new to me

The biggest "aha" moment for me was shifting how I think about chatbots. Usually, an AI chat widget is just a silo sitting in the corner of your screen—you ask it a question, it prints text. 

For this project, I had to treat the AI as a **state controller**. Learning how to force Gemini to output a structured JSON payload, and then taking that payload to dispatch global state updates (like triggering `setCurrency` or updating `bookingDetails` inside my React Context) was a really fun architectural challenge. It makes the site feel alive.

## How I figured it out

I decided to use the official `@google/generative-ai` SDK. The hardest part was getting the model to *stop* being so chatty. Without strict guardrails, Gemini would try to write long, helpful paragraphs, which obviously breaks `JSON.parse()`. 

The breakthrough came when I figured out how to firmly instruct the model. I ended up writing a really strict block of text that defines the exact JSON schema it's allowed to return, and I prepend that to whatever the user types. Once the model was reliably spitting out JSON like `{"action": {"type": "FILTER", "value": "suv"}}`, the rest of the app was just standard React.

I set up a global `AppContext`. The `AIAssistant` component parses the JSON, calls the context updaters (like `setModelFilter('suv')`), and the rest of the app just naturally reacts. The Models grid sees the new filter, and Framer Motion handles the slick layout animations.

## Sources I leaned on

1. **Google AI Studio Docs**: I spent some time here figuring out how the Gemini SDK handles text generation and prompt structuring.
2. **React Context Docs**: Just a quick refresher on the cleanest way to set up a global provider so I didn't have to prop-drill the AI's actions down to the booking form.
3. **Framer Motion Docs**: I always have to look up the exact syntax for `AnimatePresence` and the `layout` prop to get those buttery smooth CSS grid transitions.
4. **Tailwind CSS Docs**: I used this constantly, mostly looking up specific utility classes like `backdrop-blur` to get that glassy, premium look on the navbar and chat window.

Overall, I'm really proud of how the state management turned out. It really changed how I think about building user interfaces going forward.
