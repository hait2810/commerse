import React, { useEffect, useState } from 'react'
import '../assets/css/detail.css'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {useParams} from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'
import {NavLink} from 'react-router-dom'
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux'
import { readProduct } from '../features/Products/Product.slice'
import { addCart } from '../features/Cart/Cart.slice'
type Props = {}

const DetailProduct = (props: Props) => {
    const {id} = useParams()
    const [product, setProduct] = useState<any>({})
    const [color, setColor] = useState<any>("")
    const [size, setSize] = useState<any>("")
    document.title  = product.name
    const [quantity, setQuantity] = useState(1)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<any>()
  
    
    useEffect(() => {
        const getProducts = async () => {
            
            
            const {payload} = await dispatch(readProduct(id!))
            setProduct(payload)
            setLoading(true)
            
           
              const script = document.createElement("script");
          
              script.src = "https://hait2810.github.io/assets/assets/js/main.js";
          
          
              document.body.appendChild(script);
           
        }
        getProducts()

    }, [])

    const productcart = {
      _id: product._id,
      name: product.name,
      price: product.price - ((product.discount / 100) * product.price),
      quantity,
      color,
      size,
      img: product.img
    }
    
      
    const onCart:SubmitHandler<any> = () => {
     
      
        dispatch(addCart(productcart))
         toastr.success("Thêm vào giỏ hàng thành công!")  
    }
    const Decrement  = () => {
      if(quantity > 1) {
        setQuantity(quantity-1)
      }else {
        toastr.success("Số lượng sản phẩm phải lớn hơn 0")
      }
    }
    const Increment  = () => {
      setQuantity(quantity+1)
    }
   
  return (
    <main>
         <div className="wrapper__heading">
            <div className="container">
                <ul className="heading dp-flex">
                   
                    <li><NavLink className="remove__underline" to="/">Trang chủ </NavLink></li>
                    <li><NavLink className="remove__underline" to="#">Sản phẩm</NavLink></li>
                    <li><NavLink className="remove__underline prioritized" to={`/product/${product._id}`}>{product.name}</NavLink></li>                    
                  </ul>
            </div>
          </div>
          <div className="container">
          {loading ? '' : <h1>Loading ...</h1>}
          </div>
          <div className="detail__product">
              <div className="container">
                <div className="content dp-grid">
                    <div className="logo">
                          <div>
                            <img className="main__logo" src={product.img} alt="" />
                          </div>
                          <div className="secondary__logo dp-flex align-items">
                            <img className="btn__logo active" src={product.img} alt="" />
                            {product.subimg?.map((item:any) => {
                                return  <img className="btn__logo" src={item} alt="" />
                            })}
                          </div>
                    </div>
                    <div className="infomation">
                            <div className="name__code general_class">
                                  <h1 className="name">{product.name}</h1>
                                  <span className="code">SKU: KIST81DL</span>
                            </div>
                            <div className="price general_class">
                                {product.discount ? <span className='discount'>-{product.discount}%</span>  : ''}
                                <span className="new_price">
                                <NumberFormat value={product.price - (product.price*product.discount/100)} displayType={'text'} thousandSeparator={true} prefix={''} />₫
                                </span>
                                {product.discount ?  <del className="old_price">
                                <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} />₫
                                </del> : ''}
                               
                            </div>
                            <form onSubmit={handleSubmit(onCart)}>
                            <div className="size general_class">
                              <h5 className="title" >Kích thước:</h5>
                               {product.size?.map((item:any) => {
                                return  <label className="btn_size"  htmlFor={item}><input type="radio" onChange={e=>setSize(e.target.value)}   value={item} name="size"   id={item} />{item}</label>
                                
                               })}
                            </div>
                            <div className="color general_class">
                              <h5 className="title">MÀU:</h5>
                             
                              <div className="wrapper_color dp-flex">
                               {product.color?.map((item:any) => {
                                return <label className="btn_color"  id='btn_color' htmlFor={item}><input name='color' type="radio" value={item} onChange={e=>setColor(e.target.value)}  /><img src={item}  /></label>
                               })}
                              </div>
                         
                            </div>
                            <div className="quantity dp-flex general_class">
                               <input className="change_quantity minus" type="submit" onClick={handleSubmit(Decrement)} value="-" name="" id="" />
                               <input className="show_quantity" type="text"  {...register('quantity')} value={quantity} id="" />
                               <input className="change_quantity add" type="submit" onClick={handleSubmit(Increment)}  value="+" id="" />
                            </div>
                           
                            <div className="order">
                              <button type='submit' className="btn btn-order">Thêm vào giỏ hàng</button>
                            </div>
                          </form>
                          <div className="description">
                              <h1 className="title">Mô tả:</h1>
                              <div dangerouslySetInnerHTML={{__html: product.desc}} />


                          </div>
                          <img src="https://file.hstatic.net/1000340796/file/aace4a18db751a2b4364_957e6602cfab4ba8a5e88c9969a4e9e4_grande.jpg" alt="" className="size__chart" />
                    </div>
                </div>
              </div>
          </div>
    </main>
    
  )
}
export default DetailProduct