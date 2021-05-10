//constants

const ADD_TO_WL = "wl/ADD_TO_WL"
const GET_WL = "wl/GET_WL"

const addWL = (watchList) => ({
  type: ADD_TO_WL,
  payload: watchList
})

const getTheWL = (watchlist) => ({
  type: GET_WL,
  payload: watchlist
})

//thunks

export const getAllWl = () => async (dispatch) => {
  const response = await fetch('/api/watchlist/');
  if (response.ok) {
    const data = await response.json();
    return dispatch(getTheWL(data));
  } else {
    console.log("problems with data")
  }
  return null
}

export const addToWL = (info) => async (dispatch) => {
  const response = await fetch('/api/watchlist/add', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "user_id": info.user_id,
      "crypto_id": info.crypto_id
    })
  })
  if (response.ok) {
    const data = await response.json();
    return dispatch(addWL(data));
  } else {
    console.log("problems with data")
  }
  return null
}

//reducer

export default function oneCoinReducer(state = [], action) {
  switch (action.type) {
    case GET_WL:
      return action.payload
    case ADD_TO_WL:
      return action.payload
    default:
      return state;
  }
}