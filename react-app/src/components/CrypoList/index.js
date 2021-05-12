import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoin } from '../../store/coins'
import { NavLink } from 'react-router-dom';
import styles from './cryptoList.module.css'
import WatchList from '../WatchList/index'

const CryptoList = () => {
  const coins = useSelector((state) => state.coins)
  const user = useSelector(state => state.session.user)

  useEffect(() => {

  }, [coins])

  const coinArr = Object.values(coins);

  return (
    <div className={styles.outerDiv}>
      <div className={styles.left}>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>24h%</th>
              <th>Market Cap</th>
              <th>Circulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {coinArr.map((obj) => {
              return (
                <tr>
                  <td>
                    <NavLink to={`/cryptos/${obj.id}`} className={styles.imgDiv}>
                      <div><img src={obj.image} className={styles.img} /></div>
                      <div>{obj.name}</div>
                    </NavLink>
                  </td>
                  <td>{(obj.current_price).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}</td>
                  <td className={obj.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                    {(obj.price_change_percentage_24h).toLocaleString()}%
                </td>
                  <td>
                    {(obj.market_cap).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </td>
                  <td>{(obj.circulating_supply).toLocaleString()}</td>
                </tr>

              )
            }
            )}
          </tbody>
        </table>
      </div >
      {
        user &&
        <div className={styles.right}>
          <WatchList />
        </div>
      }
    </div>
  )
}

export default CryptoList;