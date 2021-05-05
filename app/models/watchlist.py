from .db import db


# class WatchList(db.Model):
#     __tablename__ = "watchlists"

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     crypto_id = db.Column(db.Integer, db.ForeignKey("cryptos.id"))


watchlists = db.Table(
    "watchlists",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("crypto_id", db.Integer, db.ForeignKey("cryptos.id"), primary_key=True),
)
