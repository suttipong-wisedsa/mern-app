const express = require("express")
const { create , getAllblogs ,singleBlog ,remove ,update} = require("../controllers/blogController")
const router = express.Router()
const {requireLogin} = require("../controllers/authController")

router.post('/create',create) //เมื่อใช้ path /blog จะเรียกใช้ function create
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog) //ในpathจะมีพารามิเตอร์ที่ส่งมาจาก slug
router.delete('/blog/:slug',remove) //path ลบข้อมูล
router.put('/blog/:slug',update) //อัพเดตข้อมูล

module.exports=router