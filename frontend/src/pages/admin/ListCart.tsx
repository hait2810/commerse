import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
type Props = {}

const ListCart = (props: Props) => {
    const [carts, setCart] = useState<any[]>([]);
    const getCart = async () => {
        const {data} = await axios.get("https://commerse-production.up.railway.app/carts")
        setCart(data)
    }

    useEffect(() => {
        getCart()
    }, [])
    const onRemove = async (id: any) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá")
        if(confirm) {
             await axios.delete(`https://commerse-production.up.railway.app/carts/${id}`);
             setCart(carts.filter(item => item._id !== id))
            toastr.success("Xoá thành công")
        }
    }
  return (
    <div>
          <div>
        <div className="container">
  <h2>Danh sách giỏ hàng</h2>
        
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Total Money</th>
        <th>Status</th>
        <th>Detail / Update Status</th>
        <th>Remove</th>     
      </tr>
    </thead>
    <tbody>
    {carts?.map((item,index) => {
                return  <tr>
                <td>{index +1 }</td>
                <td>{item.totalprice}</td>
                <td>{item.status == 1 ? 'Đã gửi' : 'Đang xử lý'}</td>
                <td><NavLink className="btn btn-success" to={`${item._id}/detail`}>Click</NavLink></td>
                <td><button onClick={() => onRemove(item._id)} className='btn btn-info'>Remove</button></td>
                
              
              </tr>
            })}
     
      
    </tbody>

  </table>
</div>
    </div>
    </div>
  )
}

export default ListCart