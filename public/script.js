document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('promptSubmissionForm');
    const questionInput = document.getElementById('question');
    const codeInput = document.getElementById('codeInput');
    const errorElement = document.getElementById('error');
    const responseContainer = document.getElementById('responseContainer');
    const correctnessElement = document.getElementById('correctness');
    const explanationElement = document.getElementById('explanation');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const question = questionInput.value.trim();
        const code = codeInput.value.trim();

        if (!question || !code) {
            showError('Please provide both a question and an answer.');
            return;
        }

        submitPrompt(question, code);
    });

    function showError(message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError() {
        errorElement.style.display = 'none';
    }

    function clearPreviousResponse() {
        correctnessElement.textContent = '';
        explanationElement.innerHTML = '';  // Use innerHTML to render formatted content
        responseContainer.style.display = 'none';
    }

    function formatCodeSnippets(text) {
        return text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                   .replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    function submitPrompt(question, code) {
        hideError();
        clearPreviousResponse();

        fetch('/api/submitCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, code }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showError(data.error);
            } else {
                responseContainer.style.display = 'block';
                correctnessElement.textContent = data.correct ? 'Correct' : 'Incorrect';
                correctnessElement.style.color = data.correct ? 'green' : 'red';
                explanationElement.innerHTML = formatCodeSnippets(data.explanation);  // Apply formatting to explanation
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('There was an error processing your request.');
        });
    }
});
