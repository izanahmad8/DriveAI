import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Bot, Send, X, Mic, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemInstruction = `You are DriveAI, a helpful, conversational AI assistant for Aetheria Motors. 
You control the website's UI state based on user requests.
Your response MUST be a valid JSON object (without markdown code blocks) containing exactly two keys:
{
  "action": { ... },
  "reply": "A friendly, natural language string to say to the user."
}

Action types:
- {"type": "NONE"} : Just conversational reply.
- {"type": "CURRENCY", "value": "USD" | "INR"}
- {"type": "FILTER", "value": "suv" | "ev" | "under40" | "family" | "autopilot" | ""}
- {"type": "HIGHLIGHT", "carId": "nova" | "zenith" | "atlas" | "horizon" | "apex"}
- {"type": "COMPARE", "models": ["id1", "id2"]} : Use IDs: nova, zenith, atlas, horizon, apex.
- {"type": "BOOK", "model": "Aetheria [Name]", "city": "CityName", "date": "YYYY-MM-DD"} : Pre-fill form. Leave empty strings if info is missing.

Car IDs: nova, zenith, atlas, horizon, apex.`;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm DriveAI, powered by Gemini. How can I help you navigate your journey today? Try asking me to show SUVs, compare models, or book a test drive.",
    },
  ]);
  const messagesEndRef = useRef(null);

  const {
    setCurrency,
    setModelFilter,
    setCompareModels,
    setBookingDetails,
    setHighlightedCarId,
  } = useAppContext();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuery = async (query) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Please add your VITE_GEMINI_API_KEY to the .env.local file to use the AI Assistant.",
        },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const fullPrompt = `${systemInstruction}\n\nUser Query: ${query}`;
      const result = await model.generateContent(fullPrompt);
      const text = result.response.text();

      // Clean up potential markdown formatting from the response
      const cleanJson = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleanJson);

      const { action, reply } = parsed;

      // Handle the UI State change based on action
      if (action.type === "CURRENCY") {
        setCurrency(action.value);
      } else if (action.type === "FILTER") {
        setModelFilter(action.value);
        setHighlightedCarId(null);
        scrollTo("models");
      } else if (action.type === "HIGHLIGHT") {
        setModelFilter("");
        setHighlightedCarId(action.carId);
        scrollTo("models");
      } else if (action.type === "COMPARE") {
        setCompareModels(action.models);
        scrollTo("compare");
      } else if (action.type === "BOOK") {
        setBookingDetails({
          model: action.model || "",
          city: action.city || "",
          date: action.date || "",
        });
        scrollTo("booking");
      }

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `API Error: ${error.message || "Parsing failed. Please check console."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input;
    setMessages((prev) => [...prev, { role: "user", text: userQuery }]);
    setInput("");
    await handleQuery(userQuery);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] z-50 transition-transform hover:scale-110"
      >
        {isOpen ? <X /> : <Bot size={28} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-indigo-600 p-4 text-white font-semibold flex items-center gap-2">
            <Bot /> DriveAI Assistant
          </div>

          <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-black/50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-indigo-500 text-white self-end rounded-tr-sm" : "bg-white/10 text-gray-200 self-start rounded-tl-sm"}`}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white/10 text-gray-200 self-start rounded-2xl rounded-tl-sm p-3 text-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Thinking..
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 bg-gray-900 border-t border-white/10 flex items-center gap-2"
          >
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-white transition"
            >
              <Mic size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-black border border-white/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition disabled:opacity-50"
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
