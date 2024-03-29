//constants
const BUY_COIN = "portfolio/BUY_COIN"
const GET_COINS = "portfolio/GET_COINS"
const UPDATE_COIN = "portfolio/UPDATE_COIN"
const DELETE_COIN = "portfolio/DELETE_COIN"

const buy = (portfolio) => ({
  type: BUY_COIN,
  payload: portfolio
})

const get = (portfolio) => ({
  type: GET_COINS,
  payload: portfolio
})

const update = (portfolio) => ({
  type: UPDATE_COIN,
  payload: portfolio
})

const del = (portfolio) => ({
  type: DELETE_COIN,
  payload: portfolio
})

//thunks

export const buyCoin = (data) => async (dispatch) => {

  const response = await fetch('/api/portfolio/buy', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "num_of_shares": data.num_of_shares,
      "buying_price": data.buying_price,
      "crypto_id": data.crypto_id,
      "user_id": data.user_id
    })
  })

  if (response.ok) {
    const data = await response.json();
    return dispatch(buy(data));
  } else {
    console.log("problems with data")
  }
  return null
}

export const updateCoin = (data) => async (dispatch) => {

  const response = await fetch('/api/portfolio/sell', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "num_of_shares": data.num_of_shares,
      "id": data.id
    })
  })

  if (response.ok) {
    const data = await response.json();
    return dispatch(update(data));
  } else {
    console.log("problems with data")
  }
  return null
}

export const deleteCoin = (data) => async (dispatch) => {

  const response = await fetch('/api/portfolio/del', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": data.id
    })
  })

  if (response.ok) {
    const data = await response.json();
    return dispatch(del(data));
  } else {
    console.log("problems with data")
  }
  return null
}

export const getPort = (data) => async (dispatch) => {
  const response = await fetch('/api/portfolio/')
  if (response.ok) {
    const data = await response.json();
    return dispatch(get(data));
  } else {
    console.log("problems with data")
  }
  return null
}

//reducer

export default function portfolioReducer(state = [], action) {
  switch (action.type) {
    case BUY_COIN:
      return action.payload
    case GET_COINS:
      return action.payload
    case UPDATE_COIN:
      return action.payload
    case DELETE_COIN:
      return action.payload
    default:
      return state;
  }
}