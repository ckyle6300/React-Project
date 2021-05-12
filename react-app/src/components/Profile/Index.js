import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import WatchList from '../WatchList/index'
import { getPort } from '../../store/portfolio'
import { setDbCoin } from '../../store/dbcoins'


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
  console.log(portfolioVal, boughtAt)
  console.log(allInfo);
  useEffect(() => {
    dispatch(getPort())
    dispatch(setDbCoin())
  }, [dispatch])

  useEffect(() => {

  }, [coins])

  return (
    <>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div><h2>Portfolio: {portfolioVal + user?.amount}</h2></div>
        <div><p>Cash: {user?.amount}</p></div>
        <div> Gain:
          <div>{portfolioVal - boughtAt}</div>
          <div>{(portfolioVal / boughtAt) - 1}</div>
        </div>
      </div>
      <div>
        {
          allInfo.map((obj) => (
            <>
              <div><img src={obj.image} /></div>
              <div><h3>{obj.name}</h3></div>
              <div><p>Date Bought : {obj.date_bought}</p></div>
              <div>
                <p>Price: {obj.current_price}</p>
                <p>24h % Change : {obj.price_change_percentage_24h}%</p>
              </div>
              <div><p>Value: {obj.buying_price * obj.num_of_shares}</p></div>
              <div>Gain:
                <div><p>{(obj.current_price * obj.num_of_shares) - (obj.buying_price * obj.num_of_shares)}</p></div>
                <div><p>{((obj.current_price * obj.num_of_shares) / (obj.buying_price * obj.num_of_shares)) - 1}</p></div>
              </div>
            </>
          ))
        }
      </div>
      <div>
        <WatchList />
      </div>
    </>
  )
}

export default Profile;