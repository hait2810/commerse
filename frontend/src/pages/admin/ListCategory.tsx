import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { deleteCategory, listCategory } from '../../features/Categorys/Category.slice'
import { CategoryType } from '../../types/CategoryType'
type Props = {}

const ListCategory = (props: Props) => {
    const dispatch = useDispatch<any>()
    const categorys = useSelector((state: CategoryType) => state.category.categorys)  
    document.title = "Danh sách danh mục"
    useEffect (() => {
        dispatch(listCategory())
    }, [dispatch])
const onDelete =  (id:string) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá không?")
        if(confirm) {
            dispatch(deleteCategory(id))
          toastr.success("Xoá thành công !")
        }else{
            toastr.success("Xoá không thành công !")
        }  
}
  return (
    <div>
        <div className="container">
  <h2>Danh sách danh mục</h2>
    <NavLink className="btn btn-info" to={`add`}>Thêm danh mục</NavLink>          
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Sửa</th>
        <th>Xoá</th>
      </tr>
    </thead>
    <tbody>
    {categorys?.map((item: CategoryType,index: number) => {
                return  <tr key={index ++}>
                <td>{index +1 }</td>
                <td>{item.name}</td>
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

export default ListCategory