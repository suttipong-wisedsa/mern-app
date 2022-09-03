import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
export const SingleComponent = (props) => {
  const [blog,setBlog] = useState('')
  useEffect(()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`) //ดึงapi จาก slug
    .then(response=>{
        setBlog(response.data)
    })
    .catch(err=>alert(err))
    
},[])
  return(  
    <div className="container p-5">
    <NavbarComponent/>
    <div>
        <h1>{blog.title}</h1>
        <div className="pt-3">{blog.content}</div>
        <p className="text-muted"> ผู้เขียน: {blog.author}</p>
    </div>
</div>
  ) 
};
