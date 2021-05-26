import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './sell.module.css';
import { updateCoin, deleteCoin } from '../../store/portfolio';
import { changeAmount } from '../../store/session';

const Sell = ({ crypto, close, dbCrypto }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  const [num_of_shares, setNum_of_shares] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = -(Number(num_of_shares * crypto.current_price))
    const userData = {
      amount: total
    }

    const portfolioData = {
      id: dbCrypto.id,
      num_of_shares: Number(num_of_shares)
    }

    if (num_of_shares > dbCrypto.num_of_shares || num_of_shares <= 0) {
      alert("Please Submit Valid Number of Shares")

    } else if (num_of_shares == dbCrypto.num_of_shares) {
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
        <label>Current # of Shares: {(dbCrypto.num_of_shares)?.toLocaleString()}</label>
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
        <label>Price Value when bought: {(num_of_shares * dbCrypto.buying_price)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</label>
      </div>
      <div>
        <label>Profit/Loss: {((num_of_shares * crypto.current_price) - (num_of_shares * dbCrypto.buying_price)).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</label>
      </div>
      <button>Sell</button>
    </form>
  )
}

export default Sell