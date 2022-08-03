import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
type Props = {}

const ListCategory = (props: Props) => {
    const [categorys, setCategorys] = useState<any[]>([])
    document.title = "Danh sách danh mục"
    useEffect (() => {
        const getCateogrys = async () => {
            const {data} = await axios.get("https://projectecommerse.herokuapp.com/categorys")
            setCategorys(data)
        }
        getCateogrys()
    })
const onDelete = async (id:any) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá không?")
        if(confirm) {
          await  axios.delete("https://projectecommerse.herokuapp.com/categorys/"+id)
          setCategorys(categorys.filter(item => item._id !== id))
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
    {categorys?.map((item,index) => {
                return  <tr>
                <td>{index +1 }</td>
                <td>{item.name}</td>
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

export default ListCategory