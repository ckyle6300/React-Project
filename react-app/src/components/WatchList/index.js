import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWl } from '../../store/watchlist'


const WatchList = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const watchlist = useSelector(state => state.watchlist)

  useEffect(() => {
    dispatch(getAllWl())
  }, [dispatch])

  console.log(watchlist)

  return (
    <h1>Okay</h1>
  )
}

export default WatchList