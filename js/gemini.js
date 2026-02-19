async function askGemini(prompt) {
  try {
    const res = await fetch("http://localhost:3000/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI."
    );
  } catch (err) {
    console.error(err);
    return "AI server offline";
  }
}
