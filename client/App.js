import axios from "axios"
import NavbarComponent from "./components/NavbarComponent";
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Swal from "sweetalert2";
import {getUser} from "./services/authorize"

function App() {
  const [blogs,setBlogs] = useState([]) //เก็บข้อมูลที่แสดง

  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`) //ดึง api แสดงข้อมูล
    .then(response=>{ //ถ้ามี respone กลับมา
      setBlogs(response.data) //นำข้อมูลใส่ใน usestate
    })
    .catch(err=>alert(err)); //ถ้าไม่มี ให้แสดง error
  }

  useEffect(()=>{ //เมื่อแอป run ให้ทำงานในส่วน useEffect ทันที
    fetchData()
  },[])
  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบหรือไม่",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{ //เก็บการยืนยันการลบไว้ใน result
      if(result.isConfirmed){  //เช็คว่า กดยืนยันการลบหรือไม่ 
        deleteBlog(slug)
      }
    })
  const deleteBlog=(slug)=>{ 
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`) //เรียกใช้ api ลบข้อมูล
    .then(response=>{
      Swal.fire("Delete",response.data.message,"success")
      fetchData()
    })
    .catch(err=>console.log(err))
   
  }
  }
  return (
    <div className="container p-5">
      <h1>My-Diary</h1>
      <NavbarComponent />
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.substring(0,200)}</p>
            <p className="text-muted">{`ผู้เขียน:${blog.author}`}</p>
            {getUser() && ( //ถ้ามีการ login ให้แสดงปุ่ม
              <div>
                <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
            <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button> 
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
