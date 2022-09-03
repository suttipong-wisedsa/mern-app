const jwt = require("jsonwebtoken")
const expressJWT = require("express-jwt")
//jwt ไว้จัดการการ login
exports.login=(req,res)=>{
    const {username,password} = req.body //ข้อมูลที่ user ส่ง
    if(password === process.env.PASSWORD){ //ถ้ารหัสผ่านที่ป้อนมาตรงกัน
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'}) //จะสร้าง token ให้ผู้ใช้ถือมีอายุ 1 วัน
        return res.json({token,username})
    }else{
        return res.status(400).json({
            error:"รหัสผ่านไม่ถูกต้อง"
        })
    }
}

