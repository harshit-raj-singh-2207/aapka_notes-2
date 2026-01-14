async function generateTopics() {
    const subject = document.getElementById("subjectInput").value;
    const semester = document.getElementById("semesterInput").value;
    const exam = document.getElementById("examInput").value;
    const output = document.getElementById("topicsOutput");

    if (!subject || !semester) {
        output.innerHTML = "<p>Please fill subject and semester.</p>";
        return;
    }

    output.innerHTML = "<p>Generating important topics... 🤖</p>";

    const prompt = `
You are an exam preparation expert.

Subject: ${subject}
Semester: ${semester}
Exam: ${exam || "University Exam"}

Generate a list of 8–12 most important and high-probability exam topics.
Use short bullet points.
Focus on scoring and frequently asked concepts.
`;

    const response = await askGemini(prompt);

    // Convert response to cards
    const topics = response.split("\n").filter(t => t.trim() !== "");

    output.innerHTML = "";

    topics.forEach(topic => {
        const card = document.createElement("div");
        card.className = "dashboard-card";
        card.innerText = topic.replace(/^[-•]/, "").trim();
        output.appendChild(card);
    });
}
