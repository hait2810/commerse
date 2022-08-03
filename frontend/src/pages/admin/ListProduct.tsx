import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
type Props = {}

const ListProduct = (props: Props) => {
    const [products, setProducts] = useState<any[]>([])
    document.title = "Danh sách sản phẩm"
    useEffect (() => {
        const getProducts = async () => {
            const {data} = await axios.get("https://projectecommerse.herokuapp.com/products")
            setProducts(data)
        }
        getProducts()
    })
const onDelete = async (id:any) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá không?")
        if(confirm) {
          await  axios.delete("https://projectecommerse.herokuapp.com/products/"+id)
          setProducts(products.filter(item => item._id !== id))
          toastr.success("Xoá thành công !")
        }else{
            toastr.success("Xoá không thành công !")
        }  
}
  return (
    <div>
        <div className="container">
  <h2>Danh sách sản phẩm</h2>
    <NavLink className="btn btn-info" to={`add`}>Thêm sản phẩm</NavLink>          
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Img</th>
        <th>Price</th>
        <th>Discount (%)</th>
        <th>Sửa</th>
        <th>Xoá</th>
      </tr>
    </thead>
    <tbody>
    {products?.map((item,index) => {
                return  <tr>
                <td>{index +1 }</td>
                <td>{item.name}</td>
                <td><img src={item.img} width="50px" alt="" /></td>
                <td>{item.price}</td>
                <td>{item.discount > 0 ? item.discount  : '0'}</td>
                <td><NavLink className="btn btn-success" to={`${item._id}/edit`}>Sửa</NavLink></td>
                <td><button type='submit' onClick={() => onDelete(item._id)} className='btn btn-warning'>Xoá</button></td>
              </tr>
            })}
     
      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default ListProduct