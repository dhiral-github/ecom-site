import React, { useEffect } from 'react';
import { Col, Row, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toastProduct } from "../../redux/actionCreators/productActions"
const DismissibleToasts = () => {
  const dispatch = useDispatch();

  const { toastDetails } = useSelector((state) => state.allproducts);

  useEffect(() => {
    if (toastDetails.showToast) {
      setTimeout(() => {
        dispatch(toastProduct({
          showToast: false,
          type: '',
          message: '',
        }))
      }, 3000);
    }
  }, [dispatch, toastDetails])
  return (
    <Row
      style={{ position: 'fixed', right: 0, top: '90px', zIndex: 999, color: 'white' }}
    >
      <Col >
        <Toast show={toastDetails.showToast} bg={toastDetails.type}>

          <Toast.Body>{toastDetails.message}</Toast.Body>
        </Toast>
      </Col>

    </Row>
  );
}

export default DismissibleToasts;