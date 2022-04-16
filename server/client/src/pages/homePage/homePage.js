/* eslint-disable no-unused-vars */
import React, { useState,useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios'
import Card from '../../components/Card/Card';
import style from './homePage.module.scss'
// import {useLocation} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from '../../helper/authContext';
import { BASE_API_URL } from '../../utils/Constants';

import { useEffect } from 'react'
function HomePage() {

    const [allrequests, setAllrequests] = useState([]);
    const {authState,setAuthState}=useContext(AuthContext);
     
    useEffect( ()=>{
        var head= sessionStorage.getItem("accessToken")
        if(head)
        {
            axios.post(`${BASE_API_URL}/allrequests`, {header:head})
            .then((res) => {
            console.log(res.data[0]);
            setAllrequests(res.data);
            //  seaa
            // console
            });
        }
            
      },[]) 

    return <div> 
        < Navbar />
        {authState ? 
        (<>
        <div>
            <h3>ALL Requests</h3>
        </div>
        <span>
            {allrequests.map((item, index) => (
                true && <Card key={index} duration={item.duration} amount={item.amount} reason={item.reason} upiId={item.upiId} className={style.child} />
            ))
            }
        </span>
        </>)
        :
        (<div>
            <h1>Login to Borrow Money from Friends</h1>
        </div>)
    }


    </div>;
}


export default HomePage;