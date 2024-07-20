import React, { useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedproduct, addToCart } from "../../redux/actionCreators/productActions";
import DismissibleToasts from "../UI/DismissibleToasts";
import NoDataAvailable from "../UI/NoDataAvailable";
import SpinnerLoading from "../UI/SpinnerLoading";
import './productDetail.css'
const ProductDetail = () => {

  const dispatch = useDispatch();
  const { productId } = useParams();
  const { selectedBuyNowProduct, productLoading, toastDetails } = useSelector((state) => state.allproducts);
  const { title, image, price, category, description } = selectedBuyNowProduct;

  useEffect(() => {
    dispatch(selectedproduct(productId));
  }, [productId, dispatch])

  const addToCartItem = (products) => {
    dispatch(addToCart(products))
  }

  return (
    <div className="ui grid container">
      {
        toastDetails.showToast &&
        <DismissibleToasts />
      }
      {
        productLoading ? (
          <div>
            <SpinnerLoading text='Loading products...' />
          </div>
        ) : (

          Object.keys(selectedBuyNowProduct).length === 0 && !productLoading ?
            <NoDataAvailable text='Something went wrong...' /> :
            <div className="proDetail">
              <div>
                <Image className="proDetail-image" src={image} />
              </div>
              <div className="proDetail-contain">
                <div className="proDetail-Title">{title}</div>
                <div className="proDetail-Price">$ {price}</div>
                <div className="proDetail-Category mb-3">{category}</div>
                <h6>{description}</h6>
                <div className="mt-3" tabIndex="0">
                  <Button variant="success" onClick={() => addToCartItem(selectedBuyNowProduct)} >Add to Cart</Button>
                </div>
              </div>
            </div>
        )
      }
    </div>
  );
};

export default ProductDetail;