from flask import Blueprint, jsonify, session, request
from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()

coin_routes = Blueprint("main", __name__)


@coin_routes.route("/info")
def info():
    coins = cg.get_coins_markets("usd")
    for obj in coins:
        # name = obj.name
        print(obj["id"])
    return jsonify(coins)
