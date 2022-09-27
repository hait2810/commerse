import React from 'react'
import { Outlet } from 'react-router-dom'

import HeaderAdmin from '../components/HeaderAdmin'

type Props = {}

const AdminLayout = (props: Props) => {
  return (
    <div>
       <header>
          <HeaderAdmin />
       </header>
      <main>
        <Outlet />
      </main>
     <footer>

     </footer>
    </div>
  )
}

export default AdminLayout