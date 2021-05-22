from flask import Flask, Response

app = Flask(__name__)

def load_TFC():
    return 0

def load_TFM():
    return 0

def load_TI():
    return 0

TFC = load_TFC()
TFM = load_TFM()
TI = load_TI()

@app.route('/')
def index():
    return app.send_static_file('index.html')

# data points
@app.route('/data/TradeFlowColumn')
def data_TFC():
    return Response(TFC, mimetype="application/json")

@app.route('/data/TradeFlowMatrix')
def data_TFC():
    return TFM

@app.route('/data/TradeIntensity')
def data_TFC():
    return TI