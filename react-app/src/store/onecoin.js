//constants

const GET_ONE = "coins/GET_ONE"

const setOne = (coin) => ({
  type: GET_ONE,
  payload: coin
})

//thunks

export const setOneCoin = (name) => async (dispatch) => {
  const response = await fetch(`/api/coin/${name}/info`)
  if (response.ok) {
    const data = await response.json();
    return dispatch(setOne(data));
  } else {
    console.log("problems with data")
  }
  return null
}

//reducer

export default function oneCoinReducer(state = [], action) {
  switch (action.type) {
    case GET_ONE:
      return action.payload
    default:
      return state;
  }
}