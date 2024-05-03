from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import requests
from flask_cors import CORS  # Import CORS module

from scipy.stats import pearsonr

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/project/<string:project_id>', methods=['GET'])
def get_project(project_id):
    # Send a GET request to your Node.js backend to fetch the project
    url = f'http://localhost:5000/api/project/{project_id}'
    response = requests.get(url)
    if response.status_code == 200:
        project_data = response.json()['success']['project']  # Access 'project' under 'success'
        file_name = project_data['file']
        # Download the file from the Node.js backend
        file_response = requests.get(f'http://localhost:5000/api/project/download/{file_name}', stream=True)
        print("fillllle:", file_name)
        if file_response.status_code == 200:
            # Save the file to a temporary location
            with open('temp_file.csv', 'wb') as f:
                for chunk in file_response.iter_content(1024):
                    f.write(chunk)
            # Load the CSV file using pandas
            df = pd.read_csv('temp_file.csv')
            # Clean the data (e.g., handle missing values, convert data types)
            df = df.dropna()  # drop rows with missing values
            df = df.apply(pd.to_numeric, errors='ignore')  # convert columns to numeric
            # Create tables of effectives for each attribute
            tables = {}
            for col in df.columns:
                tables[col] = df[col].value_counts().to_dict()
            # Create random cross tables and calculate p-values and correlations
            cross_tables = {}
            for i in range(5):  # create 5 random cross tables
                col1, col2 = np.random.choice(df.columns, 2, replace=False)
                cross_table = pd.crosstab(df[col1], df[col2])
                p_value, correlation = pearsonr(cross_table.values.flatten(), cross_table.values.flatten())
                cross_tables[f'{col1} x {col2}'] = {'p_value': p_value, 'correlation': correlation}
            # Return the results as JSON
            return jsonify({'tables': tables, 'cross_tables': cross_tables})
        else:
            # Provide a more detailed error message
            return jsonify({'error': f'Failed to download file: {file_response.status_code}'}), 400
    else:
        return jsonify({'error': 'Project not found'}), 400

if __name__ == '__main__':
    app.run(port=2000)
