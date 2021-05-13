import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import WatchList from '../WatchList/index'
import { getPort } from '../../store/portfolio'
import { setDbCoin } from '../../store/dbcoins'
import styles from './profile.module.css'

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const portfolio = useSelector(state => state.portfolio);
  const dbcoins = useSelector(state => state.dbcoins);
  const coins = useSelector(state => state.coins);

  const newDbCoins = Object.values(dbcoins)
  const newPort = []

  for (let i = 0; i < portfolio.length; i++) {
    const portObj = portfolio[i];
    for (let j = 0; j < newDbCoins.length; j++) {
      const dbObj = newDbCoins[j];
      if (portObj.crypto_id == dbObj.id) {
        newPort.push({ ...portObj, ...dbObj })
      }
    }
  }

  const mkt = Object.values(coins)
  const allInfo = [];
  for (let i = 0; i < mkt.length; i++) {
    const portObj = mkt[i];
    for (let j = 0; j < newPort.length; j++) {
      const dbObj = newPort[j];
      if (portObj.name == dbObj.name) {
        allInfo.push({ ...portObj, ...dbObj })
      }
    }
  }
  let portfolioVal = 0;
  let boughtAt = 0
  allInfo.forEach((crypto) => {
    portfolioVal += crypto.num_of_shares * crypto.current_price;
    boughtAt += crypto.num_of_shares * crypto.buying_price;
  })

  useEffect(() => {
    dispatch(getPort())
    dispatch(setDbCoin())
  }, [dispatch])

  useEffect(() => {

  }, [coins, allInfo])

  return (
    <div>
      <div className={styles.portfolio}>
        <div>
          <h2>
            Portfolio: {(portfolioVal + user?.amount)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          </h2>
        </div>
        <div>
          <h4>
            Cash on hand: {(user?.amount)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          </h4>
        </div>
        <div className={styles.profit}>
          <span>Profit / Loss: </span>
          <span className={(portfolioVal - boughtAt) >= 0 ? styles.green : styles.red}>
            {(portfolioVal - boughtAt).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </div>
        <div className={styles.profit}>
          {portfolioVal == 0 ? " " :
            <>
              <span>Profit / Loss %: </span>
              <span className={((portfolioVal / boughtAt) - 1) >= 0 ? styles.green : styles.red}>
                {((portfolioVal / boughtAt) - 1).toLocaleString()}%
              </span>
            </>
          }
        </div>
      </div>
      <div className={styles.divFlex}>
        <div className={styles.left}>

          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date Bought</th>
                <th scope="col">Price & 24h % Change</th>
                <th scope="col"># of Shares</th>
                <th scope="col">Value</th>
                <th scope="col">Gain $ & %</th>
              </tr>
            </thead>
            <tbody>
              {
                allInfo.map((obj) => (
                  <tr>
                    <td className={styles.tdFlex}>
                      <img src={obj.image} className={styles.img} />
                      <span>{obj.name}</span>
                    </td>
                    <td>{(obj.date_bought)}</td>
                    <td className={styles.ps}>
                      <p>${(obj.current_price).toLocaleString()}</p>
                      <p className={obj.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                        {(obj.price_change_percentage_24h).toLocaleString()}%
                      </p>
                    </td>
                    <td>{obj.num_of_shares}</td>
                    <td>${(obj.buying_price * obj.num_of_shares).toLocaleString()}</td>
                    <td className={styles.ps}>
                      <p className={(obj.current_price * obj.num_of_shares) - (obj.buying_price * obj.num_of_shares) >= 0 ? styles.green : styles.red}>
                        {((obj.current_price * obj.num_of_shares) - (obj.buying_price * obj.num_of_shares)).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </p>
                      <p className={(((obj.current_price * obj.num_of_shares) / (obj.buying_price * obj.num_of_shares)) - 1) >= 0 ? styles.green : styles.red}>
                        {(((obj.current_price * obj.num_of_shares) / (obj.buying_price * obj.num_of_shares)) - 1).toLocaleString()}%
                    </p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <WatchList />
        </div>
      </div>
    </div>
  )
}

export default Profile;