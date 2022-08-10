import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios from "axios";
import { Table } from "react-bootstrap";
import imgprofil from '../Image/profil.png'


function Utilisateuradd() {
  const [agence, setAgence] = useState('');
  const [datenaissance, setDatenaissance] = useState('');

  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [matricule, setMatricule] = useState('');
  const [telephone, setTelephone] = useState('');
  const [actif, setActif] = useState('oui');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [cni, setCni] = useState('');
  const [role, setRole] = useState('');


  const history = useHistory();
  const [data, setData] = useState([]);
  const [iddelete, setIddelete] = useState('');

  useEffect(() => {

    getAllUser();
    console.warn(email)
    //setPassword('')



  }, []);


  const alluser = "http://localhost:8181/api/v1/blessing/utilisateurs"

  function getAllUser() {
    let res = axios.get(alluser)
      .then((res) => setData(res.data));
  };

  console.warn(data)

  async function deleteoperation(id) {
    //console.warn("id " ,id)
    let result = await fetch('http://maxsalesbackend.com/api/delete/' + id, {
      method: 'DELETE',
    });
    let re = await result.json();

    console.warn("delete ", re)
    getAllUser();
  }
  // let user = JSON.parse('' + localStorage.getItem('user-info'))
  async function reset() {

    let item = {
      nom, matricule, telephone, actif, adresse,
      cni, email, password, role,
    };
    console.warn(item)


    window.location.reload()
  }


  async function signup() {

    console.log(iddelete);
    let item = {
      nom, matricule, telephone, actif, adresse, datenaissance, agence,
      cni, email, password, role
    };
    console.warn(item);
    if (item.nom === "") {
      alert('veuillez renseigner le nom svp')
    }
    if (item.matricule === "") {
      alert('veuillez renseigner le matricule svp')
    };

    if (item.password === "") {
      alert('veuillez renseigner le password svp')
    }

    if (item.role === "") {
      alert('veuillez renseigner le role svp')
      // window.location.reload();
    }

    if (item.nom !== "" && item.matricule !== "" && item.password !== "" && item.role !== "") {

      if (iddelete) {
        
        let utilisateur = JSON.stringify({
          nom: nom,
          matricule: matricule,
          telephone: telephone,
          adresse: adresse,
          email: email,
          role: role,
          dateNaissance: datenaissance,
          numeroCni: cni,
          zoneTravail: agence,
          actif: actif,
          password: password
        }); 
        console.log(iddelete)
     

        try {
          let result = await axios.put("http://localhost:8181/api/v1/blessing/utilisateur/" +iddelete, utilisateur,
          {headers:{"Content-Type" : "application/json"}});
          console.log(result.data);
        } catch (error) {
          console.error(error.response.data);  
        } 
        alert('mise à jour éffectué avec succès');
        //history.push("/useradd")
         window.location.reload()

      }

      if (!iddelete) {
        console.warn(item);

         let utilisateur = JSON.stringify({
          nom: nom,
          matricule: matricule,
          telephone: telephone,
          adresse: adresse,
          email: email,
          role: role,
          dateNaissance: datenaissance,
          numeroCni: cni,
          zoneTravail: agence,
          actif: actif,
          password: password
        }); 
        //console.log('utilisateur => ' + JSON.stringify(utilisateur));
 
       /*  const result = await axios.post("http://localhost:8181/api/v1/blessing/utilisateur", utilisateur,
        {headers:{"Content-Type" : "application/json"}});
        console.log(result)  */

        try {
          let result = await axios.post("http://localhost:8181/api/v1/blessing/utilisateur",utilisateur, 
          {headers:{"Content-Type" : "application/json"}});
          console.log(result.data);
        } catch (error) {
          console.error(error.response.data);  
        }  

        // Utilisateuraservice.createUtilisateur(utilisateur);
      
        alert('utilisateur ajouté avec succès');
         window.location.reload()

      }


    }
  }




  const userInfo = (id) => {
    console.log(id)
    data.forEach(element => {
      if (element.id === id) {

        setActif(element.actif);
        setAdresse(element.adresse);
        setCni(element.numeroCni);
        setEmail(element.email);
        setMatricule(element.matricule);
        setNom(element.nom);
        setRole(element.role);
        setPassword(element.password);
        setTelephone(element.telephone);
        setDatenaissance(element.dateNaissance);
        setAgence(element.zoneTravail);
        setIddelete(element.id);

      }


    });

  }
  console.warn(iddelete);

  const deleteuser = async () => {
    console.warn(iddelete);
    let utilisateur = JSON.stringify({
      nom: nom,
      matricule: matricule,
      telephone: telephone,
      adresse: adresse,
      email: email,
      role: role,
      dateNaissance: datenaissance,
      numeroCni: cni,
      zoneTravail: agence,
      actif: actif,
      password: password
    }); 
    console.log(iddelete)
 

    try {
      let result = await axios.delete("http://localhost:8181/api/v1/blessing/utilisateur/" +iddelete, 
      {headers:{"Content-Type" : "application/json"}});
      console.log(result.data);
    } catch (error) {
      console.error(error.response.data);  
    } 
 
    //window.location.reload();
    getAllUser();
  }
  const nu = ' ';

  return (
    <div>
      <HeadOffline />
      <SideBar />
      <div className="topuser">
        <img style={{ marginLeft:'20px',width: '50px', height: '40px' }} src={imgprofil} alt="produit" />
        Gestion des Utilisateurs
      </div>

      <div className="utiGau">


        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#6E0606' }}>Ajouter un utilisateur</div>
        <p style={{color:'red', float: 'left',marginLeft:'95px', marginTop: '2px', fontSize:'11px' }}>(les champs marqués asterique sont obligatoire)</p>

        <div style={{ float: 'left', marginTop: '-15px', width: '180px' }}>


          <label style={{ marginTop: '25px', marginLeft: '-45px' }}>Nom <span style={{color:'red' }}>*</span></label>
          <input id="inputnom" value={nom ? nom : nu} required type="text" className="form-control" placeholder=""
            style={{ marginTop: '-27px', marginLeft: '145px' }}
            onChange={e => setNom(e.target.value)} />

          <label style={{ marginTop: '15px', marginLeft: '-40px' }}>Matricule <span style={{color:'red' }}>*</span></label>
          <input style={{ marginTop: '-27px', marginLeft: '145px' }} id="inputmatricule" value={matricule ? matricule : nu} type="text" className="form-control" placeholder=""

            onChange={e => setMatricule(e.target.value)} />

      

          <label style={{ marginTop: '15px' }}>Role <span style={{color:'red' }}>*</span></label>
          <div style={{ marginTop: '-27px' }}>
            <select style={{ fontSize: '12px', marginLeft: '145px', height: '35px', width: '180px', border: ' solid #D1D7DC' }} value={role} onChange={e => setRole(e.target.value)}>
            <option style={{ fontSize: '8px' }} value=''>Sélectionner un role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="OPERATEUR">OPERATEUR</option>
              <option value="CLIENT">CLIENT</option>
            </select>
          </div>


          <label style={{ marginTop: '15px' }}>Téléphone</label>
          <input style={{ marginTop: '-27px', marginLeft: '145px' }} id="inputtelephone" value={telephone ? telephone : nu} type="number"
            className="form-control" placeholder=""
            onChange={e => setTelephone(e.target.value)} />


          <label style={{ marginTop: '15px', marginLeft: '-17px' }}>Adresse</label>
          <input id="inputadresse" value={adresse ? adresse : nu} type="text" className="form-control" placeholder=""
            style={{ marginTop: '-27px', marginLeft: '145px' }}
            onChange={e => setAdresse(e.target.value)} />

          <label style={{ marginTop: '15px', marginLeft: '-40px' }}>Email</label>
          <input style={{ marginTop: '-27px', marginLeft: '145px' }} id="inputemail" value={email ? email : nu} type="email"
            className="form-control" placeholder=""
            onChange={e => setEmail(e.target.value)} />

          <label style={{ marginTop: '15px', marginLeft: '-45px' }}>Actif</label>
          <div style={{ marginTop: '-27px' }}>
            <select style={{ fontSize: '12px', marginLeft: '145px', height: '35px', width: '180px', border: ' solid #D1D7DC' }} value={actif} onChange={e => setActif(e.target.value)}>
              <option value="OUI">OUI</option>
              <option value="NON">NON</option>
            </select>
          </div>





          <label style={{ marginTop: '15px', marginLeft: '-54px' }}>CNI</label>
          <input id="inputcni" value={cni ? cni : nu} type="text" className="form-control" placeholder=""
            style={{ marginTop: '-27px', marginLeft: '145px' }}
            onChange={e => setCni(e.target.value)} />

          <label style={{ marginTop: '15px', marginLeft: '-14px' }}>Date Naissance</label>
          <input id="inputcni" value={datenaissance ? datenaissance : nu} type="date" className="form-control" placeholder=""
            style={{ marginTop: '-27px', marginLeft: '145px' }}
            onChange={e => setDatenaissance(e.target.value)} />

          <label style={{ marginTop: '15px', marginLeft: '-54px' }}>Agence</label>
          <input id="inputcni" value={agence ? agence : nu} type="text" className="form-control" placeholder=""
            style={{ marginTop: '-27px', marginLeft: '145px' }}
            onChange={e => setAgence(e.target.value)} />

          <label style={{ marginLeft: '-10px', marginTop: '15px' }}>password <span style={{color:'red' }}>*</span></label>
          <input id="inputpassword" value={password ? password : nu} type="text" className="form-control"
            style={{ marginTop: '-27px', marginLeft: '145px' }}
            onChange={e => setPassword(e.target.value)} />

        </div>


        <div>
          <br /><br /> <br /> <br />
        </div>

        <br /><br /> <br /> <br /><br /><br /> <br /> <br /><br /><br /> <br /> <br />
        <div style={{ marginTop: '117px', marginLeft: '145px' }} >
          <button onClick={signup} style={{ marginLeft: '-95px', marginRight: '65px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistrer </button>

          <button onClick={deleteuser} style={{ border: '1px solid #ACD3F2', marginLeft: '-30px', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimé </button>

        </div>


      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '600px', display: 'inline-block' }}></span>



      <div className="utiDroi">
        {/*        <h5 style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}> Liste des utilisateurs</h5>
        <br /><br /> */}

        {/*<table className="table table-bordered table-striped"> */}
        <Table style={{ marginTop: '0px' }} striped bordered hover variant="danger">
          <thead>
            <tr>

              <th>Nom</th>
              <th>Matricule</th>
              <th>Role</th>
              <th>Agence</th>
              {/* <th>Password</th> */}
              <th>telephone</th>
            </tr>

          </thead>
          <tbody>
            {

              data.map((item) => (

                <tr onClick={() => userInfo(item.id)} key={item.id}>


                  <td>{item.nom}</td>
                  <td>{item.matricule}</td>
                  <td>{item.role}</td>
                  <td>{item.zoneTravail}</td>
                  {/* <td>{item.password}</td> */}
                  <td>{item.telephone}</td>

                  <br /><br />
                </tr>
              ))
            }
          </tbody>
        </Table>






      </div>




      {/*         <br />
      <br />
      <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />  
      <Footer /> */}
    </div>
  )
}

export default Utilisateuradd;