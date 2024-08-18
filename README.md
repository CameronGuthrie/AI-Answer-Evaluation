# AI Answer Evaluation Platform

## Overview

The AI Answer Evaluation Platform is a web-based application that allows users to submit questions along with their answers, which are then evaluated by an AI model (powered by OpenAI's GPT-3.5-turbo). The AI assesses whether the user's answer is correct and provides a detailed explanation. This platform is ideal for educational purposes, quiz apps, or any scenario where automated answer evaluation is required.

## Features

- **AI-Powered Evaluation:** Leverages OpenAI's GPT-3.5-turbo model to evaluate user-submitted answers.
- **Real-Time Feedback:** Provides immediate feedback on whether the answer is correct or incorrect.
- **Detailed Explanations:** Offers clear and concise explanations for each evaluation, including properly formatted code snippets.
- **Secure and Reliable:** Implements input sanitization to prevent prompt injection attacks and other security vulnerabilities.
- **Professional UI:** A clean, modern, and responsive user interface designed for an optimal user experience.

## Demo Site

You can view a live demo of this site at: [ai-answer-evaluation-gciy.onrender.com](https://ai-answer-evaluation-gciy.onrender.com/)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CameronGuthrie/AI-Answer-Evaluation.git
   cd ai-answer-evaluation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

5. **Access the application:**

   Open your web browser and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
├── public/
│   ├── style.css          # Custom CSS styles for the UI
│   ├── app.js             # Client-side JavaScript
│   └── index.html         # Main HTML file
├── .env                   # Environment variables
├── .patterns              # Injection patterns for input sanitization
├── server.js              # Node.js server and API routes
├── package.json           # NPM dependencies and scripts
└── README.md              # Project documentation
```

## Usage

1. **Submit a Question and Answer:**

   Enter your question and answer in the respective fields and click "Submit".

2. **View Results:**

   The platform will immediately display whether your answer is correct or incorrect, along with a detailed explanation.

3. **Code Snippets:**

   If the explanation includes code, it will be properly formatted for readability.

## Security

- **Input Sanitization:** The application sanitizes user input to prevent prompt injection attacks and other potential exploits.
- **Environment Variables:** Sensitive information, such as API keys, is stored securely in environment variables.

## Acknowledgements

- [OpenAI](https://openai.com) for providing the GPT-3.5-turbo model.
- [Node.js](https://nodejs.org) for the runtime environment.
- [Render](https://www.render.com/) for reliable and free hosting.
