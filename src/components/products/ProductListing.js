import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductComponent from "./ProductComponent";
import { setproducts } from "../../redux/actionCreators/productActions";
import DismissibleToasts from "../UI/DismissibleToasts";

const ProductListing = () => {
  const { toastDetails } = useSelector((state) => state.allproducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setproducts());
  }, [dispatch]);

  return (
    <>
      {
        toastDetails.showToast &&
        <DismissibleToasts />
      }
      <ProductComponent />
    </>
  )
};

export default ProductListing;
