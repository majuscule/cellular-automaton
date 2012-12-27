from flask import Flask
import redis

app = Flask(__name__)

# r = redis

@app.route('/', defaults={'token':0})
@app.route('/<int:token>')
def index(token):
    if token == 0:
        return render_template('index.html'), seed=0)

    integer = r.get(token)
    seed = bin(integer)[2:]
    return render_template('index.html', seed=seed)


if __name__ == '__main__':
    app.run()
