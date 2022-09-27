import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PrivateRouter from './components/PrivateRouter'
import AddCategory from './pages/admin/AddCategory'
import AddProduct from './pages/admin/AddProduct'
import EditCategory from './pages/admin/EditCategory'
import ListCategory from './pages/admin/ListCategory'
import ListProduct from './pages/admin/ListProduct'
import UpdateProduct from './pages/admin/UpdateProduct'
import DetailProduct from './pages/DetailProduct'
import AdminLayout from './layouts/AdminLayout'
import WebsiteLayout from './layouts/WebsiteLayout'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ListCart from './pages/admin/ListCart'
import DetailCart from './pages/admin/DetailCart'
import ListUser from './pages/admin/ListUser'
import EditUser from './pages/admin/EditUser'
import Discount from './pages/Discount'
import AllProduct from './pages/AllProduct'
import Search from './pages/Search'





function App() {
  
  return (
    
    <div className="App">
      
      <Routes>
          <Route path='/' element={<WebsiteLayout />} >
            <Route index element={<Home />}/>
            <Route path='carts' element={<Cart />} />
            <Route path='signin' element={<Signin /> }/>
            <Route path='signup' element={<Signup /> }/>
            <Route path='discount' element={<Discount /> }/>
            <Route path='allproduct' element={<AllProduct /> }/>
            <Route path='product/:id' element={<DetailProduct />} />
            <Route path='search/:key' element={<Search />} />
            <Route path='categorys/:id' element={<Category />} />
           </Route>
           
          <Route path='admin' element={<PrivateRouter><AdminLayout /></PrivateRouter>} >
            <Route path='products'>
              <Route index element={<ListProduct />} />
              <Route path='add' element={<AddProduct />} />
              <Route path=':id/edit' element={<UpdateProduct />} />
            </Route>
            <Route path='categorys'>
              <Route index element={<ListCategory />} />
              <Route path='add' element={<AddCategory />} />
              <Route path=':id/edit' element={<EditCategory />} />
            </Route>
            <Route path='carts'>
                <Route index element={<ListCart />}/>
                <Route path=':id/detail' element={<DetailCart/>} />
            </Route>
            <Route path='users' >
              <Route index element={<ListUser />} />
              <Route path=':id/edit' element={<EditUser />} />
            </Route>
          </Route>  
      </Routes>
    </div>
  )
}

export default App
