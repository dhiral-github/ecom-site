const intialState = [];

const addItemReducer = (state = intialState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      state.push(action.payload);
      return state;
    }
    case "DELETE_ITEM": {
      const itemId = action.payload;
      return state.filter((item) => {
        return item.id !== itemId;
      });
    }
   
    case "UPDATE_ITEM": {
      const { id, firstname, lastname, mobile, middlename, email } = action.payload;
      const localState = [...state];
      const existingItem = localState.find((item) => item.id === id);

      // const itemIndex = localState.indexOf(existingItem);
      if (existingItem) {
        existingItem.formData.firstname = firstname;
        existingItem.formData.lastname = lastname;
        existingItem.formData.mobile = mobile;
        existingItem.formData.middlename = middlename;
        existingItem.formData.email = email;
      }
      return localState;

      // const localState = [...state];
      // const userIndex = localState.findIndex((item) => item.id === id);

      // if (userIndex !== -1) {
      //     localState[userIndex] = {
      //         ...localState[userIndex],
      //         formData: {
      //             ...localState[userIndex].formData,
      //             firstname,
      //             lastname,
      //             mobile
      //         }
      //     };
      //     console.log('local state updated: ---', localState[userIndex]);
      //     return localState;
      // }
    }
    // case 'CHECKED_ITEM':
    //     {
    //         const itemId = action.payload
    //         itemId.filter(list => {
    //             if (list === action.payload)
    //                 list = action.payload

    //         })
    //         // return itemId
    //         // return state.filter((item) => {
    //         //     return item.id !== itemId
    //         // })
    //     }
    // function fetchPosts() {
    //   const URL = "https://jsonplaceholder.typicode.com/posts";
    //   return fetch(URL, { method: 'GET' })
    //     .then(response => Promise.all([response, response.json()]));
    // }

    case "SHOW_API_REDUX_ITEM": {

      const URL = "https://newsapi.org/v2/top-headlines?country=us&category=&apiKey=fe415a344cea4034bef041fac54c308c";
      fetch(URL, { method: 'GET' })

        .then((response) => {
          Promise.all(response.json())
        });


      // const localState = [...state];
      const showItem = action.payload;
      // return {
      //   ...state,
      //   URL

      // };
    }
    default:
      return state;
      
  }
};

export default addItemReducer;
