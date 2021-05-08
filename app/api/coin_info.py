from flask import Blueprint, jsonify, session, request
from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()

coin_routes = Blueprint("apicoin", __name__)


@coin_routes.route("/info")
def info():
    coins = cg.get_coins_markets("usd")
    return jsonify(coins)


@coin_routes.route("/<name>/info")
def coininfo(name):
    info = cg.get_coin_by_id(
        name,
        localization=False,
        tickers=False,
        market_data=True,
        community_data=False,
        developer_data=False,
        sparkline=False,
    )

    return info
