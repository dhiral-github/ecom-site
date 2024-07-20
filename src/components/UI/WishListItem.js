import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import CardItemComponent from "./CardItemComponent";
import './wishlistItem.css';

const WishListItem = () => {
  const { wishListItem } = useSelector((state) => state.allproducts.wishList);
  const [wishListData, setwishListData] = useState([]);

  useEffect(() => {
    if (wishListItem.length === 0) {
      const getWishItems = JSON.parse(localStorage.getItem('wishItems'));
      setwishListData(getWishItems);
    } else {
      setwishListData(wishListItem);
    }
  }, [wishListItem])

  return (
    <div className="container wish-flex wish-list-container">
      {
        wishListData.length === 0 ?
          (
            <div className='wishListItem-empty'>Wish list is empty</div>
          )
          :
          wishListData.map((product, index) => {
            return (
              <div className="col-md-3 mb-4" key={index}>
                <CardItemComponent product={product} />
              </div>
            )
          })
      }
    </div>
  )
}

export default WishListItem