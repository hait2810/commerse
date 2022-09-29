import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { ListCarts, RemoveCart } from '../../features/Cart/Cart.slice';
import { CartType } from '../../types/CartType';
type Props = {}

const ListCart = (props: Props) => {
  const dispatch = useDispatch<any>()
  const carts = useSelector((state: CartType) => state.cart.carts)
// console.log("carts", carts);
  
    useEffect(() => {
        dispatch(ListCarts())
    }, [])
    const onRemove = async (id: string) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá")
        if(confirm) {
            dispatch(RemoveCart(id))
             
            toastr.success("Xoá thành công")
        }
    }
  return (
    <div>
          <div>
        <div className="container">
  <h2>Danh sách giỏ hàng</h2>
        
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Total Money</th>
        <th>Status</th>
        <th>Detail / Update Status</th>
        <th>Remove</th>     
      </tr>
    </thead>
    <tbody>
    {carts?.map((item: CartType,index: number) => {
                return  <tr key={index + 1}>
                <td>{index +1 }</td>
                <td><NumberFormat value={item.totalprice} displayType={'text'} thousandSeparator={true} prefix={''} />₫</td>
                <td>{item.status == 1 ? 'Đã gửi' : 'Đang xử lý'}</td>
                <td><NavLink className="btn btn-success" to={`${item._id}/detail`}>Click</NavLink></td>
                <td><button onClick={() => onRemove(item._id!)} className='btn btn-info'>Remove</button></td>
                
              
              </tr>
            })}
     
      
    </tbody>

  </table>
</div>
    </div>
    </div>
  )
}

export default ListCart