import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useHistory } from 'react-router';
import { buyCoin } from '../../store/portfolio'
import { changeAmount } from '../../store/session'
import styles from './portfolioForm.module.css'


const PortfolioForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dbCoin = useSelector(state => state.dbcoins);
  const coin = useSelector(state => state.onecoin);
  const user = useSelector(state => state.session.user);
  const mktCoin = useSelector(state => state.coins);
  const [num_of_shares, setNum_of_shares] = useState(0);

  const mkt = mktCoin[coin?.id];
  const currCoin = dbCoin[coin?.name]

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user?.amount < (num_of_shares * mkt?.current_price)) {
      alert("Insuficient Funds")
    } else {
      const portfolioData = {
        num_of_shares: Number(num_of_shares),
        buying_price: mkt?.current_price,
        user_id: user?.id,
        crypto_id: currCoin?.id
      }

      const total = Number(num_of_shares * mkt?.current_price)
      const userData = {
        user_id: user?.id,
        amount: total
      }

      dispatch(buyCoin(portfolioData));
      dispatch(changeAmount(userData));

      history.push('/profile')
    }
  }

  return (
    <form className={styles.outerDiv} onSubmit={handleSubmit}>
      <div>
        <label>Cash Available {(user?.amount)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</label>
      </div>
      <div>
        <label># of shares </label>
        <input onChange={(e) => setNum_of_shares(e.target.value)} />
      </div>
      <div>
        <label>Amount {(num_of_shares * mkt?.current_price)?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}</label>
      </div>
      <button>Buy</button>
    </form>
  )
}

export default PortfolioForm;