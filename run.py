from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/4inarow')
def inarow4():
        return render_template('4gewinnt')

@app.route('/test')
def testpage():
        return render_template('test')

@app.route('/receiver', methods=['POST'])
def online4inarow():
	data = request.form['data']
	return "",204

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')
