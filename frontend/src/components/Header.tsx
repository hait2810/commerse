import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom'
import { readCart } from '../features/Cart/Cart.slice'
type Props = {}



const Header = (props: Props) => {
  const {register, handleSubmit} = useForm()
  const [category,setCategory] = useState<any[]>([])
  const navigate = useNavigate()
 
  const carts = useSelector((state: any) => state.cart.carts)
  const dispatch = useDispatch<any>();  
  useEffect(() => {
    const getCategory = async () => {
      const {data} = await axios.get("https://projectecommerse.herokuapp.com/categorys");
      setCategory(data)
    }
    getCategory()
    dispatch(readCart())
  }, [])
  const onSearch = (data:any) => {
      navigate(`search/${data.key}`)
      location.reload();
  } 
  return (
    <div>
  
          <header>
      <div className="wrapper__header-top">
        <div className="container">
          <div className="header-top dp-flex space-beetwen align-items">
            <div className="wrapper__logo">
              <NavLink to="/" className="logo remove__underline">NVH SYSTEM</NavLink>
            </div>
            <nav className="main-nav">
              <ul className="nav dp-flex align-items">
                <li>
                  <div className="main__menu__icon">
                    <img
                      src="https://hait2810.github.io/assets/assets/img/z2102104621662_88543e640b80ff05783b34bca39c677b_7781cfdba5d44c0994be36c183635002.webp"
                      alt=""
                    />
                  </div>
                  <NavLink className="text-center dp-block remove__underline" to="allproduct"
                    >Tất cả sản phẩm</NavLink
                  >
                </li>
                <li><a className="btn_nav remove__underline dp-flex align-items" href="">Danh mục sản phẩm  <img className="icon__arrow" src="https://hait2810.github.io/assets/assets/img/arrow-down-outline.svg" alt="" /></a>
                  <ul className="subnav">
                    {category?.map((item, index) => {
                      return  <li key={index ++}><a className="remove__underline" href={`/categorys/${item._id}`}>{item.name}</a></li>
                    })}
                    
                  </ul>
                </li>
                <li><NavLink className="remove__underline dp-flex align-items" to='discount'>sale upto 70%</NavLink></li>
                <li><a className="remove__underline dp-flex align-items" href="">bảng size</a></li>
                <li><a className="remove__underline dp-flex align-items" href="">giới thiệu</a></li>
                <li><a className="remove__underline dp-flex align-items" href="">liên hệ</a></li>
              </ul>
            </nav>
            <div className="header-right dp-flex">
              <NavLink to="/signin" className="user"
                ><img src="https://hait2810.github.io/assets/assets/img/person-circle-outline.svg" alt=""
              /></NavLink>
              <button type='submit' className="search"
                ><img src="https://hait2810.github.io/assets/assets/img/search-circle-outline.svg" alt=""
              /></button>

              <NavLink to="/carts" className="cart">
                <img src="https://hait2810.github.io/assets/assets/img/bag-outline.svg" alt="" />
                <span className="count"> {carts ? carts.length : '0' } </span> 
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div className="modal_search">
      <div className="container">
        <div className="modal_search_content">
          <div className="title dp-flex space-beetwen">
            <h5>TÌM KIẾM</h5>
            <a href="#" className="close"
              ><img
                className="logo_close"
                src="https://hait2810.github.io/assets/assets/img/close-outline.svg"
                alt=""
            /></a>
          </div>
          <form onSubmit={handleSubmit(onSearch)} className="dp-flex align-items">
            <input
              type="text"
              {...register('key')}
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button type="submit">
              <img
                className="icon_search"
                src="https://cdn-icons-png.flaticon.com/512/122/122932.png"
                alt=""
              />
            </button>
          </form>
        </div>
      </div>
    </div>
    
    </div>
  
  )
}
export default Header