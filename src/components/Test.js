import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import { withRouter } from "react-router-dom";
import Profil from "./Profil";


function Test(props) {


  console.warn("props",props.match.params.profilupdate);

  const [data, setData] = useState([]);
  const [profil, setProfil] = useState('');
  const [ventecomptoir, setVentecomptoir] = useState(false);
  const [dataprofilfiltre, setDataprofilfiltre] = useState([]);
  const [profilupdatearray, setProfilupdatearray] = useState([]);
  const [allsousmenu, setAllsousmenu] = useState([]);
  const [etattransaction, setEtattransaction] = useState(false);

  
  console.warn('a0');

  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }

    /* profilallfiltre();
    AllsousMenu(); */
    console.warn('a');
    getAllSousmenuProfil();
    if(data.includes('Etat des Transactions')==true){
      setEtattransaction(true)

    }

       //recupere les sous menu du profil 

       
/*   async function getAllSousmenuProfil() {
    let res = await fetch("http://maxsalesbackend.com/api/getProfil/"+props.match.params.profilupdate);
    res = await res.json();
    setData(res);
    setProfil(res)
       console.warn(res);
       
       console.warn(res.includes('Etat des Transactions'));
        setEtattransaction(res.includes('Etat des Transactions'))
        console.warn('b');
        console.warn(etattransaction);
        
}; */

  
  }, []);
  function getAllSousmenuProfil(){
  let rese = axios.get('http://maxsalesbackend.com/api/getProfil/' +props.match.params.profilupdate)
        .then((res) => setData(res.data));
    
        console.warn(data);
        console.warn(data.includes('Etat des Transactions'))
        if(data.indexOf('Etat des Transactions') ==  0){
          setEtattransaction(true)
          console.warn(data.indexOf('Etat des Transactions'));
        }
      
        

      };


console.warn(data);
/* if(data.indexOf('Etat desDD Transactions')){
  
  let xx = 'true';
  console.warn(data.indexOf('Client'));
} */
console.warn(data.includes('Etat des Transactions'))
console.warn(etattransaction);

 //recupere les sous menu sans doublons
/*   function AllsousMenu() {
    let res = axios.get("http://maxsalesbackend.com/api/AllProfil")
      .then((res) => setAllsousmenu(res.data));

  }; */

  //recupere les profils sans doublons
/*   function profilallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/profilallfiltre")
      .then((res) => setDataprofilfiltre(res.data));

  };
  console.warn(dataprofilfiltre); */
 

  //recupere tous les sousmenu dun profil
/*   function bbbgetAllSousmenuProfil() {

    let rese = axios.get('http://maxsalesbackend.com/api/getProfil/' + profil)
      .then((res) => setProfilupdatearray(res.data));
      
      console.warn(allsousmenu);

      //setEtattransaction(allsousmenu.includes('Etat des Transactions'))
      
  } */
/*   console.warn(profilupdatearray.includes('Etat des Transactions'));
  console.warn(allsousmenu.includes('Etat des Transactions')); */


 
  const history = useHistory();

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
 // var etattransactionget = profilupdatearray.includes('Etat des Transactions');


  const handleChangeEtattransaction = () => {
    setEtattransaction(!etattransaction);
  };
  const handleChangeVentecomptoir = () => {
    setVentecomptoir(!ventecomptoir);
  };
  async function updateprofil() {
    let item = {
      etattransaction, ventecomptoir, profil
    };

    console.warn(item);

    let result = await fetch('http://maxsalesbackend.com/api/profilupdate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    console.warn(result);
    window.location.reload()
  }
  return (
    <div>
      <HeadOffline />
      <SideBar />
      <div className="profilGauUpdate">

        <h5 style={{ textAlign: 'center', marginTop: '20px' }} >MISE A JOUR DES PROFILS</h5>


        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Modifiez un profil</label>

        <select  style={{ marginTop: '40px', marginRight: '40px', float: 'left', height: '35px', marginLeft: '-155px', width: '180px', borderRadius: '100px', border: ' solid #D1D7DC' }}>
         
          {

              <option value={props.match.params.profilupdate}>{props.match.params.profilupdate}</option>
          }
        </select>

        <div className="ventegauchupdate">
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>vente</span>


          <div>

          
                <Checkbox
                  label="Etat de transactions"
                  value={etattransaction} 
                  onChange={handleChangeEtattransaction} 
                />
                
                 
                
              


            
            <br />


      


          </div>
        </div>  </div>
    </div>
  )
}

export default withRouter(Test);