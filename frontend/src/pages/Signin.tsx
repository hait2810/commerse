import axios from 'axios'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { useNavigate } from 'react-router-dom'
import '../assets/css/account.css'
type Props = {}

const Signin = (props: Props) => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<any>()
    document.title = "Signin"
    const onSignin: SubmitHandler<any> = async (user:any) => {
        try {
            const {data} = await axios.post("https://projectecommerse.herokuapp.com/signin", user)
            localStorage.setItem("user", JSON.stringify(data))
            toastr.success("Đăng nhập thành công")
            navigate('/')
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