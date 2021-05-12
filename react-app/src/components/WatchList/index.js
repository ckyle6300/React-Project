import React, { useEffect, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWl } from '../../store/watchlist'
import styles from './watchList.module.css'
import { NavLink } from 'react-router-dom';


const WatchList = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const watchlist = useSelector(state => state.watchlist)
  const coins = useSelector(state => state.coins)

  const newWL = [];

  const coinVal = Object.values(coins)
  const wlVal = Object.values(watchlist)

  for (let i = 0; i < coinVal.length; i++) {
    for (let j = 0; j < wlVal.length; j++) {
      if (coinVal[i].symbol == wlVal[j].abrv) {
        newWL.push(coinVal[i])
      }
    }
  }

  useEffect(() => {
    dispatch(getAllWl())
  }, [dispatch])

  useEffect(() => {

  }, [coins])


  return (
    <>
      <div className={styles.header}><h3>Watchlist</h3>
        {
          newWL?.map(crypto => (
            <div className={styles.outerDiv}>
              <div>

                <h4><NavLink to={`/cryptos/${crypto.id}`}>{crypto.symbol}</NavLink></h4>
              </div>
              <div className={styles.innerDiv} >
                <div>
                  <p>
                    {(crypto.current_price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </p>
                  <p className={crypto.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                    {(crypto.price_change_percentage_24h).toLocaleString()}%
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default WatchList