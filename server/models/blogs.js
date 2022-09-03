//โครงสร้างการจัดเก็บข้อมูล database
//โดยจะมี title, content, author
const mongoose = require("mongoose")

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true //ต้องใส่ค่า
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"Admin" //ค่าดั้งเดิม
    },
    slug:{
        type:String,
        lowercase:true, //ทำให้เป็นตัวเล็กทั้งหมด
        unique:true //ค่าต้องไม่ซ้ำ
    }
},{timestamp:true} //เก็บ ว/ด/ปี ช่วงเวลาในการบันทึก
)

module.exports = mongoose.model("Blogs",blogSchema) //โยนค่าเก็บไว้ในชื่อ Blogs โดยโครงสร้างมาจาก blogSchema และ export ออกไปใช้งาน