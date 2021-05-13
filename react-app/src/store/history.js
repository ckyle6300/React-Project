//constants

const GET_HISTDATA = "hist/GET_HISTDATA"

const setHistories = (data) => ({
  type: GET_HISTDATA,
  payload: data
})

//thunks

export const setHistory = (name) => async (dispatch) => {
  console.log(name)
  const response = await fetch(`/api/coin/${name}/chartinfo`);
  if (response.ok) {
    const data = await response.json();
    console.log(data)
    return dispatch(setHistories(data));
  } else {
    console.log("problems with data")
  }
  return null
}

export default function historyReducer(state = [], action) {
  switch (action.type) {
    case GET_HISTDATA:
      return action.payload
    default:
      return state;
  }
}