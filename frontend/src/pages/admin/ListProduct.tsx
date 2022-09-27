import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { deleteProduct, listProduct } from '../../features/Products/Product.slice'
import { ProductType } from '../../types/ProductType'
type Props = {}

const ListProduct = (props: Props) => {
   // const [products, setProducts] = useState<any[]>([])
   
    const products = useSelector((state: ProductType) => state.product.products);
    const dispatch = useDispatch<any>()
    console.log("products", products);
    
    document.title = "Danh sách sản phẩm"
    useEffect (() => {
     
              
                 dispatch(listProduct());
              
        
        // const getProducts = async () => {
        //     const {data} = await axios.get("https://commerse-production.up.railway.app/products")
        //     setProducts(data)
        // }
        // getProducts()
    }, [dispatch])
const onDelete = async (id:string) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá không?")
        if(confirm) {
           dispatch(deleteProduct(id))
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
    {products?.map((item: ProductType,index: number) => {
                return  <tr key={index ++}>
                <td>{index +1 }</td>
                <td>{item.name}</td>
                <td><img src={item.img} width="50px" alt="" /></td>
                <td>{item.price}</td>
                <td>{item.discount > 0 ? item.discount  : '0'}</td>
                <td><NavLink className="btn btn-success" to={`${item._id}/edit`}>Sửa</NavLink></td>
                <td><button type='submit' onClick={() => onDelete(item._id!)} className='btn btn-warning'>Xoá</button></td>
              </tr>
            })}
     
      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default ListProduct