//constants
const BUY_COIN = "portfolio/BUY_COIN"

const buy = (portfolio) => ({
  type: BUY_COIN,
  payload: portfolio
})

//thunks

export const buyCoin = (data) => async (dispatch) => {

  console.log(data);
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

//reducer

export default function portfolioReducer(state = [], action) {
  switch (action.type) {
    case BUY_COIN:
      return action.payload
    default:
      return state;
  }
}