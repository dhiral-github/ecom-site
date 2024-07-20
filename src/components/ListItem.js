import React from "react";
import { Link } from "react-router-dom";

const ListItem = (props) => {
  const { style, linkStyle, label, path, location, handleClick, name } = props;

  return (
    <li className="nav-link" style={style}>
      {
        <>
          <Link
            className={`nav-link ${location === path ? "active" : ""}`}
            style={linkStyle}
            aria-current="page"
            to={path}
            onClick={handleClick}
          >
            {" "}
            {label}
            {name === "add_product" && <i className="bi bi-plus-lg"></i>}
            {path === "home" && <i className="bi bi-house-door"></i>}
            {/* {
              path === 'carts' && <i className="bi bi-cart4"></i>
            } */}
            {path === "wishList" && <i className="bi bi-bag-fill"></i>}
          </Link>
        </>
      }
    </li>
  );
};

export default ListItem;
