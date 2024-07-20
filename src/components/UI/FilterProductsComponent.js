import { Slider } from '@mui/material';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilterProducts, setFilterProducts, setMaxPrice, setMinPrice } from '../../redux/actionCreators/productActions';
import './filterProductsComponent.css'

const FilterProductsComponent = (props) => {
  const dispatch = useDispatch();
  const { rangePrice, categoryFilter, ratingStar } = useSelector((state) => state.allproducts.filterData);
  const { products } = useSelector((state) => state.allproducts);
  const { onhandleCheck, onRatingStar, filterProductsLength } = props;

  const clearFilter = () => {
    const getClearFilter = JSON.parse(localStorage.getItem('setRangePrice'));
    if (getClearFilter) {
      dispatch(clearFilterProducts(getClearFilter));
    }
  }

  const catName = products.map((obj) => obj.category)
  let cateObj = [...new Set(catName)];

  return (
    <>
      <section>
        <div className="filter-contain">
          <div className="filter-body">filter ({`${filterProductsLength} Items`})</div>
        </div>
        <div className='filter-priceRange mt-3'>
          <div>
            <div className="filter-price">Price Range</div>
          </div>
          <div >
            <button className="filter-clear" onClick={clearFilter}>Clear</button>
          </div>
        </div>
        <div>
          <Slider
            value={rangePrice}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            onChange={(e) => dispatch(setFilterProducts(e.target.value))}
            min={0}
            max={1000}
            style={{ width: '90%', left: '12px' }}
          />
        </div>
        <div className='price-range-input'>
          <input type='number' style={{ width: '100px' }} value={rangePrice[0]} onChange={(e) => dispatch(setMinPrice(e.target.value))}></input>
          <input type='number' style={{ width: '100px' }} value={rangePrice[1]} onChange={(e) => dispatch(setMaxPrice(e.target.value))}></input>
        </div>
        <span>price {rangePrice[0]} to between {rangePrice[1]}</span>
      </section>
      <hr />
      <section>
        <div
          className='filter-category mb-2'>Category</div>
        <div>
          <Form.Control
            as="select"
            onChange={(event) => onhandleCheck(event.target.value)}
            value={categoryFilter}
            name='category'
          >
            <option>Select category</option>
            {cateObj.map((i, key) => {
              return (
                <option value={i} key={key}>
                  {i}
                </option>
              );
            })}
          </Form.Control>
        </div>
      </section>
      <hr />
      <section>
        <div>
          <div className='rating-filter'>Customer Ratings</div>
          <div className='RatingProduct'>
            <div>
              <input type='checkbox' value={4} onChange={onRatingStar} checked={ratingStar === '4'} /> 4
              <span className="bi bi-star-fill rating-style"> & above</span>
            </div>
            <div>
              <input type='checkbox' value={3} onChange={onRatingStar} checked={ratingStar === '3'} /> 3
              <span className="bi bi-star-fill rating-style"> & above</span>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </>
  );
}

export default FilterProductsComponent;