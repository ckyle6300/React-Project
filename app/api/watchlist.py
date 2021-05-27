from flask import Blueprint, jsonify, session, request
from app.models import Crypto, db, User
from flask_login import current_user

watchlist_routes = Blueprint("watchlist", __name__)


@watchlist_routes.route("/")
def getallwl():
    user = User.query.get(current_user.id)
    info = [crypto.to_dict() for crypto in user.cryptos1]
    return jsonify(info)


@watchlist_routes.route("/add", methods=["POST"])
def add():
    data = request.json
    userid = int(data["user_id"])
    cryptoid = int(data["crypto_id"])
    user = User.query.get(userid)
    crypto = Crypto.query.get(cryptoid)
    user.cryptos1.append(crypto)
    db.session.commit()
    info = [crypto.to_dict() for crypto in user.cryptos1]
    print(info, "888888888888888888888888888888888")
    return jsonify(info)


@watchlist_routes.route("/del", methods=["POST"])
def delWl():
    id = request.json
    user = User.query.get(current_user.id)
    crypto = Crypto.query.get(id["crypto_id"])
    print(crypto, "*************************")
    user.cryptos1.remove(crypto)
    db.session.commit()
    info = [crypto.to_dict() for crypto in user.cryptos1]
    return jsonify(info)
