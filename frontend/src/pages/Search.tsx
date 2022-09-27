import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { NavLink, useParams } from 'react-router-dom';
import { ProductType } from '../types/ProductType';

type Props = {}

const Search = (props: Props) => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        getProducts()
    },[])
    const {key} = useParams()
    const getProducts = async () => {
        const {data} = await axios.get("https://commerse-production.up.railway.app/searchproducts/"+key);
        setProducts(data)        
        setLoading(true)
    }
  return (
    <div>
      
     
        {loading ?  <section className="new__products">
        <div className="container">
          <div className="products dp-grid">
            {products.length > 0 ?   products.map((item) => {
              return (
                <div className="product" data-aos="fade-down">
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
              )
            }) : <h1>Không tìm thấy sản phẩm</h1>}
          </div>
        </div>
      </section> : <h1>Loading ...</h1>}
    </div>
  )
}
export default Search