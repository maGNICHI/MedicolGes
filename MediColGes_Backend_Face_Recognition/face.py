import sys
import face_recognition
import numpy as np
import json
import requests
from io import BytesIO

def download_image(url):
    """Download an image from a URL and return a loaded image object."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        return face_recognition.load_image_file(BytesIO(response.content))
    except requests.RequestException as e:
        print(json.dumps({"error": f"Error downloading image: {str(e)}"}))
        return None

def fetch_users_data(api_url, payload):
    """Fetch user data including image URLs and emails from an API."""
    try:
        headers = {'Content-Type': 'application/json'}
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()['usersData']
    except requests.RequestException as e:
        print(json.dumps({"error": f"Error fetching user data: {str(e)}"}))
        return []

def send_login_request(user_id):
    """Send a login request to the Node.js server with the matched user's ID."""
    try:
        url = 'http://localhost:5000/api/user/imglogin'
        payload = {'_id': user_id}
        headers = {'Content-Type': 'application/json'}
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(json.dumps({"error": f"Failed to login user: {str(e)}"}))
        return None

def compare_face_with_database(image_path, users_data):
    """Compare an uploaded image against a database of user images to find a match and return user details."""
    try:
        image = face_recognition.load_image_file(image_path)
        face_encodings = face_recognition.face_encodings(image)
        if not face_encodings:
            return json.dumps({"error": "No faces found in the uploaded image."})

        reference_encoding = face_encodings[0]
        threshold = 0.6

        for user in users_data:
            url = user['pic']
            user_image = download_image(url)
            if user_image is not None:
                user_encodings = face_recognition.face_encodings(user_image)
                if user_encodings:
                    distance = np.linalg.norm(reference_encoding - user_encodings[0])
                    if distance < threshold:
                        login_result = send_login_request(user['_id'])
                        return json.dumps({"match": True, "user_id": user['_id'], "email": user['email'], "distance": distance, "login_result": login_result})
            else:
                print(json.dumps({"error": f"Failed to download or decode image from {url}"}))

        return json.dumps({"match": False})
    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Image path not provided"}))
        sys.exit(1)

    image_path = sys.argv[1]
    api_url = 'http://localhost:5000/api/user/get-pictures'
    users_data = fetch_users_data(api_url, {})  # Fetch user data from the API

    # Perform the comparison
    result = compare_face_with_database(image_path, users_data)
    print(result)
