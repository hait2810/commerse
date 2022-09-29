import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {useForm, SubmitHandler} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { listUser } from '../../features/User/User.slice'
import { UserType } from '../../types/UserType'
type Props = {}

const ListUser = (props: Props) => {

    const dispatch = useDispatch<any>()
    const users = useSelector((state: UserType) => state.user.users)

    
       
    useEffect(() => {
        dispatch(listUser())
    }, [dispatch])
   
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
    {users?.map((item:UserType,index: number) => {
                return  <tr key={index ++}>
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