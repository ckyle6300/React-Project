from flask import Blueprint, jsonify, session, request
from app.models import Crypto, db, User, Portfolio
from flask_login import current_user

portfolio_routes = Blueprint("portfolio", __name__)


@portfolio_routes.route("/buy", methods=["POST"])
def buy():
    data = request.json
    id = current_user.id
    crypto = Portfolio(
        num_of_shares=data["num_of_shares"],
        buying_price=data["buying_price"],
        crypto_id=data["crypto_id"],
        user_id=id,
    )
    db.session.add(crypto)
    db.session.commit()

    portfolio = Portfolio.query.filter(Portfolio.user_id == id).all()
    port = [p.to_dict() for p in portfolio]
    return jsonify(port)