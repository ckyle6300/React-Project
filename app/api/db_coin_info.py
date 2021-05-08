from flask import Blueprint, jsonify, session, request
from app.models import Crypto, db

db_coin_routes = Blueprint("dbcoin", __name__)


@db_coin_routes.route("/")
def getalldbcoins():
    coins = Crypto.query.all()
    newCoins = [coin.to_dict() for coin in coins]
    return jsonify(newCoins)
