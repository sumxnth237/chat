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
    const apiKey = "sk-proj-xOa7HtjLvWJjnIhXPvCkT3BlbkFJdXICPRtOlchQcINGgRvU"; 
    const url = "https://api.openai.com/v1/chat/completions"; 

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 100
        })
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        addMessageToChat("ChatGPT", data.choices[0].text.trim());
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
