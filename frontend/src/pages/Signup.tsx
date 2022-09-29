import axios from 'axios'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useNavigate } from 'react-router-dom'
import '../assets/css/account.css'
import { useDispatch } from 'react-redux'
import { Signup } from '../features/User/User.slice'
type Props = {}

const Signupa = (props: Props) => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<any>()
    const dispatch = useDispatch<any>()
    document.title = "Signin"
    const onSignin: SubmitHandler<any> = async (user:any) => {
        try {
            const data = await dispatch(Signup(user))
            //console.log(data);
            if(data.payload.message) { 
                toastr.info(data.payload.message)
            }else {
                toastr.success("Đăng ký thành công")
                navigate('/signin')
            }     
        } catch (error) {
           toastr.warning("Lỗi rồi") 
        }
        
        
    }
  return (
    <div>
            <section className="account__page">
        <div className="container">
                <div className="content dp-grid">
                   <div className="heading">
                    <h1 className="title">Đăng ký</h1>
                   </div>
                    <div className="form__account">
                        <form onSubmit={handleSubmit(onSignin)} className="dp-flex">
                        <input type="text" {...register('fullname', {required:true})}  placeholder="Full name" />
                            {errors.fullname && <span>Name không được bỏ trống !</span>}
                            <input type="text" {...register('email', {required:true})}  placeholder="Email" />
                            {errors.email && <span>Email không được bỏ trống !</span>}
                            <input type="password" {...register('password', {required:true})}   placeholder="Password" />
                            {errors.password && <span>Password không được bỏ trống !</span>}
                            <div className="wrapper_button dp-flex">
                                <button type="submit">Đăng ký</button>
                                <div className="forgot_password">
                                    <span>Bạn đã có tài khoản?</span>
                                    <NavLink className="remove__underline" to="/signin">Đăng nhập</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
        </section>
    </div>
  )
}

export default Signupa