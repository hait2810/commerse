import React, { useEffect } from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {useNavigate, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type Props = {}

const EditCategory = (props: Props) => {
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
        const getCategory = async () => {
            const {data} = await axios.get("https://projectecommerse.herokuapp.com/categorys/"+id);
            reset(data)
        }
        getCategory()
    }, [])
    const onEdit = async (data:any) => {
            await axios.put("https://projectecommerse.herokuapp.com/categorys/"+id, data);
            toastr.success("Sửa thành công");
            navigate('/admin/categorys')
    }
  return (
    <div>
        <h1>Sửa danh mục</h1>
    <form onSubmit={handleSubmit(onEdit)}>

    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
  <input type="text" className="form-control" {...register("name")} id="exampleFormControlInput1" placeholder="Áo polo" />
</div>
<div className="mb-3">
    <button type='submit' className='btn btn-info'>Sửa danh mục</button>
</div>
    </form>

    </div>
  )
}


export default EditCategory