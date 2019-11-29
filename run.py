from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/4inarow')
def inarow4():
        return render_template('4gewinnt')

@app.route('/4inarow-data', methods=['POST'])
def online4inarow():
	uid = request.form['user']
	data = request.form['data']
	return "",204

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')
