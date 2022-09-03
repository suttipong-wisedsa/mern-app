//เก็บ token / username ลงใน session storage

export const authenticate=(response,next)=>{
    if(window !== "undefinded"){
        //เก็บข้อมูลลง session storage ใน token && user
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.username))

    }
    next() //ให้ redirect หน้า /create
}

//ดึงข้อมูล token
export const getToken=()=>{
    if(window !=="undefined"){ //ถ้าไม่ undefined
        if(sessionStorage.getItem("token")){ //ถ้ามีการเก็บ token
             return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user 
export const getUser=()=>{
    if(window !=="undefined"){ //ถ้าไม่ undefined
        if(sessionStorage.getItem("token")){ //ถ้ามีการเก็บ user
             return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

// logout
export const logout=(next)=>{
    if(window !=="undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}