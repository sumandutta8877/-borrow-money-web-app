import React, { useContext } from 'react'
import style from './signupPage.module.scss'
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helper/authContext";
import axios from "axios";
import swal from 'sweetalert2';
import Navbar from '../../components/Navbar/Navbar';
import { BASE_API_URL } from '../../utils/Constants';


const SignupPage = () => {

    const { setAuthState } = useContext(AuthContext);
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [mobile, setMobile] = useState();
    const [otp,setOtp]= useState();
    const [userotp, setUserotp]= useState();

    let history = useNavigate();

    function handleChange(e) {
        if (e.target.name === "name") setName(e.target.value);
        if (e.target.name === "gender") setGender(e.target.value);
        if (e.target.name === "mobile") setMobile(e.target.value);
        if (e.target.name==="otp") setUserotp(e.target.value);
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email, password);
        const obj = {
          name:name,
          gender:gender,
          mobile:mobile
        }
        axios.post(`${BASE_API_URL}/signupPage`, obj)
          
          .then(res => {
            if (res.data.message) {
              swal.fire({
                title: res.data.message,
                icon: "info",
              });
            }
            else {
            //   setAuthState(true);
            //   sessionStorage.setItem("accessToken", res.data);
              swal.fire({
                icon: 'success',
                title: 'OTP SENT',
                showConfirmButton: false,
                timer: 1000,
              });
              setOtp(res.data.OTP);
              document.getElementById('1').style.display="block";
            }
          })
          .catch(err => {
            swal.fire({
              icon: 'warning',
              title: err,
              // showConfirmButton: false,
              // timer: 1000,
            });
          });
      }

      const handleVerify = (e) => {
        e.preventDefault();
        // console.log(email, password);
        const obj = {
          name:name,
          gender:gender,
          mobile:mobile,
          otp:otp,
          userotp:userotp
        }
        axios.post(`${BASE_API_URL}/verify`, obj)
          
          .then(res => {
            if (!res.data.Isverify) {
              swal.fire({
                title: "Wrong OTP",
                icon: "info",
              });
            }
            else {
              setAuthState(true);
              sessionStorage.setItem("accessToken",mobile);
              swal.fire({
                icon: 'success',
                title: 'Successfully Registered',
                showConfirmButton: false,
                timer: 1000,
              });

              history("/");
            }
          })
          .catch(err => {
            swal.fire({
              icon: 'warning',
              title: err,
              // showConfirmButton: false,
              // timer: 1000,
            });
          });
      }



  return (
    <div>
        <Navbar/>
        <h1>Register</h1>
          <form onSubmit={handleSubmit}>
              <table className={style.marg}>
                  <tr>
                  <input className={style.forinput} type="text" name="name" id="name" placeholder="Name" onChange={handleChange} />
                  </tr>
                  <tr>
                  {/* <input className={style.forinput} type="te" name="gender" id="gender" placeholder="Gender" onChange={handleChange} /> */}
                  <select className={style.forinput} name="gender" id="gender" onChange={handleChange}>
                       <option value="">---Gender---</option>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Other">Other</option>
                  </select>
                  </tr>
                  <tr>
                  <input className={style.forinput} type="number" name="mobile" id="mobile" placeholder="Mobile No." onChange={handleChange} />
                  </tr>

              </table>
          
          
           

            <div className={style.btn_block}>
              <button className={style.custom_button} type="submit">Register</button>
            </div>
            <div className={style.popup} id="1">
               <input type='number' placeholder='Please enter otp' name="otp" onChange={handleChange}></input>
               <button className={style.custom_button} onClick={(handleVerify)}>Verify</button>
          </div>
             <div className={style.or}>
              Already Registered ?
            </div>
            <div className={style.btn_block}>
              <Link to="/loginPage">
                <button type="button" className={style.custom_button}>Login
                </button>
              </Link>
            </div> 
          </form>

          
    </div>
  )
}

export default SignupPage