import React, { useState } from 'react'
import NavbarComponent from './NavbarComponent';
import axios from "axios";
import Swal from 'sweetalert2'
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill" //เป็น textArea ที่ปรับแต่งได้
import ReactDOM from 'react-dom/client';
import { getUser } from '../services/authorize';
export const FormComponent = () => {
    const [state,setStarte] = useState({
        title:"",
        author:getUser() //เอาชื่อของคนที่ login เก็บไว้ author
    })
    const {title,author} = state //การ destructuring หรือ สลายโคลงสร้างออกมาใช้จาก object

    const [content,setContent] = useState('')
    const submitContent=(e)=>{
        setContent(e)
    }
    const inputValue=name=>event=>{ //name คือ title||content||author ที่ส่งมาจาก form
        setStarte({...state,[name]:event.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault(); //ไม่ clear ฟอร์ม
        axios.post(`${process.env.REACT_APP_API}/create`,{title,content,author}) //เรียกใช้ API ในการบันทึกข้อมูลและส่งค่า 3 ค่าไปทำงานที่ตัว API
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน!',
                'บันทึกเรียบร้อย!',
                'success'
              )
             setStarte({...state,title:"",content:"",author:""}) //หลังจากบันทึกข้อมูลแล้วให้ clear ข้อมูลใน from
            setContent('')
            }).catch(err=>{
            Swal.fire(
                'แจ้งเตือน!',
                err.response.data.error,
                'error'
              )
        })
    }
    
  return (
    <div className="container p-5">
        <h1>My-Diary</h1>
        <NavbarComponent />
        
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
            </div>
            <div className="form-group">
                <label>รายละเอียด</label>
               <ReactQuill 
               value={content}
               onChange={submitContent}
               theme="snow"
               className="pb-5 mb-3"
               placeholder="เขียนรายละเอียด"
               style={{border:'1px solid silver'}}
               /> 
            </div>
            <div className="form-group">
                <label>ชื่อผู้เขียน</label>
                <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
            </div>
            <br></br>
            <input type="submit" value="บันทึก" className="btn btn-primary"/>
            
        </form>
    </div>
  )
}
