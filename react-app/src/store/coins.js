//constants

const GET_COINS = "coins/GET_APICOINS"

const setCoins = (coins) => ({
  type: GET_COINS,
  payload: coins
})

//thunks

export const setCoin = () => async (dispatch) => {
  const response = await fetch('/api/coin/info')
  if (response.ok) {
    const data = await response.json();
    return dispatch(setCoins(data));
  } else {
    console.log("problems with data")
  }
  return null
}

//reducer

export default function coinReducer(state = [], action) {
  switch (action.type) {
    case GET_COINS:
      const newState = {}
      action.payload.forEach(obj => {
        newState[obj.id] = obj
      });
      return newState
    default:
      return state;
  }
}