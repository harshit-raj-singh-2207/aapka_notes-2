/* =========================
   NAVBAR SCROLL EFFECT
========================= */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    navbar.style.boxShadow =
        window.scrollY > 20
            ? "0 10px 30px rgba(0,0,0,0.08)"
            : "none";
});


/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const revealElements = document.querySelectorAll(
    ".feature-card, .hero-text, .hero-card, .cta-box"
);

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.6s ease";
});

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* =========================
   AI CHAT TOGGLE
========================= */
const aiBtn = document.querySelector(".ai-btn");
const aiBox = document.querySelector(".ai-box");

if (aiBtn && aiBox) {
    aiBox.style.display = "none";

    aiBtn.addEventListener("click", () => {
        aiBox.style.display =
            aiBox.style.display === "none" ? "flex" : "none";
    });
}


/* =========================
   AI CHAT MESSAGES
========================= */
const aiInput = document.querySelector(".ai-input input");
const aiSendBtn = document.querySelector(".ai-input button");
const aiMessages = document.querySelector(".ai-messages");

function addMessage(text, sender) {
    if (!aiMessages) return;

    const msg = document.createElement("div");
    msg.className = `ai-msg ${sender}`;
    msg.innerText = text;
    aiMessages.appendChild(msg);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}


/* =========================
   SEND MESSAGE (GEMINI)
========================= */
async function sendMessage() {
    const userText = aiInput.value.trim();
    if (!userText) return;

    addMessage(userText, "user");
    aiInput.value = "";

    // Thinking indicator
    const thinkingMsg = document.createElement("div");
    thinkingMsg.className = "ai-msg bot";
    thinkingMsg.innerText = "Thinking... 🤖";
    aiMessages.appendChild(thinkingMsg);
    aiMessages.scrollTop = aiMessages.scrollHeight;

    try {
        const reply = await askGemini(
            `You are an exam preparation assistant.
Explain clearly, concisely, and in exam-friendly language.

User question:
${userText}`
        );

        thinkingMsg.remove();
        addMessage(reply, "bot");
    } catch (error) {
        thinkingMsg.remove();
        addMessage(
            "Sorry, something went wrong. Please try again.",
            "bot"
        );
    }
}

if (aiSendBtn && aiInput) {
    aiSendBtn.addEventListener("click", sendMessage);
    aiInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}


/* =========================
   ACTIVE NAV LINK
========================= */
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});
