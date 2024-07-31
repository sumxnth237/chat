import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_API_KEY` // Replace with your actual OpenAI API key
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            const data = await response.json();
            res.status(200).json({ reply: data.choices[0].message.content });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
