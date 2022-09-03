//ติดต่อสอบถามกับฐานข้อมูล
const Blogs = require("../models/blogs")
const slugify = require("slugify")
const { v4: uuidv4 } = require('uuid');
//สร้างข้อมูล
exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title) //ค่าเปลี่ยนให้ใช้ let

    //ตรวจสอบความถูกต้อง
    if(!slug)slug=uuidv4(); //ถ้า slug เป็นค่าว่างให้slugใส่ uuid แทน
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    res.json({
        data:{title,content,author,slug}
    })
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{ //ถ้า err แสดง error ถ้าไม่ ก็เก็บไว้ใน blog
        if(err){
            res.status(400).json({error:err})
        }
        res.json(blog)
    })
} 

//ดึงข้อมูลมาแสดงทั้งหมด
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{ //Blogs มาจาก models ถ้า error ให้โชว์ แต่ถ้าไม่ error ให้เก็บไว้ใน blogs
        res.json(blogs) //ดึงข้อมูล
    })
}

//ดึงบทความที่สนใจอ้างอิงจาก slug หรือ Url
exports.singleBlog=(req,res)=>{
    const {slug} = req.params //เอามาจากพารามิเตอร์ที่ route
    Blogs.findOne({slug}).exec((err,blog)=>{//findOne=ค้นอันเดียว
        res.json(blog)
    }) 
}

//ลบข้อมูล
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{ //เอา slug ที่รับมาไปค้นหาและลบ
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}

//อัตเดตข้อมูล
exports.update=(req,res)=>{
    const {slug} = req.params //รับ url  
    const {title,content,author}=req.body  // รับข้อมูล => title , content, author
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}