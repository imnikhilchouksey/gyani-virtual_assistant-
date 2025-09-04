from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

gemini_api_key = os.getenv("gemini_api_key")
genai.configure(api_key=gemini_api_key)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/')
def home():
    return jsonify({"message":"Backend is running"})
    
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get("prompt")

    try:
        response = gemini_model.generate_content("give answer of this in 20-30 words " + prompt)
        reply = response.text
        return jsonify({"response": reply})

    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
