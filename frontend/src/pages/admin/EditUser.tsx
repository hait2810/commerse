import React, { useEffect, useState } from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ReadUser, UpdateUser } from '../../features/User/User.slice'


type Props = {}

const EditUser = (props: Props) => {
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()
    const {id} = useParams()
    const [email, setEmail] = useState("")
   const dispatch = useDispatch<any>()
  

   
    useEffect(() => {
       ( async () => {
        const {payload} = await dispatch(ReadUser(id!))
        reset(payload)
        setEmail(payload.email)
   
        
       }) ()
       
    }, [dispatch])

    const onEdit = async (data:any) => {
               dispatch(UpdateUser(data))
            toastr.success("Update success")
            navigate('/admin/users')
            
    }
  return (
    <div>
        <h1>Update User: {email}</h1>
    <form onSubmit={handleSubmit(onEdit)}>
    
    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
  <select {...register('role')} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
  <option value="1">Admin</option>
  <option value="0">Member</option>
</select>
</div>
<div className="mb-3">
    <button type='submit' className='btn btn-info'>Update User</button>
</div>
    </form>

    </div>
  )
}


export default EditUser