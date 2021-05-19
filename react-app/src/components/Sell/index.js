import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styles from './sell.module.css';
import { updateCoin, deleteCoin } from '../../store/portfolio';
import { changeAmount } from '../../store/session';

const Sell = ({ crypto, close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const dbCoin = useSelector(state => state.dbcoins);
  const portfolio = useSelector(state => state.portfolio);

  const coin = portfolio.filter(obj => obj.date_bought == crypto.date_bought)[0];

  const [num_of_shares, setNum_of_shares] = useState(0);
  console.log(crypto)
  const handleSubmit = (e) => {
    e.preventDefault();

    const total = -(Number(num_of_shares * crypto.current_price))
    const userData = {
      amount: total
    }

    const portfolioData = {
      id: coin.id,
      num_of_shares: Number(num_of_shares)
    }

    if (num_of_shares > crypto.num_of_shares || num_of_shares <= 0) {
      alert("Please Submit Valid Number of Shares")

    } else if (num_of_shares == crypto.num_of_shares) {
      dispatch(deleteCoin(portfolioData))
      dispatch(changeAmount(userData));

      setNum_of_shares(0);
      close();

    } else {
      dispatch(updateCoin(portfolioData))
      dispatch(changeAmount(userData));

      setNum_of_shares(0);
      close();
    }
  }
  return (
    <form className={styles.outerDiv} onSubmit={handleSubmit}>
      <div>
        <label>Current # of Shares: {(crypto.num_of_shares)?.toLocaleString()}</label>
      </div>
      <div>
        <label>Shares to Sell </label>
        <input value={num_of_shares} onChange={(e) => setNum_of_shares(e.target.value)} />
      </div>
      <div>
        <label>Current Mkt Price Value: {(num_of_shares * crypto.current_price)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</label>
      </div>
      <div>
        <label>Price Value when bought: {(num_of_shares * crypto.buying_price)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</label>
      </div>
      <div>
        <label>Profit/Loss: {((num_of_shares * crypto.current_price) - (num_of_shares * crypto.buying_price)).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</label>
      </div>
      <button>Sell</button>
    </form>
  )
}

export default Sell