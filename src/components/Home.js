import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";


function Home()
{
    const history = useHistory();

    useEffect(() => {

        if (!localStorage.getItem("user-info")) {
          history.push("/")
        }
      }, [])
   // let user = JSON.parse('' + localStorage.getItem('user-info'))


    return(
        <div>
           <HeadOffline/> 
            <SideBar />  
            <h1></h1>
            <br />
      <br />
      <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  
      {/* <Footer /> */}
        </div>
    )
}

export default Home;