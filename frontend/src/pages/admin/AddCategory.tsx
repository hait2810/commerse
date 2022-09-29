import React from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {useNavigate} from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { CategoryType } from '../../types/CategoryType'
import { addCategory } from '../../features/Categorys/Category.slice'

type Props = {}

const AddCategory = (props: Props) => {
   type FormInputs = {
      name: string
   }
    const {register, handleSubmit} = useForm<FormInputs>()
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const onAdd:SubmitHandler<CategoryType> = async (category:  CategoryType) => {
           try {
            const res = await dispatch(addCategory(category))  
            if(res.payload.message) {
                toastr.info(res.payload.message)
            }else {
              toastr.success("Thêm thành công");
              navigate('/admin/categorys')
            }
           
           } catch (error) {
              console.log(error);
              
           }
    }
  return (
    <div>
        <h1>Thêm danh mục</h1>
    <form onSubmit={handleSubmit(onAdd as any)}>

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