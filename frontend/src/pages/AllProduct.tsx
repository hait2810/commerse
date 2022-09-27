import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { listProduct } from '../features/Products/Product.slice';
import { ProductType } from '../types/ProductType';

type Props = {}

const AllProduct = (props: Props) => {
   
    const dispatch = useDispatch<any>()
    const products = useSelector((state: ProductType) => state.product.products)
  
    
    useEffect(() => {
          dispatch(listProduct())
    },[dispatch])
   
  return (
    <div>
      <div className="wrapper__heading">
        <div className="container">
          <ul className="heading dp-flex">
            <li>
              <NavLink className="remove__underline" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <a className="remove__underline" href="#">
                Danh mục
              </a>
            </li>
            <li>
              <a className="remove__underline prioritized" href="#">
                Tất cả sản phẩm
              </a>
            </li>
          </ul>
        </div>
      </div>
     
      <section className="new__products">
        <div className="container">
          <div className="products dp-grid">
            {products?.map((item: ProductType, index: number) => {
              return (
                <div key={index ++} className="product" data-aos="fade-down">
                  <NavLink to={`/product/${item._id}`}>
                    <img src={item.img} alt="" className="product__img" />
                  </NavLink>
                  {item.discount ? (
                    <span className="promotion"> -{item.discount}% </span>
                  ) : (
                    ""
                  )}
                  <h3 className="product__name">
                    <NavLink
                      className="remove__underline"
                      to={`/product/${item._id}`}
                    >
                      {item.name}
                    </NavLink>
                  </h3>
                  <div className="product__price">
                    <span className="new__price">
                      {" "}
                      <NumberFormat
                        value={item.price - (item.price * item.discount) / 100}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                      ₫
                    </span>

                    {item.discount ? (
                      <del className="old__price">
                        <NumberFormat
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={""}
                        />
                        ₫
                      </del>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
export default AllProduct