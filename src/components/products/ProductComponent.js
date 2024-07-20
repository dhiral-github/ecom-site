import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showproductModal,
  deleteProduct,
  selectedProduct,
  setFilterProducts,
  categoryFilterProducts,
  ratingStarProducts,
  setLocalReduxCart,
  setLocalReduxWish,
} from "../../redux/actionCreators/productActions";
import CardItemComponent from "../UI/CardItemComponent";
import FilterProductsComponent from "../UI/FilterProductsComponent";
import NoDataAvailable from "../UI/NoDataAvailable";
import SpinnerLoading from "../UI/SpinnerLoading";
import "./productComponent.css";

const ProductComponent = () => {
  const dispatch = useDispatch();
  const { products, productLoading, searchText } = useSelector(
    (state) => state.allproducts
  );
  const { rangePrice, categoryFilter, ratingStar } = useSelector(
    (state) => state.allproducts.filterData
  );
  const [filterProductData, setFilterData] = useState(products);

  const handleEdit = (id) => {
    const selectedObj = products.find((i) => i.id === id);
    dispatch(showproductModal(true));
    dispatch(selectedProduct(selectedObj));
  };
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleCategory = (categoryName) => {
    dispatch(categoryFilterProducts(categoryName));
  };
  const handleRatingStar = (e) => {
    if (e.target.checked) {
      dispatch(ratingStarProducts(e.target.value));
    } else {
      dispatch(ratingStarProducts(""));
    }
  };

  const searchProducts = products?.filter(
    (i) =>
      (Math.trunc(i.price) === Number(searchText) ||
        i.title?.toLowerCase().match(searchText?.toLowerCase()) ||
        i.description?.toLowerCase().match(searchText?.toLowerCase()) ||
        i.id === Number(searchText) ||
        i.category?.toLowerCase().match(searchText?.toLowerCase())) &&
      i.price >= rangePrice[0] &&
      i.price <= rangePrice[1] &&
      (categoryFilter && categoryFilter !== "Select category"
        ? i.category === categoryFilter
        : true) &&
      (ratingStar ? i.rating?.rate >= ratingStar : true)
  );

  useEffect(() => {
    // const getFilterWish = JSON.parse(localStorage.getItem("wishItems"));
    // const getFilterCart = JSON.parse(localStorage.getItem("cartItems"));
    // if (getFilterWish?.length) {
    //   dispatch(setLocalReduxWish(getFilterWish));
    // }
    // if (Object.keys(getFilterCart)?.length) {
    //   dispatch(setLocalReduxCart(getFilterCart));
    // }
    setFilterData(searchProducts);
  }, [products, searchText, rangePrice, categoryFilter, ratingStar, dispatch]);

  // useEffect(() => {
  //   const getRangePrice = JSON.parse(localStorage.getItem("setRangePrice"));
  //   if (getRangePrice?.length) {
  //     dispatch(setFilterProducts(getRangePrice));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const getFilterCategory = JSON.parse(
      localStorage.getItem("setFilterCategory")
    );
    if (getFilterCategory !== "Select category") {
      dispatch(categoryFilterProducts(getFilterCategory));
    }
  }, [products, searchText, rangePrice, categoryFilter, ratingStar, dispatch]);

  // useEffect(() => {
  //   const getFilterRating = JSON.parse(localStorage.getItem("setPriceRating"));
  //   if (getFilterRating) {
  //     dispatch(ratingStarProducts(getFilterRating));
  //   }
  // }, [dispatch]);

  return (
    <>
      <div className="filterHome mx-3">
        {
          <div>
            <FilterProductsComponent
              onhandleCheck={handleCategory}
              onRatingStar={handleRatingStar}
              filterProductsLength={searchProducts?.length}
            />
          </div>
        }
      </div>
      <div className="productHome">
        {productLoading ? (
          <div className="loading-product">
            <SpinnerLoading text="Loading products..." />
          </div>
        ) : (
          filterProductData?.map((product, index) => {
            return (
              <div className="col-md-3 mb-4" key={index}>
                <CardItemComponent
                  product={product}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })
        )}
        {products.length === 0 && !productLoading && (
          <NoDataAvailable text="Something went wrong..." />
        )}
      </div>
    </>
  );
};

export default ProductComponent;
