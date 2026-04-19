# My AI Prompts Log

Here's a breakdown of some of the actual prompts I used with my AI coding assistant while building this project. It was a massive help for the boilerplate stuff.

1. **Prompt**: *"Generate a JSON array of 5 fictional modern car models for a brand called 'Aetheria Motors'. Include id, name, type (EV, Sedan, SUV, etc), price in INR, price in USD, an array of 3 top features, and number of seats."*
   - **How it went**: This worked perfectly on the first try. Honestly, this is my favorite use case for AI—saving me from spending 30 minutes brainstorming fake data for mockups.

2. **Prompt**: *"Create a React Context called AppContext that holds state for: currency (INR/USD), modelFilter (string), compareModels (array of strings), and bookingDetails (object with model, date, city)."*
   - **How it went**: Mostly fine, but I realized later I didn't ask it for a way to highlight specific cars. I ended up manually adding a `highlightedCarId` state to the Context later on when I was building the recommendation feature.

3. **Prompt**: *"Using Framer Motion, how do I animate a CSS grid so that when items are filtered out, the remaining items smoothly slide into their new positions instead of snapping?"*
   - **How it went**: The AI reminded me to use the `layout` prop on the `motion.div` components along with an `AnimatePresence` wrapper. I always forget the exact syntax for this, so having the AI generate the boilerplate saved me a trip to the Framer docs.

4. **Prompt**: *"How do I prompt the Google Gemini API to return ONLY a JSON object that controls my React UI state? I want it to output an 'action' object and a 'reply' string."*
   - **How it went**: This took some iteration. Initially, the AI gave me some overly complex function-calling setups. I eventually nudged it to just give me a strict "System Instruction" block to prepend to the user's query. Once I gave the model a strict JSON schema in the prompt, it started working reliably.

5. **Prompt**: *"How do I smoothly scroll to a specific section ID in React when an AI chat message is sent?"*
   - **How it went**: I overthought this and thought I needed a React ref for every section. The AI simply suggested using good old `document.getElementById('id').scrollIntoView({ behavior: 'smooth' })`. Kept it simple and it worked perfectly.

6. **Prompt**: *"Gemini occasionally wraps its JSON response in markdown code blocks like \`\`\`json. How do I clean this before parsing?"*
   - **How it went**: The AI just gave me a quick regex: `.replace(/```json/gi, '').replace(/```/g, '').trim()`. Slapped it in before my `JSON.parse()` and haven't had a crash since.
