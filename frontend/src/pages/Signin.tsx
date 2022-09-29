import axios from 'axios'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useNavigate } from 'react-router-dom'
import '../assets/css/account.css'
import { useDispatch } from 'react-redux'
import { Login } from '../features/User/User.slice'
type Props = {}

const Signin = (props: Props) => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<any>()
    const dispatch = useDispatch<any>()
    document.title = "Signin"
    const onSignin: SubmitHandler<any> = async (user:any) => {
        try {
            const {payload} = await dispatch(Login(user))
            
            if(payload.message) {
                toastr.info(payload.message)
            }else{
                toastr.success("Đăng nhập thành công")
            }
        } catch (error) {
           toastr.warning("Sai thông tin đăng nhập") 
        }
        
        
    }
  return (
    <div>
            {localStorage.getItem("user") as any ? <div className='container'> <NavLink to='/'>Bạn đã đăng nhập! Bấm vào đây để lại trang chủ</NavLink> </div> : <section className="account__page">
        <div className="container">
                <div className="content dp-grid">
                   <div className="heading">
                    <h1 className="title">Đăng nhập</h1>
                   </div>
                    <div className="form__account">
                        <form onSubmit={handleSubmit(onSignin)} className="dp-flex">
                            <input type="text" {...register('email', {required:true})}  placeholder="Email" />
                            {errors.email && <span>Email không được bỏ trống !</span>}
                            <input type="password" {...register('password', {required:true})}   placeholder="Password" />
                            {errors.password && <span>Password không được bỏ trống !</span>}
                            <div className="wrapper_button dp-flex">
                                <button type="submit">Đăng nhập</button>
                                <div className="forgot_password">
                                    <span>Bạn chưa có tài khoản?</span>
                                    <NavLink className="remove__underline" to="/signup">Đăng ký</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
        </section> }
    </div>
  )
}

export default Signin