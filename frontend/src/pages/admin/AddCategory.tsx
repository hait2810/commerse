import React from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type Props = {}

const AddCategory = (props: Props) => {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const onAdd = async (data:any) => {
            await axios.post("https://commerse-production.up.railway.app/categorys/",data)
            toastr.success("Thêm thành công");
            navigate('/admin/categorys')
    }
  return (
    <div>
        <h1>Thêm danh mục</h1>
    <form onSubmit={handleSubmit(onAdd)}>

    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
  <input type="text" className="form-control" {...register("name")} id="exampleFormControlInput1" placeholder="Áo polo" />
</div>
<div className="mb-3">
    <button type='submit' className='btn btn-info'>Thêm danh mục</button>
</div>
    </form>

    </div>
  )
}


export default AddCategory