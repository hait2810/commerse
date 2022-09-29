import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import {NavLink} from 'react-router-dom'
import { ProductType } from '../types/ProductType';
type Props = {}

const Home = (props: Props) => {
    
    const [products, setProducts] =  useState<ProductType[]>([])
    const [loading, setLoading] = useState(false)
    document.title = "Home page"
    useEffect(() => {
        const getProducts = async () => {
            const {data} = await axios.get("https://commerse.onrender.com/products/8");
            setProducts(data)
            setLoading(true)
        }
        getProducts()
    },[])
  return (
  
    <div>
        
        <section className="new__products">
      <div className="container">
        <h2 className="title">sản phẩm mới nhất</h2>
        {loading ? '' : <h1> Loading ... </h1>}
        <div className="products dp-grid">
         {products?.map((item, index) => {
            return  <div key={index ++} className="product">
            <NavLink to={`product/${item._id}`} 
              ><img
                src={item.img}
                alt=""
                className="product__img"
            /></NavLink>
            {item.discount ? <span className="promotion"> -{item.discount}% </span> : ''}
            <h3 className="product__name">
              <NavLink className="remove__underline" to={`product/${item._id}`}>{item.name}</NavLink>
            </h3>
            <div className="product__price">
              <span className="new__price">  <NumberFormat value={item.price - (item.price*item.discount/100)} displayType={'text'} thousandSeparator={true} prefix={''} />₫</span>
            
              {item.discount ?  <del className="old__price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={''} />₫</del> : ''}
            </div>
          </div>
         })}
        </div>
      </div> 
    </section>
    </div>
  )
}

export default Home