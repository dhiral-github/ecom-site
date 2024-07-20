import axios from "axios";
export const setproductLoading = () => {
  return {
    type: "SET_PRODUCT_LOADING",
  };
};

export const setproducts = () => async (dispatch) => {
  dispatch(setproductLoading());
  try {
    const newsSource = await axios.get(`https://fakestoreapi.com/products`);
    if (newsSource) {
      dispatch({
        type: "SET_PRODUCTS",
        payload: newsSource.data,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

export const selectedproduct = (id) => async (dispatch) => {
  dispatch(setproductLoading());
  try {
    // const newsSource = await axios.get(`https://fakestoreapi.com/products/${id}`);
    // console.log('newsSource===>>>',newsSource.data)
    // if (newsSource) {
    //   dispatch({
    //     type: "SELECTED_PRODUCTS",
    //     payload: {...newsSource.data, id},
    //   });
    // }
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "SELECTED_PRODUCTS",
          payload: id,
        });
      }
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const showproductModal = (openModal) => (dispatch) => {
  dispatch({
    type: "SHOW_PRODUCT_MODAL",
    payload: openModal,
  });
};

export const addnewProduct = (pData) => (dispatch) => {
  try {
    axios
      .post("https://fakestoreapi.com/products", pData)
      .then((response) => {
        if (response.status === 200) {
          const newProduct = {
            ...response.data,
            ...pData,
            id: response.data.id, // Assuming response.data already has an 'id' field
            price: Number(response.data.price),
          };
          dispatch({
            type: "ADD_NEW_PRODUCT",
            payload: newProduct,
          });

          dispatch(
            toastProduct({
              showToast: true,
              type: "success",
              message: "Product added successfully",
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          toastProduct({
            showToast: true,
            type: "danger",
            message: "Unable to add product",
          })
        );
      });
  } catch (err) {
    console.log("err==>", err);
  }
};

export const selectedProduct = (selectedproduct) => (dispatch) => {
  dispatch({
    type: "SELECTED_PRODUCT",
    payload: selectedproduct,
  });
};

export const updateProduct = (product) => (dispatch) => {
  const { id } = product;
  try {
    axios
      .put(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "UPDATE_PRODUCT",
            payload: product,
          });
          dispatch(
            toastProduct({
              showToast: true,
              type: "success",
              message: "Product updated successfully",
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          toastProduct({
            showToast: true,
            type: "danger",
            message: "Unable to update product",
          })
        );
      });
  } catch (err) {
    console.log("err", err);
  }
};
export const toastProduct = (toastProDetail) => (dispatch) => {
  dispatch({
    type: "TOAST_PRODUCT_MESSAGE",
    payload: toastProDetail,
  });
};
export const deleteProduct = (productId) => (dispatch) => {
  try {
    axios
      .delete(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "DELETE_PRODUCT",
            payload: productId,
          });
          dispatch(
            toastProduct({
              showToast: true,
              type: "success",
              message: "Product deleted successfully",
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          toastProduct({
            showToast: true,
            type: "danger",
            message: "Unable to delete product",
          })
        );
      });
  } catch (err) {
    console.log("err", err);
  }
};
export const addToCart = (cardData) => (dispatch) => {
  try {
    axios
      .post(`https://fakestoreapi.com/carts`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "ADD_TO_CART",
            payload: cardData,
          });
          dispatch(
            toastProduct({
              showToast: true,
              type: "success",
              message: "Cart item added successfully",
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          toastProduct({
            showToast: true,
            type: "danger",
          })
        );
      });
  } catch (err) {
    console.log("err", err);
  }
};
export const removeCartItem = (id) => (dispatch) => {
  try {
    axios
      .delete(`https://fakestoreapi.com/carts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "DELETE_TO_CART",
            payload: id,
          });
          dispatch(
            toastProduct({
              showToast: true,
              type: "success",
              message: "Cart item deleted successfully",
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          toastProduct({
            showToast: true,
            type: "danger",
          })
        );
      });
  } catch (err) {
    console.log("err", err);
  }
};

export const suucessOrderData = (data) => (dispatch) => {
  dispatch({
    type: "ORDER_SUCCESSFULL",
    payload: data,
  });
  dispatch(
    toastProduct({
      showToast: true,
      type: "success",
      message: "Your order has been successfully placed!",
    })
  );
};
export const setSearchData = (searchText) => (dispatch) => {
  dispatch({
    type: "SEARCH_PRODUCTS",
    payload: searchText,
  });
};
export const setFilterProducts = (filter) => (dispatch) => {
  dispatch({
    type: "RANGE_PRICE",
    payload: filter,
  });
};
export const setMinPrice = (minPrice) => (dispatch) => {
  dispatch({
    type: "SET_MIN_PRICE",
    payload: minPrice,
  });
};
export const setMaxPrice = (maxPrice) => (dispatch) => {
  dispatch({
    type: "SET_MAX_PRICE",
    payload: maxPrice,
  });
};
export const clearFilterProducts = (clearProduct) => (dispatch) => {
  dispatch({
    type: "CLEAR_FILTER_PRODUCTS",
    payload: clearProduct,
  });
};
export const categoryFilterProducts = (category) => (dispatch) => {
  dispatch({
    type: "CATEGORY_FILTER_PRODUCTS",
    payload: category,
  });
};
export const ratingStarProducts = (rating) => (dispatch) => {
  dispatch({
    type: "RATING_STAR",
    payload: rating,
  });
};
export const wishListProducts = (wishiList) => (dispatch) => {
  dispatch({
    type: "WISH_LIST",
    payload: wishiList,
  });
};
export const setLocalReduxWish = (localReduxData) => (dispatch) => {
  dispatch({
    type: "SET_LOCAL_REDUX_DATA",
    payload: localReduxData,
  });
};
export const setLocalReduxCart = (localReduxCart) => (dispatch) => {
  dispatch({
    type: "SET_LOCAL_REDUX_CART",
    payload: localReduxCart,
  });
};
