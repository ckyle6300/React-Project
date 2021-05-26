from .db import db
from .watchlist import watchlists


class Crypto(db.Model):
    __tablename__ = "cryptos"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    storeId = db.Column(db.String(100))
    abrv = db.Column(db.String(25), nullable=False, unique=True)

    users1 = db.relationship("User", secondary="watchlists", back_populates="cryptos1")

    def users(self):
        portfolios = self.portfolios
        users = [p.user for p in portfolios]
        return users

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "storeId": self.storeId,
            "abrv": self.abrv,
        }
