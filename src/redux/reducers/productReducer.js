const intialState = {
  products: [],
  productLoading: false,
  showProductModal: false,
  selectedProduct: {},
  selectedBuyNowProduct: {},
  toastMessage: "",
  toastDetails: {
    showToast: false,
    type: "success",
    message: "",
  },
  searchText: "",
  carts: {
    cartsItem: [],
    cartsDetail: {
      totalPrice: 0,
      totalCartItem: 0,
    },
    cartOrderSuccess: [],
  },
  filterData: {
    rangePrice: [0, 1000],
    categoryFilter: "",
    ratingStar: 0,
  },
  wishList: {
    wishListItem: [],
    totalWishListItem: 0,
  },
};

const productReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PRODUCT_LOADING":
      return {
        ...state,
        productLoading: true,
      };
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: payload,
        // products: [],
        productLoading: false,
      };
    }
    case "SELECTED_PRODUCTS": {
      const objBuyNow = [...state.products];
      const dataObj = objBuyNow.find((i) => {
        return Number(i.id) === Number(payload);
      });
      console.log("dataObj=====>>", dataObj);

      return {
        ...state,
        selectedBuyNowProduct: dataObj,
        // products: {},
        productLoading: false,
      };
    }
    case "SHOW_PRODUCT_MODAL": {
      return {
        ...state,
        showProductModal: payload,
      };
    }

    case "ADD_NEW_PRODUCT": {
      const productData = [...state.products];
      productData.splice(0, 0, payload);
      // productData.unshift(payload);
      // const productData = [payload].concat(state.products);
      console.log("[...state.products]====>>>", productData);
      return {
        ...state,
        products: productData,
      };
    }
    case "SELECTED_PRODUCT": {
      return {
        ...state,
        selectedProduct: payload,
        productLoading: false,
      };
    }

    case "ADD_TO_CART": {
      const { cartsItem } = state.carts;
      const isItemExist = cartsItem.find((i) => i.id === payload.id);
      let cartTotalPrice = 0;
      if (!isItemExist) {
        cartsItem.push(payload);
      }

      cartsItem.forEach((i) => {
        if (!i["quantity"]) {
          i["quantity"] = 1;
        } else {
          if (i.id === payload.id) {
            i.quantity += 1;
          }
        }
        cartTotalPrice += i.price * i.quantity;
      });
      // const cartTotalPrice = cartsItem.reduce((total, i) => total + i.price * i.quantity, 0).toFixed(2);
      const cartData = {
        cartsItem: cartsItem,
        cartsDetail: {
          totalPrice: Number(cartTotalPrice).toFixed(2),
          totalCartItem: cartsItem.length,
        },
      };
      localStorage.setItem("cartItems", JSON.stringify(cartData));
      return {
        ...state,
        carts: cartData,
      };
    }

    case "DELETE_TO_CART": {
      const proState = [...state.carts.cartsItem];
      const remainProducts = proState.filter((i) => i.id !== payload);
      const remainTotalPrice = remainProducts
        .reduce((total, i) => total + i.price * i.quantity, 0)
        .toFixed(2);
      localStorage.setItem("cartItems", JSON.stringify(remainProducts));

      return {
        ...state,
        carts: {
          ...state.carts,
          cartsItem: remainProducts,
          cartsDetail: {
            ...state.carts.cartsDetail,
            totalPrice: Number(remainTotalPrice),
            totalCartItem: remainProducts.length,
          },
        },
      };
    }
    case "UPDATE_PRODUCT": {
      const { id } = payload;
      const proState = [...state.products];
      const findObject = proState.findIndex((i) => i.id === id);
      proState.splice(findObject, 1, payload);
      return {
        ...state,
        products: proState,
      };
    }
    case "TOAST_PRODUCT_MESSAGE": {
      return {
        ...state,
        toastDetails: payload,
      };
    }
    case "DELETE_PRODUCT": {
      const proState = [...state.products];
      const deleteId = proState.filter((i) => i.id !== payload);
      return {
        ...state,
        products: deleteId,
      };
    }
    case "ORDER_SUCCESSFULL": {
      return {
        ...state,
        carts: {
          ...state.carts,
          cartOrderSuccess: payload,
        },
      };
    }
    case "SEARCH_PRODUCTS": {
      return {
        ...state,
        searchText: payload,
      };
    }
    case "RANGE_PRICE": {
      localStorage.setItem("setRangePrice", JSON.stringify(payload));
      return {
        ...state,
        filterData: {
          rangePrice: payload,
        },
      };
    }
    case "CLEAR_FILTER_PRODUCTS": {
      const clearFilter = [0, 1000];
      localStorage.setItem("setRangePrice", JSON.stringify(clearFilter));
      return {
        ...state,
        filterData: {
          ...state.filterData,
          rangePrice: clearFilter,
        },
      };
    }
    case "SET_MIN_PRICE": {
      const setMinPrice = [Number(payload), state.filterData.rangePrice[1]];
      localStorage.setItem("setRangePrice", JSON.stringify(setMinPrice));
      return {
        ...state,
        filterData: {
          ...state.filterData,
          rangePrice: setMinPrice,
        },
      };
    }
    case "SET_MAX_PRICE": {
      const setMaxPrice = [state.filterData.rangePrice[0], Number(payload)];
      localStorage.setItem("setRangePrice", JSON.stringify(setMaxPrice));
      return {
        ...state,
        filterData: {
          ...state.filterData,
          rangePrice: setMaxPrice,
        },
      };
    }
    case "CATEGORY_FILTER_PRODUCTS": {
      localStorage.setItem("setFilterCategory", JSON.stringify(payload));
      return {
        ...state,
        filterData: {
          ...state.filterData,
          categoryFilter: payload,
        },
      };
    }
    case "RATING_STAR": {
      localStorage.setItem("setPriceRating", JSON.stringify(payload));
      return {
        ...state,
        filterData: {
          ...state.filterData,
          ratingStar: payload,
        },
      };
    }
    case "WISH_LIST": {
      const { wishListItem } = state.wishList;
      let tempWishlistItem = [...wishListItem];
      const wishItem = wishListItem.find(
        (i) => Number(i.id) === Number(payload.id)
      );
      if (!wishItem) {
        tempWishlistItem.push(payload);
      } else {
        tempWishlistItem = wishListItem.filter((i) => i.id !== payload.id);
        console.log("WISH_LIST tempWishlistItem =====>>", tempWishlistItem);
      }
      localStorage.setItem("wishItems", JSON.stringify(tempWishlistItem));

      return {
        ...state,
        wishList: {
          wishListItem: tempWishlistItem,
          totalWishListItem: tempWishlistItem.length,
        },
      };
    }
    case "SET_LOCAL_REDUX_DATA": {
      console.log("payload SET_LOCAL_REDUX_DATA ", payload);
      return {
        ...state,
        wishList: {
          wishListItem: payload,
          totalWishListItem: payload?.length,
        },
      };
    }
    case "SET_LOCAL_REDUX_CART": {
      console.log("payload SET_LOCAL_REDUX_CART ", payload);
      return {
        ...state,
        carts: payload,
      };
    }

    default:
      return state;
  }
};

export default productReducer;
