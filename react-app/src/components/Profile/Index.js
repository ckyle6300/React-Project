import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import WatchList from '../WatchList/index';
import { getPort } from '../../store/portfolio';
import { setDbCoin } from '../../store/dbcoins';
import styles from './profile.module.css';
import Sell from '../Sell/index';
import SellButton from '../Sell/SellButton';
import Story from '../Story/Index'
import { getStories } from '../../store/stories';


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const portfolio = useSelector(state => state.portfolio);
  const coins = useSelector(state => state.coins);
  let stories = useSelector(state => state.stories.status_updates);

  stories = stories?.slice(0, 10);

  let portfolioVal = 0;
  let boughtAt = 0;

  portfolio.forEach((crypto) => {
    let mktCoins = coins[crypto.crypto.storeId]

    portfolioVal += (crypto.num_of_shares * mktCoins?.current_price);
    boughtAt += (crypto.num_of_shares * crypto.buying_price);
  })

  useEffect(() => {
    dispatch(getPort())
    dispatch(setDbCoin())
    dispatch(getStories())
  }, [dispatch])

  useEffect(() => {

  }, [coins, user])


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
        <div className={styles.profit}>
          <span>Total Profit / Loss: </span>
          <span className={((portfolioVal + user?.amount) - 10000) >= 0 ? styles.green : styles.red}>
            {((portfolioVal + user?.amount) - 10000)?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
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
          <span>Holdings Profit / Loss: </span>
          <span className={(portfolioVal - boughtAt) >= 0 ? styles.green : styles.red}>
            {(portfolioVal - boughtAt)?.toLocaleString('en-US', {
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
                {((((portfolioVal + user?.amount) - 10000) / 10000) * 100)?.toLocaleString()}%
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
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                portfolio.map((crypto) => (
                  <tr>
                    <td className={styles.tdFlex}>
                      <img src={coins[crypto.crypto.storeId]?.image} className={styles.img} />
                      <span>{coins[crypto.crypto.storeId]?.name}</span>
                    </td>
                    <td>{(crypto.date_bought)?.toLocaleString()}</td>
                    <td className={styles.ps}>
                      <p>${(coins[crypto.crypto.storeId]?.current_price)?.toLocaleString()}</p>
                      <p className={coins[crypto.crypto.storeId]?.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                        {(coins[crypto.crypto.storeId]?.price_change_percentage_24h)?.toLocaleString()}%
                      </p>
                    </td>
                    <td>{crypto.num_of_shares}</td>
                    <td>${(coins[crypto.crypto.storeId]?.current_price * crypto.num_of_shares)?.toLocaleString()}</td>
                    <td className={styles.ps}>
                      <p className={(coins[crypto.crypto.storeId]?.current_price * crypto.num_of_shares) - (crypto.buying_price * crypto.num_of_shares) >= 0 ? styles.green : styles.red}>
                        {((coins[crypto.crypto.storeId]?.current_price * crypto.num_of_shares) - (crypto.buying_price * crypto.num_of_shares))?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </p>
                      <p className={(((coins[crypto.crypto.storeId]?.current_price * crypto.num_of_shares) / (crypto.buying_price * crypto.num_of_shares)) - 1) >= 0 ? styles.green : styles.red}>
                        {(((coins[crypto.crypto.storeId]?.current_price * crypto.num_of_shares) / (crypto.buying_price * crypto.num_of_shares)) - 1)?.toLocaleString()}%
                    </p>
                    </td>
                    <td>
                      <div>
                        <SellButton crypto={coins[crypto.crypto.storeId]} dbCrypto={crypto} />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className={styles.stories}>
            <h2>Project Announcements</h2>
            {stories?.map(story => (
              <Story key={story.created_at} info={story} />
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <WatchList />
        </div>
      </div>
    </div>
  )
}

export default Profile;