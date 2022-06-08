import React, { Component, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//import {Link} from 'react-router-dom';

import Footer from './Footer';
import HeadOffline from './HeadOffline';

function Login() {

  const [password, setPassword] = useState('');
  const [matricule, setMatricule] = useState('');
  const history = useHistory();

  useEffect(() => {

    if (localStorage.getItem("user-info")) {
      history.push("/user")
    }
  }, [])

  const login = async (e) => {
    e.preventDefault();

    let item = { matricule, password };
    console.warn(item);

    const result = await fetch('http://maxsalesbackend.com/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
      /*    body:JSON.stringify( {
           email,
           password
       }) */
    });
    const re = await result.json();
  
    console.warn(re.error);
    console.warn(re);
    console.warn(result);
    if (!re.error) {
      localStorage.setItem("user-info", JSON.stringify(re));
      localStorage.setItem('usermat', JSON.stringify(re[0].matricule));
      let response = localStorage.setItem("user-info", JSON.stringify(re));
      console.warn(re); 
      console.warn(re[0].matricule); 
      //console.warn('reponse '+response); 
     history.push("/user")
    }
    if (re.error) {
      alert('matricule ou password invalide')
      //window.location.reload()
      history.push("/")
    }

  }


  return (


    <div className="accueil">
      {/* <HeadOffline/>  */}
      <HeadOffline/> 

      {/*   <div className="header">
          MAX SOLUTION 
        </div> */}
      <br />
      <br />


      <p>MERCI DE VOUS AUTHENTIFIER</p>

      <div className="col-sm-3 offset-sm-4" style={{ marginLeft: '500px' }}>

        <img style={{ width: 130, height: 130, marginLeft: 100 }}
          src={"login.png"} />

        {/* <div className="form-control" style={{backgroundColor:'#518899', borderRadius:'100px'}} > */}
        <input type="text" className="form-control" placeholder="matricule"
          style={{ borderRadius: '100px' }}
          onChange={e => setMatricule(e.target.value)} />
        {/* </div> */}


        <br />

        <input type="password" className="form-control" placeholder="password"
          style={{ borderRadius: '100px' }}
          onChange={e => setPassword(e.target.value)} />


        <br />

        <button onClick={login} style={{ borderRadius: '100px' }} className="w-100 btn btn-lg btn-primary">Se connecter</button>


      </div>
      <Footer />
    </div>





  );
}
export default Login;

