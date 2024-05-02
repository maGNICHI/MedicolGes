from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)

# Autoriser les requêtes CORS de toutes les origines avec les méthodes spécifiques
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get('text', '')
    blob = TextBlob(text)
    sentiment = blob.sentiment
    return jsonify({'polarity': sentiment.polarity, 'subjectivity': sentiment.subjectivity})

@app.route('/get_popular_posts', methods=['GET'])
def get_popular_posts():
    response = requests.get('http://localhost:5000/api/posts')
    posts = response.json()
    sorted_posts = sorted(posts, key=lambda x: (len(x.get('likers', [])), len(x.get('comments', []))), reverse=True)
    return jsonify(sorted_posts)

@app.route('/get_popular_project_posts/<projectId>', methods=['GET'])
def get_popular_project_posts(projectId):
    response = requests.get(f'http://localhost:5000/api/posts/project/{projectId}')
    posts = response.json()
    sorted_posts = sorted(posts, key=lambda x: (len(x.get('likers', [])), len(x.get('comments', []))), reverse=True)
    return jsonify(sorted_posts)

if __name__ == '__main__':
    app.run(port=1000)
