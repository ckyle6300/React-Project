//constants
const GET_STORY = "coins/GET_STORY"

const setStories = (stories) => ({
  type: GET_STORY,
  payload: stories
})

//thunks

export const getStories = () => async (dispatch) => {
  const response = await fetch('/api/coin/status')
  if (response.ok) {
    const data = await response.json();
    return dispatch(setStories(data));
  } else {
    console.log("problems with data");
  }
  return null
}

//reducer

export default function storyReducer(state = [], action) {
  switch (action.type) {
    case GET_STORY:
      return action.payload;
    default:
      return state;
  }
}