export const addItemAction = (action) => {
  // debugger
  return {
    type: "ADD_ITEM",
    payload: action,
  };
};

export const deleteItemAction = (action) => {
  // debugger
  return {
    type: "DELETE_ITEM",
    payload: action,
  };
};
export const updateItemAction = (action) => {
  // debugger
  return {
    type: "UPDATE_ITEM",
    payload: action,
  };
};
export const checkedItemAction = (action) => {
  // debugger
  return {
    type: "CHECKED_ITEM",
    payload: action,
  };
};

// export const festchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   return fetch("https://newsapi.org/v2/top-headlines?country=us&category=&apiKey=fe415a344cea4034bef041fac54c308c").then((res)=>{
//     console.log('fetchposts===>>>>>',res);
//     res.json()

//   })

// })
// const response = await client.get('/fakeApi/posts')
// return response.data

// export const fetchUserData = createAsyncThunk(
//   'user/fetchUserData',
//   (payload, { dispatch }) => {
//     return axios.get('/user'); // Return a promise
//   }
// );
