const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Message send karne ka function
function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // User ka message screen par add karein
    appendMessage(text, 'user-message');
    userInput.value = "";

    // AI ka reply trigger karein (Simulated)
    setTimeout(() => {
        getAIResponse(text);
    }, 1000);
}

// Message HTML me append karne ke liye
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// AI response simulate karne ke liye (Abhi ke liye demo)
function getAIResponse(userText) {
    let aiReply = "Mujhe samajh nahi aaya, par main seekh raha hoon!";
    
    if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
        aiReply = "Hello! Main Gana AI hoon. Kaise hain aap?";
    } else if (userText.toLowerCase().includes("kaise ho")) {
        aiReply = "Main bilkul theek hoon! Aap batayein?";
    } else if (userText.toLowerCase().includes("naam kya hai")) {
        aiReply = "Mera naam Gana AI chatbot hai.";
    }

    appendMessage(aiReply, 'ai-message');
}

// Button click aur Enter key event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
