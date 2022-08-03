import React, { Children } from 'react'
import {Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

type PrivateRouterProps = {
    children: JSX.Element;
}

const PrivateRouter = (props: PrivateRouterProps) => {
  const role = JSON.parse(localStorage.getItem("user") as any).role;
    
    
    if(role == 1){
      return props.children
    }else{
      return <Navigate to="/signin" />
    }
}
export default PrivateRouter