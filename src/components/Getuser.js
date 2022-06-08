import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory, Link, withRouter } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios from "axios";


function Getuser(props) {

   console.warn("props",props.match.params.id);
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [telephone, setTelephone] = useState('');
  const [fonction, setFonction] = useState('VENDEUR');
  const [adresse, setAdresse] = useState('');
  const [salaire, setSalaire] = useState('');
  const [email, setEmail] = useState('');
  const [cni, setCni] = useState('');
  const [confirmrisk, setConfirmrisk] = useState('0');
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

   useEffect(async() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }

    getAllUser();
    getuser();

 /*    let res = await fetch("http://maxsalesbackend.com/api/getuser/"+props.match.params.id);
    res = await res.json();
    setUser(res)
       // console.warn(res);
        console.warn(user); */


  }, []); 

  async function getuser() {
    let res = await fetch("http://maxsalesbackend.com/api/getuser/"+props.match.params.id);
    res = await res.json();
    setUser(res)
        console.warn(res);
        //console.warn(user);
        
};

  function getAllUser() {
    let res = axios.get("http://maxsalesbackend.com/api/alluser")
        .then((res) => setData(res.data));
};

async function deleteoperation(id) {
  //console.warn("id " ,id)
  let result = await fetch('http://maxsalesbackend.com/api/delete/' + id, {
      method: 'DELETE',
  });
  let re = await result.json();
  const dd = re
  console.warn("delete ", re)
  getAllUser();
}
  // let user = JSON.parse('' + localStorage.getItem('user-info'))
  async function reset() {

    let item = {
      nom, username, telephone, fonction, adresse, salaire,
      cni, email, password,confirmrisk
    };
    console.warn(item)


    window.location.reload()
  }






  async function signup() {



    let item = {
      nom, username, telephone, fonction, adresse, salaire,
      cni, email, password ,confirmrisk
    };
    console.warn(item.nom);
    if (item.nom === "") {
      alert('veuillez renseigner le nom svp')
    }
    if (item.username === "") {
      alert('veuillez renseigner le username svp')
    };
    if (item.salaire === "") {
      alert('veuillez renseigner le salaire svp')
    }
    if (item.password === "") {
      alert('veuillez renseigner le password svp')
    }

    if (item.nom !== "" && item.username !== "" && item.salaire !== "" && item.password !== "") {

      let result = await fetch('http://maxsalesbackend.com/api/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(item)
      });
      result = await result.json();
      console.warn('voici le result' + result);
      //localStorage.setItem("user-info",JSON.stringify(result));

      alert('utilisateur ajouté avec succès');
      //history.push("/useradd")
      window.location.reload()
    }
  }
  return (
    <div>
      <HeadOffline />
      <SideBar />

      <div className="utiGau">


        <div style={{ textAlign: 'center' }}></div>

        <div style={{ float: 'left', marginTop: '5px', width: '180px', height: '330px' }}>



          <label style={{ marginTop: '5px' }}>username</label>
          <input readOnly type="text" className="form-control" placeholder=""
            style={{ borderRadius: '100px' }} value={user.username}
         />

          <label style={{ marginTop: '15px' }}>Téléphone</label>
          <input readOnly style={{ borderRadius: '100px' }} type="number" 
          className="form-control"  value={user.telephone}
             />


          <label style={{ marginTop: '15px' }}>Adresse</label>
          <input readOnly type="text" className="form-control" value={user.adresse}
            style={{ borderRadius: '100px' }} />

          <label style={{ marginTop: '15px' }}>Email</label>
          <input readOnly style={{ borderRadius: '100px' }} type="email"
           className="form-control" value={user.email} />

          <label style={{ marginTop: '15px' }}>locked</label>
          <input readOnly type="text" className="form-control"
            style={{ borderRadius: '100px' }} value={user.locked} />

         <label style={{ marginTop: '15px' }}>confirmrisk</label>
          <input readOnly type="text" className="form-control"
            style={{ borderRadius: '100px' }} value={user.confirmrisk} />

        </div>

        <div style={{ float: 'left', paddingLeft: '20px', marginRight: '-80px', marginTop: '5px', width: '200px', height: '330px' }}>



          <label style={{ marginTop: '5px' }}>Nom</label>
          <input readOnly type="text" className="form-control"
            style={{ borderRadius: '100px' }}value={user.nom} />

          <label style={{ marginTop: '15px' }}>Fonction</label>
          <input readOnly type="text" className="form-control"
            style={{ borderRadius: '100px' }}value={user.fonction} />
            
          <label style={{ marginTop: '15px' }}>Base salariale</label>
          <input readOnly type="number" className="form-control"
            style={{ borderRadius: '100px' }} value={user.salaire} />

          <label style={{ marginTop: '15px' }}>CNI</label>
          <input readOnly type="text" className="form-control"
            style={{ borderRadius: '100px' }} value={user.cni} />

          <label style={{marginLeft:'-0px', marginTop: '15px' }}>password</label>
          <input readOnly type="text" className="form-control"
            style={{ marginLeft:'-0px',borderRadius: '100px' }} value={user.password} />


          <label style={{ marginTop: '15px' }}>Bonus</label>
          <input readOnly type="text" className="form-control"
            style={{ borderRadius: '100px' }} value={user.bonus} />

<label style={{ marginTop: '-5px' }}>Level</label>
          <input readOnly type="text" className="form-control"
            style={{ borderRadius: '100px' }} value={user.level} />


            

        </div>
        <div>
            
        </div>

      

    </div>

      <span style={{float:'left',borderLeft:'2px solid #135D74',height:'500px',display:'inline-block'}}></span>



      <div className="utiDroi">
        <span style={{textAlign:'center'}}> </span>

    {/*<table className="table table-bordered table-striped"> */}
                <table>
                    <thead>
                        <tr style={{backgroundColor:'#EBF3FF'}}>
                            <th style={{width:'100px'}}>N°</th>
                            <th style={{width:'100px'}}>Username</th>
                            <th style={{width:'200px'}}>Nom</th>
                            <th style={{width:'100px'}}>Telephone</th>
                            <th style={{width:'100px'}}>Fonction</th>
                            <th style={{width:'100px'}}>Password</th>
                            <th > <span style={{float:'right',textAlign:"right",width:'5px'}}>operation</span> </th>
                            <th>  </th>
                            <th>  </th>
                        </tr>
                    </thead>
                    
                     
                    
                    {/* {data.length} */}
                    {
                    
                        data.map((item) => (
              
                            <tr style={{backgroundColor:'whitesmoke'}} key={item.id}>
                              
                               <td>{item.id}</td>
                               <td>{item.username}</td>
                                <td>{item.nom}</td>
                                <td>{item.telephone}</td>
                                {/* <td>{item["Telephone"]}</td> */}
                                <td>{item.fonction}</td>
                                <td>{item.password}</td>
                             
                                {/* <td>
                                    <img style={{ width: 150, height: 150 }}
                                        src={"http://localhost/ecommerce/laravelbackendAuth/public/storage/" + item["file"]} />
                                </td> */}
                                <td><span  onClick={() => deleteoperation(item["id"])} className="btdelete">delete</span></td>

                                <td>
                                    <Link to={"update/"+item.id}>
                                        <span  style={{marginRight:'10px'}} className="btupdate">Update</span>
                                        </Link>
                                            </td>

                                            <td>
                                    <Link to={"getuser/"+item.id}>
                                        <span className="btdetail">Detail</span>
                                        </Link>
                                            </td>
                                            <br /><br />
                            </tr>
                        ))
                    }
                </table>
      
      
      
      
      
      
      </div>
      <div className="utiBas">
      
        <div className="gpeut">
        <img src={"usergroup.png"} alt="usergroupe" />groupe d'utilisateurs
        </div>
        <div className="gpepage">
        <img src={"page.png"} alt="page" />
        groupe de pages</div>

        <div className="gpesite">
        <img src={"site.png"} alt="site" />
        groupe de sites</div>
        
        
        
  </div>



      {/*         <br />
      <br />
      <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  
      <Footer /> */}
    </div>
  )
}

export default withRouter(Getuser);