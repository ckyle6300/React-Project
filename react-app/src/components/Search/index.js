import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import styles from './search.module.css'


const Search = ({ close }) => {
  const { name } = useParams()
  const coins = useSelector(state => state.coins)
  const [search, setSearch] = useState('');
  const history = useHistory()

  const vals = Object.values(coins);
  let searchArr = []
  if (search) {
    searchArr = vals?.filter(crypto => {
      if (crypto.name?.toLowerCase().includes(search.toLowerCase()) || crypto.symbol?.toLowerCase().includes(search.toLowerCase())) {
        return crypto;
      }
    });
  }


  return (
    <div>
      <div>
        <form>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search Crypto'
          />
        </form>
      </div>
      {
        searchArr?.map((crypto) => (
          <div className={styles.outerDiv}>
            <NavLink to={`/cryptos/${crypto.id}`} className={styles.searchDiv} onClick={(e) => close()}>
              <div className={styles.contentDiv}><img src={crypto.image} className={styles.cryptoImg} /></div>
              <div className={styles.contentDiv}><p>{crypto.name}</p></div>
            </NavLink>
          </div>
        ))
      }
    </div>
  )
}

export default Search