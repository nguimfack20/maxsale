import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios from "axios";
import { Table } from "react-bootstrap";


function Utilisateuradd() {
  const [user, setUser] = useState([]);
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [matricule, setMatricule] = useState('');
  const [telephone, setTelephone] = useState('');
  const [actif, setActif] = useState('oui');
  const [adresse, setAdresse] = useState('');
  const [salaire, setSalaire] = useState('');
  const [email, setEmail] = useState('');
  const [cni, setCni] = useState('');
  const [profil, setProfil] = useState('');
  const [dataprofilfiltre, setDataprofilfiltre] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const [depotbd, setDepotbd] = useState("");
  const history = useHistory();
  const [data, setData] = useState([]);
  const [iddelete, setIddelete] = useState('');

  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }
    // setDepotbd("bar10");// getProfil();
    getAllUser();
    
    profilallfiltre();//recupere les types de profils sans doublons


  }, []);

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
      nom, matricule, telephone, actif, adresse, salaire,
      cni, email, password, profil,
    };
    console.warn(item)


    window.location.reload()
  }

/*   const getProfil = async () => {

    let rese = axios.get('http://maxsalesbackend.com/api/getProfil/' + profil)
      .then((res) => setProfil(res.data));

  } */

  function profilallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/profilallfiltre")
      .then((res) => setDataprofilfiltre(res.data));

  };






  async function signup() {
    console.log(iddelete);
    let item = {
      nom, matricule, telephone, actif, adresse, salaire,
      cni, email, password, profil
    };
    console.warn(item);
    if (item.nom === "") {
      alert('veuillez renseigner le nom svp')
    }
    if (item.matricule === "") {
      alert('veuillez renseigner le matricule svp')
    };
    if (item.salaire === "") {
      alert('veuillez renseigner le salaire svp')
    }
    if (item.password === "") {
      alert('veuillez renseigner le password svp')
    }

    if (item.profil === "") {
      alert('veuillez renseigner le profil svp')
      // window.location.reload();
    }

    if (item.nom !== "" && item.matricule !== "" && item.salaire !== "" && item.password !== "" && item.profil !== "") {

      if (iddelete) {
        console.log(iddelete)
        console.log(item)

        let result = await fetch('http://maxsalesbackend.com/api/updateuser/' +iddelete, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        console.warn('update' + result);
        //localStorage.setItem("user-info",JSON.stringify(result));
  
       alert('mise à jour éffectué avec succès');
        //history.push("/useradd")
      window.location.reload()

      }

      if (!iddelete) {
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
  }



  /*   document.getElementById("inputemail").value='';
    document.getElementById("inputmatricule").value='';
    document.getElementById("inputnom").value='';
    document.getElementById("inputtelephone").value='';
    document.getElementById("inputadresse").value='';
    document.getElementById("inputsalaire").value='';
    document.getElementById("inputcni").value='';
    document.getElementById("inputpassword").value=''; */

  const userInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setActif(element.actif);
        setAdresse(element.adresse);
        setCni(element.cni);
        setEmail(element.email);
        setMatricule(element.matricule);
        setNom(element.nom);
        setProfil(element.profil);
        setPassword(element.password);
        setTelephone(element.telephone);
        setSalaire(element.salaire);
        setIddelete(element.id);

      }


    });

  }
  console.warn(iddelete);

  const deleteuser = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/delete/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllUser();
  }
  const nu = ' ';

  return (
    <div>
      <HeadOffline />
      <SideBar depotbd={depotbd} />

      <div className="utiGau">


        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}>Ajouter un utilisateur</div>

        <div style={{ float: 'left', marginTop: '5px', width: '180px', height: '330px' }}>



          <label style={{ marginTop: '5px' }}>Matricule</label>
          <input id="inputmatricule" value={matricule ? matricule : nu} required type="text" className="form-control" placeholder=""
            style={{ borderRadius: '100px' }}
            onChange={e => setMatricule(e.target.value)} />

          <label style={{ marginTop: '15px' }}>Téléphone</label>
          <input id="inputtelephone" value={telephone ? telephone : nu} style={{ borderRadius: '100px' }} type="number"
            className="form-control" placeholder=""
            onChange={e => setTelephone(e.target.value)} />


          <label style={{ marginTop: '15px' }}>Adresse</label>
          <input id="inputadresse" value={adresse ? adresse : nu} type="text" className="form-control" placeholder=""
            style={{ borderRadius: '100px' }}
            onChange={e => setAdresse(e.target.value)} />

          <label style={{ marginTop: '15px' }}>Email</label>
          <input id="inputemail" value={email ? email : nu} style={{ borderRadius: '100px' }} type="email"
            className="form-control" placeholder=""
            onChange={e => setEmail(e.target.value)} />

          <label style={{ marginTop: '15px' }}>Actif</label>
          <select style={{ height: '35px', width: '180px', borderRadius: '100px', border: ' solid #D1D7DC' }} value={actif} onChange={e => setActif(e.target.value)}>
            <option value="OUI">OUI</option>
            <option value="NON">NON</option>
          </select>

        </div>

        <div style={{ float: 'left', paddingLeft: '20px', marginRight: '-80px', marginTop: '5px', width: '200px', height: '330px' }}>



          <label style={{ marginTop: '5px' }}>Nom</label>
          <input id="inputnom" value={nom ? nom : nu} required type="text" className="form-control" placeholder=""
            style={{ borderRadius: '100px' }}
            onChange={e => setNom(e.target.value)} />

          <label style={{ marginTop: '15px', marginLeft: '50px' }}>Profil</label>
          <select style={{ marginTop: '0px', float: 'left', height: '35px', marginLeft: '0px', width: '180px', borderRadius: '100px', border: ' solid #D1D7DC' }} value={profil} onChange={e => setProfil(e.target.value)}>
            <option style={{ fontSize: '12px' }} value=''>Sélectionner un profil</option>
            {
              dataprofilfiltre.map((item) => (

                <option key={item.id} value={item.profil}>{item.profil} </option>

              ))

            }
          </select>



          <label style={{ marginTop: '15px' }}>Base salariale</label>
          <input id="inputsalaire" value={salaire ? salaire : nu} type="number" className="form-control" placeholder=""
            style={{ borderRadius: '100px' }}
            onChange={e => setSalaire(e.target.value)} />



          <label style={{ marginTop: '15px' }}>CNI</label>
          <input id="inputcni" value={cni ? cni : nu} type="text" className="form-control" placeholder=""
            style={{ borderRadius: '100px' }}
            onChange={e => setCni(e.target.value)} />

          {/*       <label style={{marginLeft:'-200px', marginTop: '15px' }}>password</label>
          <input type="password" className="form-control" placeholder=""
            style={{ marginLeft:'-100px',borderRadius: '100px' }}
            onChange={e => setPassword(e.target.value)} /> */}

          <label style={{ marginLeft: '-20px', marginTop: '15px' }}>password</label>
          <input id="inputpassword" value={password ? password : nu} type="text" className="form-control"
            style={{ marginLeft: '-8px', borderRadius: '100px' }}
            onChange={e => setPassword(e.target.value)} />




        </div>
        <div>
          <br /><br /> <br /> <br />
        </div>

        <br /><br /> <br /> <br /><br /><br /> <br /> <br /><br /><br /> <br /> <br />
        <br /><br />
        <button onClick={deleteuser} style={{ border: '1px solid #ACD3F2', borderRadius: '100px', marginLeft: '-30px', width: '100px', backgroundColor: '#E9F2FF' }} >delete </button>
        <button onClick={reset} style={{ border: '1px solid #ACD3F2', borderRadius: '100px', marginLeft: '10px', marginRight: '20px', width: '100px', backgroundColor: '#E9F2FF' }} >reset</button>

        <button onClick={signup} style={{ border: '1px solid #ACD3F2', borderRadius: '100px', width: '100px', backgroundColor: '#E9F2FF' }} >save </button>



      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '500px', display: 'inline-block' }}></span>



      <div className="utiDroi">
        <span style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}> Liste des utilisateurs</span>
        <br /><br />

        {/*<table className="table table-bordered table-striped"> */}
        <Table striped bordered hover variant="info">
            <thead>
            <tr>
            
              <th>Matricule</th>
              <th>Profil</th>
              <th>Telephone</th>
              <th>Actif</th>
              <th>Password</th>
              <th>Salaire</th>
            </tr>
        
          </thead>
          <tbody>
          {

            data.map((item) => (

              <tr onClick={() => userInfo(item.id)} key={item.id}>

      
                <td>{item.matricule}</td>
                <td>{item.profil}</td>
                <td>{item.telephone}</td>
                <td>{item.actif}</td>
                <td>{item.password}</td>
                <td>{item.salaire}</td>
          
                <br /><br />
              </tr>
            ))
          }
           </tbody>
        </Table>






      </div>
      <div className="utiBas">

        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="profil" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>profils d'utilisateurs</a>
        </div>
        <div className="gpepage">
          <img src={"menu.png"} alt="page" />
          <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="menu">Gestion des menus</a></div>

        <div className="gpesite">
          <img src={"depot.png"} alt="site" />
                
                <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="userdepot">Utilisateur && Depots</a></div>




      </div>



      {/*         <br />
      <br />
      <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  
      <Footer /> */}
    </div>
  )
}

export default Utilisateuradd;