import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListing from "./components/products/ProductListing";
import ProductDetail from "./components/products/ProductDetail";
import AddToCart from "./components/UI/AddToCart";
import CartPlaceOrder from "./components/UI/CartPlaceOrder";
import SuccessOrder from "./components/UI/SuccessOrder";
import WishListItem from "./components/UI/WishListItem";
// https://fakestoreapi.com/
function App() {
  return (
    <>
      <Router>
        <Navbar title="e-com-cart" />
        <div className="home">
          <div className="auto">
            <div className="comp" style={{ display: "flex", flexFlow: "row" }}>
              <Routes>
                <Route exact path="/home" element={<ProductListing />} />
                <Route
                  exact
                  path="/product/:productId"
                  element={<ProductDetail />}
                />
                {/* <Route exact path="/:carts" element={<AddToCart />} /> */}
                <Route
                  exact
                  path="/cart/placeOrder"
                  element={<CartPlaceOrder />}
                />
                <Route exact path="/successOrder" element={<SuccessOrder />} />
                <Route exact path="/wishList" element={<WishListItem />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
export default App;
