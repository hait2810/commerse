import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'


import '../../assets/css/style.css'
import { Helmet } from "react-helmet"
import Footer from '../components/Footer'
type Props = {}

const WebsiteLayout = (props: Props) => {
  
  return (
    
    <div>
      
         <header>
            <Header />
        </header>
      
      
     
        <Outlet />
      
     
      
        <footer>
            <Footer />
        </footer>
    
        <Helmet>
           <script type='module' src="https://hait2810.github.io/assets/assets/js/main.js" ></script>
      </Helmet>
       
    </div>
    
  )
}
export default WebsiteLayout