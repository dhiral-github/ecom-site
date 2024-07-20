import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { suucessOrderData } from '../../redux/actionCreators/productActions';
import { useNavigate } from 'react-router-dom';
import './cartPlaceOrder.css'

const CartPlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultFormData = {
    name: '',
    address: '',
    contactNumber: '',
    pinCode: '',
    CityDistrictTown: '',
    State: '',
  }
  const [cartOrder, setcartOrder] = useState(defaultFormData)
  const [cartError, setCartError] = useState(false);
  const { cartsItem, cartsDetail } = useSelector((state) => state.allproducts.carts);
  let totalQuantity = 0;

  cartsItem.forEach(item => {
    totalQuantity += item.quantity
  });

  const handleChangeOrder = (e) => {
    setcartOrder({
      ...cartOrder,
      [e.target.name]: e.target.value
    })

  }

  const checkEmail = (email) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(email)) {
      debugger
      return true;
    } else {
      debugger
      return false;
    }
  };

  const deliverProduct = (cartOrderDetail) => {
    if (!cartOrderDetail.name ||
      !cartOrderDetail.address ||
      !cartOrderDetail.contactNumber ||
      !cartOrderDetail.pinCode ||
      !cartOrderDetail.CityDistrictTown ||
      !cartOrderDetail.State ||
      checkEmail(cartOrderDetail.email)
    ) {
      setCartError({
        nameError: !cartOrderDetail.name,
        emailError: checkEmail(cartOrderDetail.email),
        addressError: !cartOrderDetail.address,
        contactNumberError: !cartOrderDetail.contactNumber,
        pinCodeError: !cartOrderDetail.pinCode,
        CityDistrictTownError: !cartOrderDetail.CityDistrictTown,
        StateError: !cartOrderDetail.State,
      });
    } else {
      dispatch(suucessOrderData({
        ...cartOrderDetail,
      }))
      navigate('/successOrder');
      setcartOrder(defaultFormData);
    }
  }

  return (
    <div className='col-lg-8 cartPlace-container' >
      <div className="col-lg-6">
        <div className='delivery-add mt-2 mb-2'>Delivery Address</div>
        <div className="form-group">
          <label className="mb-1 mt-3">Name<span className="text-danger"> *</span></label>
          <input type="text" placeholder="Enter Name" name='name' className="form-control" onChange={handleChangeOrder} />
          {cartError?.nameError && (
            <div style={{ color: "red" }}>
              Please provide name.
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">Email<span className="text-danger"> *</span></label>
          <input type="email" placeholder="Enter Email" name='email' className="form-control" onChange={handleChangeOrder} />
          {cartError?.emailError && (
            <div style={{ color: "red" }}>
              Please provide email.
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">Address<span className="text-danger"> *</span></label>
          <input type="text" placeholder="Enter Address" name='address' className="form-control" onChange={handleChangeOrder} />
          {cartError?.addressError && (
            <div style={{ color: "red" }}>
              Please provide address.
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">Contact Number<span className="text-danger"> *</span></label>
          <input type="number" placeholder="Enter Contact Number" name='contactNumber' className="form-control" onChange={handleChangeOrder} />
          {cartError?.contactNumberError && (
            <div style={{ color: "red" }}>
              Please provide Contact Number.
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">Pin Code<span className="text-danger"> *</span></label>
          <input type="number" placeholder="Enter Pin code number" name='pinCode' className="form-control" onChange={handleChangeOrder} />
          {cartError?.pinCodeError && (
            <div style={{ color: "red" }}>
              Please provide PinCode.
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">City/District/Town<span className="text-danger"> *</span></label>
          <input type="text" placeholder="Enter City/District/Town" name='CityDistrictTown' className="form-control" onChange={handleChangeOrder} />
          {cartError?.CityDistrictTownError && (
            <div style={{ color: "red" }}>
              Please provide City/District/Town.
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">State<span className="text-danger"> *</span></label>
          <input type="text" placeholder="Enter State" name='State' className="form-control" onChange={handleChangeOrder} />
          {cartError?.StateError && (
            <div style={{ color: "red" }}>
              Please provide State.
            </div>
          )}
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">Landmark(Optional)</label>
          <input type="text" placeholder="Enter Landmark(Optional)" name='landmarkOptional' className="form-control" onChange={handleChangeOrder} />
        </div>
        <div className="form-group">
          <label className="mb-1 mt-3">Alternate Phone(Optional)</label>
          <input type="number" placeholder="Enter alternate Phone" name='alternatePhone' className="form-control" onChange={handleChangeOrder} />
        </div>
        <p className="mb-0 mt-3 my-3">
          <Button className="btn btn-primary btn-lg w-10 text-uppercase modal-button" onClick={() => deliverProduct(cartOrder)} >SAVE AND DELIVER HERE</Button>
        </p>
      </div>
      <div className='box-detail'>
        <div className='box-shadow'>
          <div>
            <span className='price-detail'>Price details</span>
            <div>
              <span>Total item: ({totalQuantity})</span>
            </div>
            <div className='total-amount'>Total amount: ${cartsDetail.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPlaceOrder;