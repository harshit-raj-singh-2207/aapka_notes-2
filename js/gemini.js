/* =========================
   GEMINI AI CONFIG (FIXED)
========================= */

// ⚠️ Use only for local / college projects
// Never push real API keys to GitHub

const GEMINI_API_KEY = AIzaSyC6Yl0n6TnSFh8hn-L-cgMlrJ6Wxixky8s;

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
  GEMINI_API_KEY;


/* =========================
   ASK GEMINI FUNCTION
========================= */
async function askGemini(prompt) {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return "Gemini API error. Check console.";
        }

        return (
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from AI."
        );

    } catch (error) {
        console.error("Fetch failed:", error);
        return "AI service is currently unavailable. Please try again later.";
    }
}
