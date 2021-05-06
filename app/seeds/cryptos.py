from app.models import db, Crypto
from pycoingecko import CoinGeckoAPI

cg = CoinGeckoAPI()


def seed_cryptos():
    def auto_seed():
        coins = cg.get_coins_markets("usd")
        for obj in coins:
            name = obj["name"]
            abrv = obj["symbol"]
            seed_crypto = Crypto(name=name, abrv=abrv)
            db.session.add(seed_crypto)

    auto_seed()

    db.session.commit()


def undo_cryptos():
    db.session.execute("TRUNCATE cryptos;")
    db.session.commit()
