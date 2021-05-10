import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { setDbCoin } from '../../store/dbcoins'
import { setOneCoin } from '../../store/onecoin'
import { addToWL } from '../../store/watchlist'
import PortfolioForm from '../PortfolioForm/index'


const CryptoInfo = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const coin = useSelector(state => state.onecoin)
  const mktCoins = useSelector(state => state.coins)
  const dbCoins = useSelector(state => state.dbcoins)
  const user = useSelector(state => state.session?.user)

  // const mkt = mktCoins.filter(cryptoObj => cryptoObj.id == name)
  const coinData = mktCoins[name]


  useEffect(() => {
    dispatch(setOneCoin(name))
    dispatch(setDbCoin())
  }, [dispatch])

  useEffect(() => {

  }, [mktCoins])

  const handleClick = (e) => {
    e.preventDefault()
    const crypto = dbCoins[coinData?.name]
    const crypto_id = crypto.id
    const data = {
      crypto_id,
      user_id: user.id
    }
    dispatch(addToWL(data))
  }
  return (
    <div>
      <button onClick={handleClick}>Add To WatchList</button>

      <div>
        <img src={coin?.image?.large} />
        <p dangerouslySetInnerHTML={{ __html: coin?.description?.en }} />
      </div>
      <div>
        <div>
          <div>{coin?.name}</div>
          <div>{coinData?.current_price?.usd}</div>
        </div>
        <div>
          <div>Price </div>
          <div>
            <div>{(coinData?.current_price)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}</div>
          </div>
        </div>
        <div>
          <div>Price Change 24h</div>
          <div>
            <div>{coinData?.price_change_24h_in_currency?.usd}</div>
            {/* from stack overflow https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings */}
            <div>{(coinData?.price_change_percentage_24h)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}</div>
          </div>
        </div>
        <div>
          <div>24h Low / 24h High</div>
          <div>
            <div>{(coinData?.low_24h)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })} /</div>
            <div>{(coinData?.high_24h)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}</div>
          </div>
        </div>
        <div>
          <div>Trading Volume 24h</div>
          <div>{(coinData?.total_volume)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</div>
        </div>
        <div>
          <div>Volume / Market Cap</div>
          <div>{(coinData?.total_volume / coinData?.market_cap).toFixed(5)}</div>
        </div>
        <div>
          <div>Market Rank</div>
          <div>{coinData?.market_cap_rank}</div>
        </div>
        <div>
          <div>Market Cap</div>
          <div>{(coinData?.market_cap)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</div>
        </div>
        <div>
          <div>Circulating Supply</div>
          <div>{(coinData?.circulating_supply)?.toLocaleString()}</div>
        </div>
        <div>
          <div>Total Supply</div>
          <div>{(coinData?.total_supply)?.toLocaleString()}</div>
        </div>
      </div>
      <PortfolioForm />
    </div>
  )
}

export default CryptoInfo