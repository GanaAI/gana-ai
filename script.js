const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// ⚠️ APNI GEMINI API KEY YAHAN INVERTED COMMAS KE ANDAR DAALEIN
const GEMINI_API_KEY = "AQ.Ab8RN6LSI5CLJ2CaF5YfVwKmLXs2s6JyMthNz0rJpSHYaK9Zjw"; 

async function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // User ka message screen par dikhayein
    appendMessage(text, 'user-message');
    userInput.value = "";

    // Chatbox mein "Typing..." wala temporary message dikhayein
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'ai-message');
    typingDiv.innerText = "Gana AI soch raha hai...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Google Gemini API ko request bhejna
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        
        // "Soch raha hai..." waale message ko mitaayein
        chatBox.removeChild(typingDiv);

        // Asli AI ka jawab nikalein aur screen par dikhayein
        const aiReply = data.candidates[0].content.parts[0].text;
        appendMessage(aiReply, 'ai-message');

    } catch (error) {
        chatBox.removeChild(typingDiv);
        appendMessage("Sorry, lagta hai koi error aa gaya hai!", 'ai-message');
        console.error(error);
    }
}

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
