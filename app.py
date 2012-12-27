from flask import Flask, render_template, url_for, abort
import redis

app = Flask(__name__)
app.debug = True

r = redis.StrictRedis(host='localhost', port=6379, db=0)

def generate_token():
    size = random.randint(4,10)

    token = ''.join(random.choice(string.ascii_letters + string.digits) for x in range(size))

    if r.get(token):
        token = generate_token()

    return token


@app.route('/', defaults={'token':0})
@app.route('/<token>')
def index(token):
    if token == 0:
        return render_template('index.html', seed=0)

    seed_int = int(r.get(token))
    if not seed_int:
        return abort(404)

    seed = bin(seed_int)[2:]
    return render_template('index.html', seed=seed)


@app.route('/_make_permalink')
def make_permalink():
    seed = request.form['seed']

    seed_int = int(seed, 2)

    token = generate_token()

    r.set(token, seed_int)

    return jsonify(url_for('index', token=token, _external=True))

if __name__ == '__main__':
    app.run()
