import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { NavLink, useParams } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
type Props = {}

const DetailCart = (props: Props) => {
    const {id} = useParams()
    const [cart, setCart] = useState<any>({});
    const [products,setProducts] = useState<any[]>([])
    const {register, handleSubmit, reset} = useForm()
    const getCart = async () => {
            const {data} = await axios.get(`https://commerse-production.up.railway.app/carts/${id}`)
            setCart(data)
            reset(data)
            setProducts(data.product)       
    }
    useEffect(() => {
        getCart()
    }, [])
    const onEdit = async (data:any) => {
            await axios.put(`https://commerse-production.up.railway.app/carts/${id}`,data)
            toastr.success("Update status success")
    }
  return (
    <div>
        <div className="container">
  <h2>Chi tiết đơn hàng</h2>
        
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>Size</th>
        <th>Color</th>
        <th>Quantity</th>
        <th>Money Total</th>
        <th>Link Product</th>
        

        
      </tr>
    </thead>
    <tbody>
        {products?.map((item, index  ) => {
            return <tr>
                <td>{index +1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.size}</td>
            <td><img src={item.img} width="50px" alt="" /></td>
            <td>{item.quantity}</td>
            <td><NumberFormat value={item.quantity * item.price} displayType={'text'} thousandSeparator={true} prefix={''} />₫</td>
            <td><NavLink to={`/product/${item._id}`}>Link Product</NavLink></td>
            </tr>
        })}
    </tbody>
    <tfoot>
    <h2>Thông tin người nhận</h2>
    <tr>
        <td>
            <h2>{cart.infomation?.fullname}</h2>
            <p>{cart.infomation?.phonenumber}</p>
            <p>{cart.infomation?.email}</p>
            <p>{cart.infomation?.address}</p>
        </td>
        <td>
            <form onSubmit={handleSubmit(onEdit)}>
                <h2>Update Status</h2>
            <select {...register('status')} className="form-select my-3" aria-label="Default select example">
  <option selected>Mở menu để chọn</option>
  <option value="1">Đã gửi</option>
  <option value="0">Đang xử lý</option>
 
</select>
<button className='btn btn-success'>Xác nhận</button>
            </form>
        </td>
        <td>
            <p>Phí ship : 30.000₫</p>
            <p>Tiền hàng: <NumberFormat value={cart.totalprice} displayType={'text'} thousandSeparator={true} prefix={''} />  ₫</p>
            <h2>Tổng tiền: <NumberFormat value={cart.totalprice+30000} displayType={'text'} thousandSeparator={true} prefix={''} />  ₫</h2>
        </td>
       
    </tr>
    </tfoot>
  </table>
</div>
    </div>
  )
}
export default DetailCart