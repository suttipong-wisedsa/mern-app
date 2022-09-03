// เรียกใข้ package
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')

//สร้าง app ด้วย express
const app = express()


//connect database
mongoose.connect(process.env.DATABASE,{
    //เลือก option
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("เชื่อมต่อฐานข้อมูลเรียบร้อย")) //ถ้าเชื่อมต่อฐานข้อมูลสำเร็จให้ log
.catch(()=>console.log(err)) //ถ้าเชื่อมต่อฐานข้อมูลไม่สำเร็จให้ log(err)

//middleware ตั้งค่าความสามารถ express
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


//route
app.use('/api',blogRoute)
app.use('/api',authRoute)


//เรียกใช้ตัวแปร PORT ในไฟล์ env 
const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`start server ${port}`))//ทำให้แอป run ใน port