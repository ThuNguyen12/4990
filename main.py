import os
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Initialize OpenAI client
my_secret = os.environ['OPENAI_USER_API_KEY']
openai_client = OpenAI(api_key=my_secret)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    subject_class = request.form.get('subject_class')

    # Generate quiz questions using OpenAI API
    prompt = f"Generate a quiz for {subject_class} on Computer Science."
    response = openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]

    )

    # Extract generated quiz questions from API response
    quiz_questions = response.choices[0].message.content.split('\n')

    # Return generated quiz questions as a JSON response
    return jsonify({'quiz_questions': quiz_questions})

if __name__ == '__main__':
    app.run(debug=True)
