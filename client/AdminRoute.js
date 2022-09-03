//ตรวจสอบ route ว่ามีการ login มาหรือยัง
import {getUser} from "./services/authorize";
import { Route,Redirect } from "react-router-dom";


const AdminRoute=({component:Component,...rest})=>{
    <Route 
    {...rest}
    render={props=>
        getUser() ? //ถ้ามีการ login สามารถไปทุก router ได้
        (<Component {...props}/>) : //ถ้าไม่มีการ login กลับไปหน้า /login
        (<Redirect 
            to={{pathname:"/login",state:{from:props.location}}}
            />
        )
    } 
/>
}
export default AdminRoute