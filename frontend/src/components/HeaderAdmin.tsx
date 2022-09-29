import React, { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
type HeaderAdminProps = {

}


const HeaderAdmin = (props:  HeaderAdminProps) => {
 
  return (
    <div>
     
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Home Page</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        
       
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Products
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            
            <li><NavLink className="dropdown-item" to="/admin/products/add">Thêm sản phẩm</NavLink></li>
            <li><NavLink className="dropdown-item" to="/admin/products">Danh sách sản phẩm</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorys
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            
            <li><NavLink className="dropdown-item" to="/admin/categorys/add">Thêm danh mục</NavLink></li>
            <li><NavLink className="dropdown-item" to="/admin/categorys">Danh sách danh mục</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Carts
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            
           
            <li><NavLink className="dropdown-item" to="/admin/carts">Danh sách đơn hàng</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Users
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            
           
            <li><NavLink className="dropdown-item" to="/admin/users">Danh sách tài khoản</NavLink></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default HeaderAdmin