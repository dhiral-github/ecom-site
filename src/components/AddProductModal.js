import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  showproductModal,
  addnewProduct,
  updateProduct,
  selectedProduct,
} from "../redux/actionCreators/productActions";
import { useDispatch } from "react-redux";

const AddProductModal = () => {
  const dispatch = useDispatch();
  const defaultFormData = {
    id: "",
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  };

  const [formData, setformData] = useState(defaultFormData);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(true);
  const { showProductModal } = useSelector((state) => state.allproducts);
  const EditProduct = useSelector((state) => state.allproducts.selectedProduct);

  const handleClose = () => {
    dispatch(showproductModal(false));
    dispatch(selectedProduct({}));
    setError({});
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]:
        e.target.name === "image"
          ? URL.createObjectURL(e.target.files[0])
          : e.target.value,
    });
  };

  const handleSave = (productUpdate) => {
    const formDataFileUpload = new FormData();
    formDataFileUpload.append("file", formData);
    if (
      !Object.keys(productUpdate).length ||
      !productUpdate.title ||
      !productUpdate.category ||
      !productUpdate.description ||
      !productUpdate.price
    ) {
      setError({
        titleError: !productUpdate.title,
        categoryError: !productUpdate.category,
        descriptionError: !productUpdate.description,
        priceError: !productUpdate.price,
      });
    } else {
      if (Object.keys(EditProduct).length > 0) {
        dispatch(updateProduct(productUpdate));
        handleClose();
        setToast(!toast);
        setError({});
        setformData(defaultFormData);
      } else {
        dispatch(
          addnewProduct({
            id: new Date().getTime(),
            ...productUpdate,
          })
        );
        setformData(defaultFormData);
        handleClose();
        dispatch(selectedProduct({}));
        setToast(!toast);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(EditProduct).length > 0) {
      setformData(EditProduct);
    } else {
      setformData(defaultFormData);
    }
  }, [EditProduct]);

  const pageTitle = EditProduct.id ? "Edit Product " : "Add Product";
  const buttonTitle = EditProduct.id ? "Update" : "Submit";

  return (
    <>
      <Modal show={showProductModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pageTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="mb-1">
              Title<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
            />
            {error?.titleError && (
              <div style={{ color: "red" }}>Please provide title.</div>
            )}
          </div>
          <div className="form-group">
            <label className="mb-1 mt-3">
              Category<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            {error?.categoryError && (
              <div style={{ color: "red" }}>Please provide category.</div>
            )}
          </div>
          <div className="form-group">
            <label className="mb-1 mt-3">
              Description<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter Description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
            {error?.descriptionError && (
              <div style={{ color: "red" }}>Please provide description.</div>
            )}
          </div>
          <div className="form-group">
            <label className="mb-1 mt-3">
              Price<span className="text-danger"> *</span>
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
            />
            {error?.priceError && (
              <div style={{ color: "red" }}>Please provide price.</div>
            )}
          </div>
          <div className="mb-4 mt-3" controlid="formBasicTitle">
            <span>Image </span>
            <input type="file" name="image" onChange={handleChange} />
          </div>
          <p className="text-center mb-0">
            <button
              className="btn btn-primary btn-lg w-10 text-uppercase modal-button"
              onClick={() => handleSave(formData)}
            >
              {buttonTitle}
            </button>
            <button
              className="btn btn-primary btn-lg w-10 text-uppercase modal-button mx-2"
              onClick={handleClose}
            >
              Close
            </button>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
