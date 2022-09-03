import React from 'react'
import NavbarComponent from './NavbarComponent'
import { useState ,useEffect } from 'react'
import axios from "axios"
import Swal from 'sweetalert2'
import { authenticate } from '../services/authorize'
import {withRouter} from "react-router-dom"
import { getUser } from '../services/authorize'
const LoginComponent = (props) => {
    const [state,setStarte] = useState({
        username:"",
        password:""
    })
    const {username,password} = state
    const inputValue=name=>event=>{ //name คือ username||password ที่ส่งมาจาก form
        setStarte({...state,[name]:event.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault(); //ไม่ clear ฟอร์ม
        console.table({username,password})
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password}) //ส่ง username และ password ไปยัง server
        .then(response=>{ //login สำเร็จ
            authenticate(response,()=>props.history.push("/create")) //ให้ push path 
        })
        .catch(err=>{
            Swal.fire(
                'แจ้งเตือน!',
                err.response.data.error,
                'error'
              )
        })
    }
    useEffect(()=>{
        getUser() && props.history.push("/")
    },[])
  return (
    <div className="container p-5">
        <h1>เข้าสู่ระบบ</h1>
        <NavbarComponent />    
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={inputValue("username")}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={inputValue("password")}/>
            </div>
            <br></br>
            <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
            
        </form>
    </div>
  )
}

export default withRouter(LoginComponent) //เมื่อ login ให้เปลี่ยน path ใหม่