import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {useForm, SubmitHandler} from 'react-hook-form'
import { NavLink } from 'react-router-dom'
type Props = {}

const ListUser = (props: Props) => {
    const {handleSubmit,register} = useForm()
    const [user,setUser] = useState<any[]>([])
    const getListUser = async () => {
        const {data} = await axios.get("https://commerse-production.up.railway.app/users");
        setUser(data)
    }
    useEffect(() => {
        getListUser()
    }, [])
    const onUpdate:SubmitHandler<any> = (data:any) => {
        console.log(data);
        
    }
  return (
    <div>
          <div className="container">
  <h2>Danh sách tài khoản</h2>      
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Full name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
    {user?.map((item,index) => {
                return  <tr>
                <td>{index +1 }</td>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>{item.role == 1 ? 'Admin' : "Member"}</td>
                <td><NavLink className="btn btn-success" to={`${item._id}/edit`}>Update</NavLink></td>
              </tr>
            })}
     
      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default ListUser