from .db import db
from .watchlist import watchlists
from .crypto import Crypto
from datetime import datetime


class Portfolio(db.Model):
    __tablename__ = "portfolios"

    id = db.Column(db.Integer, primary_key=True)
    num_of_shares = db.Column(db.Float, nullable=False)
    buying_price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    crypto_id = db.Column(db.Integer, db.ForeignKey("cryptos.id"), nullable=False)
    date_bought = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", backref="portfolio", uselist=False)
    cryptos = db.relationship("Crypto", backref="portfolios")
