from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .portfolio import Portfolio
from .watchlist import watchlists


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    initial_amount = db.Column(db.Float, default=10000)

    cryptos1 = db.relationship("Crypto", secondary=watchlists, back_populates="users1")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}

    def cryptos(self):
        portfolio = self.portfolio
        cryptos = portfolio.cryptos
        return cryptos
