/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useState } from "react";
import style from './borrowRequest.module.scss'
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helper/authContext"
import Navbar from "../../components/Navbar/Navbar";
import {BASE_API_URL} from '../../utils/Constants';

function BorrowRequest() {

    const { setAuthState } = useContext(AuthContext);


    let history = useNavigate();
    const [amount, setAmount] = useState();
    const [reason, setReason] = useState();
    const [duration, setDuration] = useState();
    const [upiId, setUpiId] = useState();

    function handleChange(e) {
        if (e.target.name === "amount") setAmount(e.target.value);
        if (e.target.name === "reason") setReason(e.target.value);
        if (e.target.name === "duration") setDuration(e.target.value);
        if (e.target.name === "upiId") setUpiId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
            mobile: sessionStorage.getItem("accessToken"),
            amount: amount,
            reason: reason,
            duration: duration,
            upiId:upiId,
        }
        console.log(obj);
        axios.post(`${BASE_API_URL}/borrow-request`, obj,)
            .then(res => {
                if (res.data.message) alert(res.data.message);
                else {
                    history('/')
                    history('/')
                    history('/')
                    history('/')
                    history('/')
                    history('/')
                }
            })
            .catch(err => {
                alert("error in signup: ", err);
            });
    }

    return (
        <>
            <Navbar />
            <div className={style.main_block}>
                <h1>Make a Borrow Request</h1>
                <form onSubmit={handleSubmit}>
                    <table className={style.marg}>
                        <tr>
                        <input className={style.forinput} type="number" name="amount" id="amount" placeholder="Enter Amount" onChange={handleChange} />
                        </tr>
                        <tr>
                        <input className={style.forinput} type="text" name="reason" id="reason" placeholder="Enter Reason" onChange={handleChange} />
                        </tr>
                        <tr>
                        <input className={style.forinput} type="text" name="duration" id="duration" placeholder="Enter duration in Months" onChange={handleChange} />
                        </tr>
                        <tr>
                        <input className={style.forinput} type="text" name="upiId" id="upiId" placeholder="Enter UPI ID" onChange={handleChange} />
                        </tr>
                    </table>
                
                    <div className={style.btn_block}>
                        <button type="submit">Make Request</button>
                    </div>
                </form>

            </div >
        </>

    )

}


export default BorrowRequest;