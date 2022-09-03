import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../services/authorize";
const NavbarComponent = ({history}) => {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li>
          <a className="nav-link" href="/">หน้าแรก</a>
        </li>
       
        {getUser() && ( //ถ้ามีข้อมูล user หรือ ถ้ามีการ login ให้แสดงปุ่ม เขียนบทความ
          <li>
          <a className="nav-link" href="/create">เรียนบทความ</a>
        </li>
        )}
       
        {!getUser() && ( //ถ้ายังไม่มีข้อมูล user  หรือ ถ้าไม่มีการ loginให้แสดงปุ่ม login
          <li>
            <a className="nav-link" href="/login">เข้าสู่ระบบ</a>
          </li>
        )}
        {getUser() && ( //ถ้ามีข้อมูล user ให้แสดงปุ่ม loout
        //ออกจากระบบและกลับไปหน้า /
          <li>
          <button className="nav-link" href="/login" onClick={()=>logout(()=>history.push("/"))}>ออกจากระบบ</button> 
        </li>
        )}
        
      </ul>
    </nav>
  );
};
export default withRouter(NavbarComponent)
