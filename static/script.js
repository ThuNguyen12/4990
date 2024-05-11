$(document).ready(function() {
    // Get the form element
    const quizForm = $('#quiz-form');

    // Add event listener for form submission
    quizForm.submit(function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the form data
        const formData = quizForm.serialize();

        // Make a POST request to the /generate_quiz endpoint
        $.ajax({
            type: 'POST',
            url: '/generate_quiz',
            data: formData,
            success: function(response) {
                // Display quiz questions on the webpage
                const quizQuestions = response.quiz_questions;
                const quizQuestionsContainer = $('#quiz-questions');
                quizQuestionsContainer.empty(); // Clear previous quiz questions

                quizQuestions.forEach(question => {
                    const questionElement = $('<div class="quiz-question"></div>');
                    questionElement.text(question);
                    quizQuestionsContainer.append(questionElement);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                // Display error message on the webpage
                const quizQuestionsContainer = $('#quiz-questions');
                quizQuestionsContainer.html('<div class="error-message">Failed to generate quiz. Please try again later.</div>');
            }
        });
    });
});
