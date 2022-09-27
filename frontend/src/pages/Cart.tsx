import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../assets/css/cart.css'
import toastr from 'toastr'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'toastr/build/toastr.min.css'
import NumberFormat from 'react-number-format'
import axios from 'axios'
import { ProductType } from '../types/ProductType'
type Props = {}

const Cart = (props: Props) => {
    
    const [carts, setCarts] = useState<any[]>([])
    const {register, handleSubmit, formState: {errors}} = useForm()
    const navigate = useNavigate()
    let sum = 0;
    const getCart = () => {
        setCarts(JSON.parse(localStorage.getItem("cart") as any)) 
      }
    useEffect(() => {
        getCart()
    }, [])
    
    const onDeleteProduct =  (size:any, color:any, id:any) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá không?");
        if(confirm) {
            const cartsa = carts.find(item => item._id == id && item.color == color && item.size == size)
            const cartsb = carts.filter(item => item !== cartsa)
            localStorage.setItem("cart", JSON.stringify(cartsb))
            getCart()
           
            toastr.success("Xoá thành công")   
        }
    }
    const Decrement =  (size:any, color:any, id:any) => {   
            const cartsa = carts.find(item => item._id == id && item.color == color && item.size == size)
            cartsa.quantity--
            if(cartsa.quantity < 1) {
                const confirm = window.confirm("Bạn có muốn xoá không");
                if(confirm) {
                    const cartsb = carts.filter(item => item !== cartsa) 
                    localStorage.setItem("cart", JSON.stringify(cartsb))
                    toastr.success("Xoá thành công")   
                    return getCart()
                }else {
                  return getCart()
                }
            }
            localStorage.setItem("cart", JSON.stringify(carts))
            getCart()
           
              
    }
    const Increment =  (size:any, color:any, id:any) => {   
        const cartsa = carts.find(item => item._id == id && item.color == color && item.size == size)
        cartsa.quantity++
        localStorage.setItem("cart", JSON.stringify(carts))
        getCart()
}
 
const onAddCart = async (data:any) => {
  const cartss = {
    product: carts,
    infomation: data,
    totalprice: sum
 }
  try {
      const {data} = await axios.post("http://localhost:8000/carts", cartss);
      console.log(data);
      toastr.success("Đơn hàng đã được gửi")
      localStorage.removeItem("cart");
      navigate('/')
      
  } catch (error) {
    console.log(error);
    
  }
  
  
}
    
  return (
    <div>
        <div className="wrapper__heading">
          <div className="container">
              <ul className="heading dp-flex">
                  <li><NavLink className="remove__underline" to="/">Trang chủ</NavLink></li>
                 
                  <li><a className="remove__underline prioritized" href="#">Giỏ hàng</a></li>
                  
                </ul>
          </div>
        </div>
        <div className="container">
            <div className="main__title">
                <h2 className="title">
                  Giỏ hàng của bạn
                </h2>
                <span className="count_cart">
                      Có {JSON.parse(localStorage.getItem("cart") as any) ? JSON.parse(localStorage.getItem("cart") as any).length : '0' } sản phẩm trong giỏ hàng
                </span>
            </div>
        </div>
        <div className="main_cart">
          <div className="container">
            <div className="cart">
              <table border={0}>
                <thead>
                    <tr>
                      <th>Img</th>
                      <th>Thông tin sản phẩm</th>
                      <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {carts ? carts.map((item) => {
                        {sum += item.price * item.quantity}
                        return  <tr>
                        <td><img src={item.img} alt="" /></td>
                        <td>
                          <a href="">{item.name}</a>
                          <p className="price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={''} />₫</p>
                        
                          <div className='dp-flex align-items'>
                          <p className="size_color ">{item.size}/</p>
                          <img className='img_colorz' src={item.color} alt="" />
                          </div>
                          <div className="quantity dp-flex">
                            <input type="submit" onClick={() => Decrement(item.size, item.color, item._id)}  value="-" className="up_and_down" name="" id="" />
                            <input type="text" className="show_quantity"  value={item.quantity} name="" id="" />
                            <input type="submit" onClick={() => Increment(item.size, item.color, item._id)} value="+" className="up_and_down" name="" id="" />
                          </div>
                        </td>
                        <td>
                          <button type="submit" onClick={() => onDeleteProduct(item.size, item.color, item._id)} className="btn_remove"><img src="https://theme.hstatic.net/1000340796/1000856039/14/ic_close.png?v=4" alt="" /></button>
                          <div className="space"></div>
                          
                          <p className="total_price"> <NumberFormat value={item.quantity * item.price} displayType={'text'} thousandSeparator={true} prefix={''} /> ₫</p>
                        
                        </td>
                      </tr>
                    }): <h1>Không có sản phẩm nào</h1>}
                </tbody>
              </table>
              <form onSubmit={handleSubmit(onAddCart)}>
                    {carts ?  <div className="consignee_infomation dp-flex align-items">
                      
                      <div className="infomation">
                        <h1>Thông tin giao hàng</h1>
                        <input type="text" {...register('fullname', {required:true})} placeholder="Họ và tên" />
                        {errors.fullname && <span>Trường này không được để trống</span>}
                        <input type="text" {...register('phonenumber', {required:true})} placeholder="Số điện thoại" />
                        {errors.phonenumber && <span>Trường này không được để trống</span>}
                        <input type="text" {...register('email', {required:true})} placeholder="Email" />
                        {errors.email && <span>Trường này không được để trống</span>}
                        <input type="text" {...register('address', {required:true})} placeholder="Địa chỉ nhận hàng" />
                        {errors.address && <span>Trường này không được để trống</span>}
                        <textarea {...register('note')} placeholder="Ghi chú"  cols={30} rows={5}></textarea>
                      </div>
                     <div className="total">
                      <p>Phí vận chuyển: 30,000₫</p>
                      <p>Tiền hàng : <NumberFormat value={sum} displayType={'text'} thousandSeparator={true} prefix={''} />₫</p>
                      <h1>Tổng tiền:  <NumberFormat value={sum+30000} displayType={'text'} thousandSeparator={true} prefix={''} />₫</h1>
                      <button type="submit" className="btn_order">Thanh toán</button>
                     </div>
                   
              </div> : ""}
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart