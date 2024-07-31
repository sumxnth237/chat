document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".button");
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const promptText = button.querySelector(".text").textContent;
            sendRequest(promptText);
        });
    });

    sendButton.addEventListener("click", () => {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
            addMessageToChat("User", userMessage);
            sendRequest(userMessage);
            userInput.value = "";
        }
    });
});

async function sendRequest(prompt) {
    const url = "https://your-project-name.vercel.app/api/chatgpt"; // Replace with your Vercel endpoint

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt })
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        addMessageToChat("ChatGPT", data.reply.trim());
    } catch (error) {
        console.error("Error:", error);
        addMessageToChat("ChatGPT", "Sorry, there was an error processing your request.");
    }
}

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

