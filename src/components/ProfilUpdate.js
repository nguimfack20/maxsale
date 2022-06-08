import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";


function ProfilUpdate() {

  const [data, setData] = useState([]);

  const [profil, setProfil] = useState('');
 
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

  const [dataprofilfiltre, setDataprofilfiltre] = useState([]);
  const [profilupdatearray, setProfilupdatearray] = useState([]);



  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }

    profilallfiltre();


  }, []);

    //recupere les profils sans doublons
    function profilallfiltre() {
      let res = axios.get("http://maxsalesbackend.com/api/profilallfiltre")
        .then((res) => setDataprofilfiltre(res.data));
  
    };
  
    //recupere tous les sousmenu dun profil
    function getAllSousmenuProfil() {
  
      let rese = axios.get('http://maxsalesbackend.com/api/getProfil/' + profil)
        .then((res) => setProfilupdatearray(res.data));
       
  
    }

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
  const history = useHistory();




  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };




  var etattransactionget = profilupdatearray.includes('Etat des Transactions')
  var ventecomptoirget = profilupdatearray.includes('Vente Comptoir')
  var gestioncreditget = profilupdatearray.includes('Gestion Credit')
  var encaissementget = profilupdatearray.includes('Encaissement')
  var sortiedecaisseget = profilupdatearray.includes('Sortie de Caisse')
  var notededebitget = profilupdatearray.includes('Note de Debit')
  var etatdecaisseget = profilupdatearray.includes('Etat de Caisse')
  var recouvrementget = profilupdatearray.includes('Recouvrement')
  var depotget = profilupdatearray.includes('Depot')
  var clientget = profilupdatearray.includes('Client')
  var produitget = profilupdatearray.includes('Produit')
  var utilisateurget = profilupdatearray.includes('Utilisateur')
  var menuget = profilupdatearray.includes('Menu')


  
  console.warn(profilupdatearray)
  console.warn(etattransactionget)
  const [etattransaction, setEtattransaction] = useState(etattransactionget);
  console.warn(etattransaction)
  console.warn(ventecomptoirget)
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



  console.log(etattransactionget);
  console.warn(etattransaction)
  async function updateprofil() {
    let item = {
      etattransaction, ventecomptoir, gestioncredit, encaissement,
      sortiedecaisse, notededebit, etatdecaisse, recouvrement, profil, entresortie, invcree, invvalider, consulstock, stockglo, consulinv, depot, client, produit,
      utilisateur, menu, rptserveuse, rptgamme, rptproduit, rptbonus, rptbar, rptetatjournalier,
      rptsituationpersonnel, rptdepensecaisse
    };

    console.warn(item);


    let result = await fetch('http://maxsalesbackend.com/api/profilupdate', {
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
    });
    result = await result.json();
    console.warn(result);

    alert('Mise à jour du profil avec succès');
    //history.push("/useradd")
    window.location.reload()
  }





  return (
    <div>
      <HeadOffline />
      <SideBar />
      <div className="profilGauUpdate">

        <h5 style={{ textAlign: 'center', marginTop: '20px' }} >MISE A JOUR DES PROFILS</h5>


        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Modifiez un profil</label>

        <select onClick={getAllSousmenuProfil} style={{ marginTop: '40px', marginRight: '40px', float: 'left', height: '35px', marginLeft: '-155px', width: '180px', borderRadius: '100px', border: ' solid #D1D7DC' }} value={profil} onChange={e => setProfil(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionner un profil</option>
          {

            dataprofilfiltre.map((item) => (

              <option key={item.id} value={item.profil}>{item.profil}</option>

            ))

          }
        </select>

        <div className="ventegauchupdate">
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>vente</span>


          <div>

            {
              etattransactionget ?
                <Checkbox
                  label="Etat de transactions"
                  value={etattransaction}
                  onChange={handleChangeEtattransaction} id="et1"
                />
                :
                <Checkbox
                  label="Etat de transactions"
                  value={!etattransaction}
                  onChange={handleChangeEtattransaction} id="et2"
                />


            }
            <br />


            {
              ventecomptoirget ?

                <Checkbox
                  label="Vente Comptoir"
                  value={!ventecomptoir}
                  onChange={handleChangeVentecomptoir}
                />
                :
                <Checkbox
                  label="Vente Comptoir"
                  value={ventecomptoir}
                  onChange={handleChangeVentecomptoir}
                />
            }
            <br />


            {
              gestioncreditget ?
                <Checkbox
                  label="Gestion des credits"
                  value={!gestioncredit}
                  onChange={handleChangeGestioncredit}
                />
                :
                <Checkbox
                  label="Gestion des credits"
                  value={gestioncredit}
                  onChange={handleChangeGestioncredit}
                />
            }
          </div>



        </div>

        <div className="caissedroitupdate">
          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>CAISSE</span>

          <div>

            {
              encaissementget ?
                <Checkbox
                  label="Encaissement"
                  value={!encaissement}
                  onChange={handleChangeEncaissement}
                />
                :
                <Checkbox
                  label="Encaissement"
                  value={encaissement}
                  onChange={handleChangeEncaissement}
                />
            }

            <br />
            {
              sortiedecaisseget ?
                <Checkbox
                  label="Sortie de Caissse"
                  value={!sortiedecaisse}
                  onChange={handleChangeSortiedecaisse}
                />
                :
                <Checkbox
                  label="Sortie de Caissse"
                  value={sortiedecaisse}
                  onChange={handleChangeSortiedecaisse}
                />
            }
            <br />

            {
              notededebitget ?
                <Checkbox
                  label="Note de Debit"
                  value={!notededebit}
                  onChange={handleChangeNotededebit}
                />
                :
                <Checkbox
                  label="Note de Debit"
                  value={notededebit}
                  onChange={handleChangeNotededebit}
                />
            }

            <br />
            {
              etatdecaisseget ?
                <Checkbox
                  label="Etat de Caisse"
                  value={!etatdecaisse}
                  onChange={handleChangeEtatdecaisse}
                />
                :
                <Checkbox
                  label="Etat de Caisse"
                  value={etatdecaisse}
                  onChange={handleChangeEtatdecaisse}
                />
            }

            <br />
            {
              recouvrementget ?
                <Checkbox
                  label="Recouvrement"
                  value={!recouvrement}
                  onChange={handleChangeRecouvrement}
                />
                :
                <Checkbox
                  label="Recouvrement"
                  value={recouvrement}
                  onChange={handleChangeRecouvrement}
                />
            }


          </div>


        </div>

        <div className="stockgauche">

          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>Stock</span>
          <div>


            {
              entresortie ?
                <Checkbox
                  label="Entrées/Sorties"
                  value={!entresortie}
                  onChange={handleChangeEntresortie}
                />
                :
                <Checkbox
                  label="Entrées/Sorties"
                  value={entresortie}
                  onChange={handleChangeEntresortie}
                />
            }
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

        <div className="parametredroitupdate">

          <span style={{ fontSize: '22px', fontWeight: 'bold' }}>PARAMETRES</span>

          <div>

            {
              depotget ?
                <Checkbox
                  label="Depots"
                  value={!depot}
                  onChange={handleChangeDepot}
                />
                :
                <Checkbox
                  label="Depots"
                  value={depot}
                  onChange={handleChangeDepot}
                />

            }

            <br />

            {
              clientget ?
                <Checkbox
                  label="Clients"
                  value={!client}
                  onChange={handleChangeClient}
                />
                :
                <Checkbox
                  label="Clients"
                  value={client}
                  onChange={handleChangeClient}
                />

            }

            <br />

            {
              produitget ?
                <Checkbox
                  label="Produit"
                  value={!produit}
                  onChange={handleChangeProduit}
                />
                :
                <Checkbox
                  label="Produit"
                  value={produit}
                  onChange={handleChangeProduit}
                />

            }

            <br />

            {
              utilisateurget ?
                <Checkbox
                  label="Utilisateurs"
                  value={!utilisateur}
                  onChange={handleChangeUtilisateur}
                />
                :
                <Checkbox
                  label="Utilisateurs"
                  value={utilisateur}
                  onChange={handleChangeUtilisateur}
                />

            }

            <br />
            {
              menuget ?
                <Checkbox
                  label="Menu"
                  value={!menu}
                  onChange={handleChangeMenu}
                />
                :
                <Checkbox
                  label="Menu"
                  value={menu}
                  onChange={handleChangeMenu}
                />

            }


          </div>


        </div>

        <div className="rapportdroitupdate">

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

        <br /> <br /><br /> <br />
        {/*         <button onClick={selectAll} style={{ marginTop: '40px', marginLeft: '60px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Tout coché </button>
        <button style={{ marginLeft: '90px', borderRadius: '100px', border: '1px solid #ACD3F2', width: '130px', backgroundColor: '#E9F2FF' }} >Tout décoché </button> */}

        <button onClick={updateprofil} style={{ borderRadius: '100px', marginTop: '30px', marginLeft: '390px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>

      </div>


      {/*       function selectAll() {

if (!ventecomptoirget) {
  setVentecomptoir(true)
}



if (!gestioncreditget) {
  setGestioncredit(true)
}

if (!encaissementget) {
  setEncaissement(true)
}
if (!etatdecaisseget) {
  setEtatdecaisse(true)
}
if (!sortiedecaisseget) {
  setSortiedecaisse(true)
}
if (!notededebitget) {
  setNotededebit(true)
}
if (!recouvrementget) {
  setRecouvrement(true)
}

if (!clientget) {
  setClient(true)
}
if (!produitget) {
  setProduit(true)
}
if (!depotget) {
  setDepot(true)
}
if(!utilisateurget){
setUtilisateur(true)
}
if(!menuget){
  setMenu(true)
}

setEntresortie(true)
setConsulinv(true)
setStockglo(true)
setInvcree(true)
setInvvalider(true)




} */}

    </div>
  )
}

export default ProfilUpdate;