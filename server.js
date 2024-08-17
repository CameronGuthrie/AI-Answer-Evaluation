const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to load injection patterns from the .patterns file
const loadInjectionPatterns = () => {
    const patternsFilePath = path.join(__dirname, '.patterns');
    const patterns = fs.readFileSync(patternsFilePath, 'utf-8')
                        .split('\n')
                        .map(pattern => pattern.trim())
                        .filter(pattern => pattern.length > 0 && !pattern.startsWith('#'));
    return patterns;
};

// Load the patterns once when the server starts
const injectionPatterns = loadInjectionPatterns();

app.post('/api/submitCode', async (req, res) => {
    const userQuestion = req.body.question;
    const userAnswer = `\`\`\`${req.body.code}\`\`\``;

    if (containsInjectionPattern(userAnswer)) {
        return res.status(400).json({ error: 'Your submission was flagged for potential injection attacks.' });
    }

    try {
        const evaluation = await evaluateUserAnswerWithAI(userQuestion, userAnswer);
        res.json({ ...evaluation });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get a response from the AI.' });
    }
});

const containsInjectionPattern = (code) => {
    return injectionPatterns.some(pattern => code.toLowerCase().includes(pattern.toLowerCase()));
};

const evaluateUserAnswerWithAI = async (question, userAnswer) => {
    const apiKey = process.env.OPENAI_API_KEY;

    // Refined prompt for more clarity
    const evaluationPrompt = `
    Evaluate the user's answer to the following question and determine if it is correct or incorrect. Then provide a clear explanation:
    
    Question: ${question}
    
    User's Answer: ${userAnswer}
    
    Respond with "Correct" or "Incorrect" at the beginning of your response, followed by an explanation prefixed with "Explanation: ". If the explanation contains any code, include it as part of the response.`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: evaluationPrompt }],
                max_tokens: 150,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const evaluation = response.data.choices[0].message.content.trim();
        
        // Parse the response to determine if it's correct or incorrect
        const correct = evaluation.toLowerCase().startsWith("correct");
        const explanation = evaluation.split("Explanation:")[1]?.trim() || evaluation;

        return { correct, explanation };
    } catch (error) {
        console.error('Error evaluating user answer with AI:', error.response ? error.response.data : error.message);
        throw error;
    }
};

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
