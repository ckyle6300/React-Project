//constants

const GET_DBCOINS = "dbcoins/GET_DBCOINS"

const setDbCoins = (coins) => ({
  type: GET_DBCOINS,
  payload: coins
})

//thunks

export const setDbCoin = () => async (dispatch) => {
  const response = await fetch('/api/dbcoin/')
  if (response.ok) {
    const data = await response.json();
    return dispatch(setDbCoins(data));
  } else {
    console.log("problems with data")
  }
  return null
}

//reducer

export default function dbCoinReducer(state = {}, action) {
  switch (action.type) {
    case GET_DBCOINS:
      const newState = {}
      action.payload.forEach(obj => {
        newState[obj.storeId] = obj
      });
      return newState
    default:
      return state;
  }
}