import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table, Form, Pagination } from 'react-bootstrap';
import axios from "axios";


function Profil() {

  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [data, setData] = useState([]);
  const [dataprofilfiltre, setDataprofilfiltre] = useState([]);
  const [profilupdate, setProfilupdate] = useState('');
  const [profilupdatearray, setProfilupdatearray] = useState([]);
  const [tableshow, setTableshow] = useState(true);
  const [divprofil, setDivprofil] = useState(false);
  const history = useHistory();

  const [profil, setProfil] = useState('')
  const [etattransaction, setEtattransaction] = useState(false);
  const [ventecomptoir, setVentecomptoir] = useState(false);
  const [gestioncredit, setGestioncredit] = useState(false);

  const [encaissement, setEncaissement] = useState(false);
  const [sortiedecaisse, setSortiedecaisse] = useState(false);
  const [notededebit, setNotededebit] = useState(false);
  const [etatdecaisse, setEtatdecaisse] = useState(false);
  const [recouvrement, setRecouvrement] = useState(false);

  const [entresortie, setEntresortie] = useState(false);
  const [invcree, setInvcree] = useState(false);
  const [invvalider, setInvvalider] = useState(false);
  const [consulstock, setConsulstock] = useState(false);
  const [stockglo, setStockglo] = useState(false);
  const [consulinv, setConsulinv] = useState(false);

  const [depot, setDepot] = useState(false);
  const [client, setClient] = useState(false);
  const [produit, setProduit] = useState(false);
  const [utilisateur, setUtilisateur] = useState(false);
  const [menu, setMenu] = useState(false);


  const [rptserveuse, setRptserveuse] = useState(false);
  const [rptgamme, setRptgamme] = useState(false);
  const [rptproduit, setRptproduit] = useState(false);
  const [rptbonus, setRptbonus] = useState(false);
  const [rptbar, setRptbar] = useState(false);
  const [rptetatjournalier, setRptetatjournalier] = useState(false);
  const [rptsituationpersonnel, setRptRptsituationpersonnel] = useState(false);
  const [rptdepensecaisse, setRptdepensecaisse] = useState(false);

  const [showInputbalise, setShowInputbalise] = useState(false);

  const [profilinfo, setProfilinfo] = useState([]);


  /*   let active = 2;
  //let items = [];
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  } */

  const handleChangeDepot = () => {
    setDepot(!depot);
  };
  const handleChangeClient = () => {
    setClient(!client);
  };
  const handleChangeProduit = () => {
    setProduit(!produit);
  };

  const handleChangeUtilisateur = () => {
    setUtilisateur(!utilisateur);
  };
  const handleChangeMenu = () => {
    setMenu(!menu);
  };

  const handleChangeEntresortie = () => {
    setEntresortie(!entresortie);
  };
  const handleChangeInvcree = () => {
    setInvcree(!invcree);
  };

  const handleChangeInvvalider = () => {
    setInvvalider(!invvalider);
  };
  const handleChangeConsulstock = () => {
    setConsulstock(!consulstock);
  };
  const handleChangeStockglo = () => {
    setStockglo(!stockglo);
  };
  const handleChangeConsulinv = () => {
    setConsulinv(!consulinv);
  };
  const handleChangeEtattransaction = () => {
    // setEtattransaction('Etat des Transactions');
    setEtattransaction(!etattransaction);
  };

  const handleChangeVentecomptoir = () => {
    setVentecomptoir(!ventecomptoir);
  };

  const handleChangeGestioncredit = () => {
    setGestioncredit(!gestioncredit);
  };

  const handleChangeEncaissement = () => {
    // setEtattransaction('Etat des Transactions');
    setEncaissement(!encaissement);
  };

  const handleChangeSortiedecaisse = () => {
    setSortiedecaisse(!sortiedecaisse);
  };

  const handleChangeNotededebit = () => {
    setNotededebit(!notededebit);
  };

  const handleChangeEtatdecaisse = () => {
    setEtatdecaisse(!etatdecaisse);
  };

  const handleChangeRecouvrement = () => {
    setRecouvrement(!recouvrement);
  };


  const handleChangeRptserveuse = () => {
    setRptserveuse(!rptserveuse);
  };
  const handleChangeRptgamme = () => {
    setRptgamme(!rptgamme);
  };
  const handleChangeRptproduit = () => {
    setRptproduit(!rptproduit);
  };
  const handleChangeRptbonus = () => {
    setRptbonus(!rptbonus);
  };
  const handleChangeRptbar = () => {
    setRptbar(!rptbar);
  };
  const handleChangeRptetatjournalier = () => {
    setRptetatjournalier(!rptetatjournalier);
  };
  const handleChangeRptsituationpersonnel = () => {
    setRptRptsituationpersonnel(!rptsituationpersonnel);
  };
  const handleChangeRptdepensecaisse = () => {
    setRptdepensecaisse(!rptdepensecaisse);
  };

 

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

 


  console.warn(etattransaction)

  console.warn(ventecomptoir)
  console.warn(gestioncredit)
  console.warn(encaissement)
  console.warn(sortiedecaisse)
  console.warn(notededebit)
  console.warn(etatdecaisse)
  console.warn(recouvrement)

  console.warn(entresortie)
  console.warn(invcree)
  console.warn(invvalider)
  console.warn(consulstock)
  console.warn(stockglo)
  console.warn(consulinv)

  console.warn(depot)
  console.warn(client)
  console.warn(produit)
  console.warn(utilisateur)
  console.warn(menu)



  console.warn(rptserveuse)
  console.warn(rptgamme)
  console.warn(rptproduit)
  console.warn(rptbonus)
  console.warn(rptbar)
  console.warn(rptetatjournalier)
  console.warn(rptsituationpersonnel)
  console.warn(rptdepensecaisse)

  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }
    // setDepotbd("bar10");
    getAllProfil();
    profilallfiltre();//recupere les types de profils sans doublons

  }, []);

  function getAllProfil() {
    let res = axios.get("http://maxsalesbackend.com/api/profilall")
      .then((res) => setData(res.data));
  };

  function profilallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/profilallfiltre")
      .then((res) => setDataprofilfiltre(res.data));

  };

  function reset() {
    window.location.reload();
  }


  async function deleteoperation(id) {
    //console.warn("id " ,id)
    let result = await fetch('http://maxsalesbackend.com/api/deleteProfil/' + id, {
      method: 'DELETE',
    });
    let re = await result.json();
    const dd = re
    console.warn("delete ", re)
    getAllProfil();
  }


  async function addprofil() {


    let item = {
      etattransaction, ventecomptoir, gestioncredit, encaissement,
      sortiedecaisse, notededebit, etatdecaisse, recouvrement, profil, entresortie, invcree,
      invvalider, consulstock, stockglo, consulinv, depot, client, produit,
      utilisateur, menu, rptserveuse, rptgamme, rptproduit, rptbonus, rptbar, rptetatjournalier,
      rptsituationpersonnel, rptdepensecaisse,profilupdate
    };

    console.warn(item);

     /*  let result = await fetch('http://maxsalesbackend.com/api/profiladd', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(item)
        /*    body: JSON.stringify(
             {
               etattransaction
             }
           ) */
     /* });
      result = await result.json();
      console.warn(result); */

     // alert('opération effectuée avec succès');
      //history.push("/useradd")
      //window.location.reload()
    
  }

  function showInput() {

    if (profilupdate === 'Autre') {
      //console.warn(profilupdate);
      setShowInputbalise(true)
    }
    if (profilupdate !== 'Autre') {
      setShowInputbalise(false)
    }

    let rese = axios.get('http://maxsalesbackend.com/api/getProfilInfo/' + profilupdate)
    .then((res) => setProfilinfo(res.data));

    /*  var doc = document.getElementById("select");
     var val = doc.options[doc.selectedIndex].value;
     var input = document.getElementById("inpuTxt");
 
     if (val == "Autre") {
         input.style.display = "block";
 
 
     }
     else {
         input.style.display = "none";
     } */


  }

  console.warn(showInputbalise)
  console.warn(profilupdate)
  console.warn(profil)
  console.warn(profil.length)
  console.warn(!profilupdate && profil.length==0);
var disabled = 'false'
  if(!profil && !profilupdate){
    disabled = 'true'
  }
  if(profil.length==0 && profilupdate=='Autre'){
    disabled = 'true'
  }
  console.warn(disabled);



  return (
    <div>
      <HeadOffline />
      <SideBar />
      <div className="topgamme">
        <img style={{ height: '40px', marginRight: '5px' }} src={"profil.png"} alt="produit" />
        Gestion des profils
      </div>

      <div className="profilGau">

        <label style={{ marginTop: '75px', marginLeft: '80px', float: 'left' }}>Nom du Profil</label>
      {/*   <input required type="text" className="form-control"
          style={{ borderRadius: '100px', float: 'left', marginRight: '35px', width: '180px', marginTop: '100px', marginLeft: '-145px', fontSize: '13px' }}
          onChange={e => setProfil(e.target.value)} />
 */}
<select id="select" onClick={showInput} style={{ marginTop: '100px', float: 'left', height: '35px', marginLeft: '-145px', width: '180px', borderRadius: '100px', border: ' solid #D1D7DC' }} value={profilupdate} onChange={e => setProfilupdate(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionnerg un profil</option>

          {
            dataprofilfiltre.map((item) => (

              <option key={item.id} value={item.profil}>{item.profil} </option>

            ))

          }
          <option value="Autre" id="autre">Créer un profil</option>
        </select>
        {

          showInputbalise ?
          <span>
          <label style={{ marginTop: '75px', marginLeft: '40px', float: 'left' }}>Nouveau du Profil</label>
          <input  type="text" className="form-control"
          style={{ borderRadius: '100px', float: 'left', width: '180px', marginTop: '3px', marginLeft: '15px', fontSize: '13px' }}
          onChange={e => setProfilupdate(e.target.value)} /> </span>
            :
            <span>
              
          <label style={{ marginTop: '113px',marginBottom: '26px', marginLeft: '80px', float: 'left' }}></label>
            </span>
        }

        <div style={{ marginTop: '20px' }}>
          {/* <a href="profileupdate" style={{ textDecoration: 'none', marginLeft: '10px', borderRadius: '70px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '70px', width: '390px', backgroundColor: '#E9F2FF' }} >Modifiez un profil</a> */}
        </div>

        <div className="ventegauch">
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>vente</span>


          <div>
            <Checkbox
              label="Etat de transactions"
              value={etattransaction}
              onChange={handleChangeEtattransaction}
            />
            <br />
            <Checkbox
              label="Vente Comptoir"
              value={ventecomptoir}
              onChange={handleChangeVentecomptoir}
            />
            <br />
            <Checkbox
              label="Gestion des credits"
              value={gestioncredit}
              onChange={handleChangeGestioncredit}
            />
          </div>

        </div>

        <div className="caissedroit">
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>CAISSE</span>

          <div>
            <Checkbox
              label="Encaissement"
              value={encaissement}
              onChange={handleChangeEncaissement}
            />
            <br />

            <Checkbox
              label="Sortie de Caissse"
              value={sortiedecaisse}
              onChange={handleChangeSortiedecaisse}
            />
            <Checkbox
              label="Note de Debit"
              value={notededebit}
              onChange={handleChangeNotededebit}
            />
            <br />
            <Checkbox
              label="Etat de Caisse"
              value={etatdecaisse}
              onChange={handleChangeEtatdecaisse}
            />
            <br />
            <Checkbox
              label="Recouvrement"
              value={recouvrement}
              onChange={handleChangeRecouvrement}
            />
            {/*  <Checkbox
              label="Value 2"
              value={checkedTwo}
              onChange={handleChangeTwo}
            /> */}
          </div>


        </div>

        <div className="stockgauche">

          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>Stock</span>
          <div>
            <Checkbox
              label="Entrées/Sorties"
              value={entresortie}
              onChange={handleChangeEntresortie}
            />
            <br />
            <Checkbox
              label="Inventaire créé"
              value={invcree}
              onChange={handleChangeInvcree}
            />
            <br />
            <Checkbox
              label="Inventaire validé"
              value={invvalider}
              onChange={handleChangeInvvalider}
            />
            <br />
            <Checkbox
              label="Consultation stock"
              value={consulstock}
              onChange={handleChangeConsulstock}
            />
            <br />
            <Checkbox
              label="Stock Global"
              value={stockglo}
              onChange={handleChangeStockglo}
            />
            <br />
            <Checkbox
              label="Consultation inventaire"
              value={consulinv}
              onChange={handleChangeConsulinv}
            />


          </div>

        </div>

        <div className="parametredroit">

          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>PARAMETRES</span>

          <div>
            <Checkbox
              label="Depots"
              value={depot}
              onChange={handleChangeDepot}
            />
            <br />

            <Checkbox
              label="Clients"
              value={client}
              onChange={handleChangeClient}
            /><br />
            <Checkbox
              label="Produit"
              value={produit}
              onChange={handleChangeProduit}
            />
            <br />
            <Checkbox
              label="Utilisateurs"
              value={utilisateur}
              onChange={handleChangeUtilisateur}
            />
            <br />
            <Checkbox
              label="Menu"
              value={menu}
              onChange={handleChangeMenu}
            />

          </div>


        </div>

        <div className="rapportdroit">

          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>RAPPORT</span>

          <div>
            <Checkbox
              label="Serveuse"
              value={rptserveuse}
              onChange={handleChangeRptserveuse}
            />
            <br />

            <Checkbox
              label="Gamme"
              value={rptgamme}
              onChange={handleChangeRptgamme}
            /><br />
            <Checkbox
              label="Produit"
              value={rptproduit}
              onChange={handleChangeRptproduit}
            />
            <br />
            <Checkbox
              label="Bonus"
              value={rptbonus}
              onChange={handleChangeRptbonus}
            />
            <br />
            <Checkbox
              label="Bar"
              value={rptbar}
              onChange={handleChangeRptbar}
            />
            <br />

            <Checkbox
              label="Etat journalier"
              value={rptetatjournalier}
              onChange={handleChangeRptetatjournalier}
            />
            <br />
            <Checkbox
              label="Situation du Personnel"
              value={rptsituationpersonnel}
              onChange={handleChangeRptsituationpersonnel}
            />
            <br />
            <Checkbox
              label="Depense du Bar"
              value={rptdepensecaisse}
              onChange={handleChangeRptdepensecaisse}
            />

          </div>



        </div>

        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <button style={{ marginTop: '80px', borderRadius: '100px', marginRight: '30px', border: '1px solid white', width: '100px', backgroundColor: 'white' }} > </button>
        {
         disabled =='true'?
                  
                  <button disabled onClick={addprofil} style={{ marginLeft: '90px', marginTop: '40px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
                  :
                  <button   onClick={addprofil} style={{ marginLeft: '90px', marginTop: '40px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>


        }
        <button onClick={reset} style={{ marginLeft: '10px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '-70px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button>


        {/*         <button style={{ marginLeft: '60px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Modifier </button>
        <button style={{ borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button> */}

      </div>


      <div className="profilDroi">
        {
          profilupdate ?

            //tableshow ?


            <Table striped bordered hover variant="info">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Profil</th>
                  <th>Menu</th>
                  <th >Sous Menu</th>
                  <th>Actif </th>
                  <th>Action </th>

                </tr>
              </thead>
              <tbody>
                {

                  profilinfo.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td style={{ width: '130px' }}>{item.profil}</td>
                      <td>{item.menu}</td>
                      <td style={{ width: '530px' }}>{item.sousmenu}</td>
                      <td>{item.actif}</td>
                      <td><span onClick={() => deleteoperation(item.id)} className="btdelete" title="cliquez pour supprimer ce sous menu">delete</span></td>


                    </tr>

                  ))
                }
              </tbody>
            </Table>
            :
            null

        }
        {/* 
        {
          tableshow ?
          null
          :
          <div> div profil</div>
          
          
        } */}

      


      </div>

    </div>
  )
}

export default Profil;