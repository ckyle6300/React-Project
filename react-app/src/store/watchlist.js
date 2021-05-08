//constants

const ADD_TO_WL = "wl/ADD_TO_WL"

const addWL = (watchList) => ({
  type: ADD_TO_WL,
  payload: watchList
})

//thunks

export const addToWL = (info) => async (dispatch) => {
  console.log(info)
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
    case ADD_TO_WL:
      return action.payload
    default:
      return state;
  }
}