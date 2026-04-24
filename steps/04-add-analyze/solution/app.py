from flask import Flask, render_template, request
import statistics

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    raw = request.form.get('numbers', '')
    try:
        numbers = [float(x.strip()) for x in raw.split(',') if x.strip()]
        if not numbers:
            raise ValueError('No numbers provided.')
    except ValueError as e:
        return render_template('index.html', error=str(e))

    results = {
        'count':  len(numbers),
        'sum':    sum(numbers),
        'mean':   statistics.mean(numbers),
        'median': statistics.median(numbers),
        'stdev':  statistics.stdev(numbers) if len(numbers) > 1 else 0,
    }
    return render_template('results.html', numbers=numbers, results=results)

if __name__ == '__main__':
    app.run(debug=True)
