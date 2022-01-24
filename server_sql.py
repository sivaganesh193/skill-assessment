from flask import Flask, jsonify, request, render_template
import mysql.connector

app = Flask(__name__)
app.secret_key = 'SKM_Api_Key'

smdb = mysql.connector.connect(
    host="db4free.net",
    user="skillmadmin",
    password="8KU1WQCK&u8fVQw5",
    database="skillmdatabase"
)


smcursor = smdb.cursor()


@app.route('/store_logs', methods=['POST'])
def api():
    if not request.json:
        return jsonify({'error': 'no JSON data received'})
    uid = request.json.get("uid")
    ques = request.json.get("ques")
    ans = request.json.get("ans")
    tid = request.json.get("tid")

    sql = "INSERT INTO tlogs VALUES (%s, %s, %s, %s)"
    val = (uid, ques, ans, tid)
    smcursor.execute(sql, val)

    smdb.commit()

    return jsonify({'error': 'no error'})


@app.route('/store_result', methods=['POST'])
def resstore():
    if not request.json:
        return jsonify({'error': 'no JSON data received'})
    uid = request.json.get("uid")
    score = request.json.get("score")
    tid = request.json.get("tid")

    sql = "INSERT INTO tresults VALUES (%s, %s, %s)"
    val = (uid, tid, score)
    smcursor.execute(sql, val)

    smdb.commit()

    return jsonify({'error': 'no error'})


app.run(port=(8831))
