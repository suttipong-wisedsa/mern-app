import React, { useState ,useEffect} from 'react'
import NavbarComponent from './NavbarComponent';
import axios from "axios";
import Swal from 'sweetalert2'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
export const EditComponent = (props) => {
    const [state,setStarte] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title,author,slug} = state //การ destructuring หรือ สลายโคลงสร้างออกมาใช้จาก object
    const [content,setContent] = useState('')
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            const {title,author,content,slug} = response.data
            setStarte({...state,title,author,slug}) //นำข้อมูลที่ดึงมาใส่ state
        setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    const submitContent=(event)=>{
        setContent(event)
    }

    const inputValue=name=>event=>{ //name คือ title||content||author ที่ส่งมาจาก form
        setStarte({...state,[name]:event.target.value});
    }
    const submitForm=(e)=>{
        e.preventDefault(); //ไม่ clear ฟอร์ม
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author}) //เรียกใช้ API ในการบันทึกข้อมูลและส่งค่า 3 ค่าไปทำงานที่ตัว API
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน!',
                'อัพเดตเรียบร้อย!',
                'success'
              )
              const {title,content,author,slug} = response.data
             setStarte({...state,title,author,slug}) //หลังจากบันทึกข้อมูลแล้วให้ clear ข้อมูลใน from
            setContent(content)
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
        <h1>แก้ไขบทความ</h1>
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
            </div>
            <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        style={{border:'1px solid #666'}}
                    />
            <div className="form-group">
                <label>ชื่อผู้เขียน</label>
                <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
            </div>
            <br></br>
            <input type="submit" value="อัพเดต" className="btn btn-primary"/>
            
        </form>
    </div>
  )
}
