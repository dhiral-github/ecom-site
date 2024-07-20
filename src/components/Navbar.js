import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AddProductModal from "./AddProductModal";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchData,
  showproductModal,
} from "../redux/actionCreators/productActions";

export default function Navbar(props) {
  const dispatch = useDispatch();
  let location = useLocation();
  const { totalCartItem } = useSelector(
    (state) => state.allproducts.carts.cartsDetail
  );
  const { totalWishListItem } = useSelector(
    (state) => state.allproducts.wishList
  );

  useEffect(() => {
    return () => {};
  }, [location]);

  const handleClick = () => {
    dispatch(showproductModal(true));
  };

  const listItemArray = [
    {
      label: "Home ",
      path: "home",
    },
    {
      label: "Add product ",
      name: "add_product",
      onClick: handleClick,
    },
    // {
    //   // label: `Cart (${totalCartItem})`,
    //   label: `Cart ${totalCartItem > 0 ? totalCartItem : ''}`,
    //   path: 'carts',
    // },
    // {
    //   label: `Wish List ${totalWishListItem > 0 ? totalWishListItem : ''}`,
    //   path: 'wishList',
    // }
  ];

  return (
    <nav className={`navbar navbar-expand-lg navbar bg-light`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          {props.title}
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {listItemArray.map((lItem) => (
              <ListItem
                key={`${lItem?.label}-list-item`}
                label={lItem?.label}
                path={lItem?.path}
                location={location?.pathname}
                name={lItem?.name}
                linkStyle={{ backgroundColor: "white" }}
                handleClick={lItem?.onClick}
                style={lItem?.style}
              />
            ))}
            <AddProductModal />
            <div style={{ marginTop: "15px" }}>
              <div>
                <input
                  placeholder="Search for products, category and more"
                  style={{ width: "310px" }}
                  name="search"
                  onChange={(e) => dispatch(setSearchData(e.target.value))}
                />
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
