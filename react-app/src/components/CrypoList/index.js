import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCoin } from '../../store/coins'
import { NavLink } from 'react-router-dom';

const CryptoList = () => {
  const coins = useSelector((state) => state.coins)

  useEffect(() => {

  }, [coins])

  const coinArr = Object.values(coins);

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>24h%</th>
          <th>Market Cap</th>
          <th>Circulating Supply</th>
        </tr>
        {coinArr.map((obj) => {
          return (
            <tr>
              <td> <NavLink to={`/cryptos/${obj.id}`}>
                <div><img src={obj.image} /></div>
                <div>{obj.name}</div>
              </NavLink></td>
              <td>{obj.current_price}</td>
              <td>{obj.price_change_percentage_24h}</td>
              <td>{obj.market_cap}</td>
              <td>{obj.circulating_supply}</td>
            </tr>

          )
        }
        )}
      </table>
    </div>
  )
}

export default CryptoList;