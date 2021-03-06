import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table, Form, Pagination } from 'react-bootstrap';
import axios from "axios";



const Profil = () => {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [profilinfo, setProfilinfo] = useState([]);

  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [data, setData] = useState([]);
  const [dataprofilfiltre, setDataprofilfiltre] = useState([]);
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
  const [gamme, setGamme] = useState(false);
  const [gererUtilisateu, setGererUtilisateu] = useState(false);
  const [profilUser, setProfilUser] = useState(false);
  const [userdepot, setUserdepot] = useState(false);
  const [ModeEncaissement, setModeEncaissement] = useState(false);
  const [typedoc, setTypedoc] = useState(false);
  const [tarif, setTarif] = useState(false);
  const [tarifprofuit, setTarifprofuit] = useState(false);
  const [motifdepense, setMotifdepense] = useState(false);


  const [rptserveuse, setRptserveuse] = useState(false);
  const [rptgamme, setRptgamme] = useState(false);
  const [rptproduit, setRptproduit] = useState(false);
  const [rptbonus, setRptbonus] = useState(false);
  const [rptbar, setRptbar] = useState(false);
  const [rptetatjournalier, setRptetatjournalier] = useState(false);
  const [rptsituationpersonnel, setRptRptsituationpersonnel] = useState(false);
  const [rptdepensecaisse, setRptdepensecaisse] = useState(false);

  const [showInputbalise, setShowInputbalise] = useState(false);




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


  const handleChangeGamme = () => {
    // setEtattransaction('Etat des Transactions');
    setGamme(!gamme);
  };
  const handleChangeGererUtilisateur = () => {
    // setEtattransaction('Etat des Transactions');
    setGererUtilisateu(!gererUtilisateu);
  };
  const handleChangeProfilUtili = () => {
    // setEtattransaction('Etat des Transactions');
    setProfilUser(!profilUser);
  };
  const handleChangeUtilisateurDepot = () => {
    // setEtattransaction('Etat des Transactions');
    setUserdepot(!userdepot);
  };
  const handleChangeModeEncaissement = () => {
    // setEtattransaction('Etat des Transactions');
    setModeEncaissement(!ModeEncaissement);
  };
  const handleChangeTypdoc = () => {
    // setEtattransaction('Etat des Transactions');
    setTypedoc(!typedoc);
  };
  const handleChangeTarif = () => {
    // setEtattransaction('Etat des Transactions');
    setTarif(!tarif);
  };
  const handleChangeTarifProduit = () => {
    // setEtattransaction('Etat des Transactions');
    setTarifprofuit(!tarifprofuit);
  };
  const handleChangeMotifDepens = () => {
    // setEtattransaction('Etat des Transactions');
    setMotifdepense(!motifdepense);
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
  console.warn(gamme)
  console.warn(gererUtilisateu)
  console.warn(profilUser)
  console.warn(userdepot)
  console.warn(ModeEncaissement)
  console.warn(typedoc)
  console.warn(tarif)
  console.warn(tarifprofuit)
  console.warn(motifdepense)



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

  const getAllProfil = async () => {
    setLoading(true);
    const res = await axios.get("http://maxsalesbackend.com/api/profilall");
    setData(res.data);
    setLoading(false);

  }


  function profilallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/profilallfiltre")
      .then((res) => setDataprofilfiltre(res.data));

  };

  function reset() {
    window.location.reload();
  }


  async function desactiver(id) {
    //console.warn("id " ,id)
    let result = await fetch('http://maxsalesbackend.com/api/deleteProfil/' + id, {
      method: 'DELETE',
    });
    let re = await result.json();
    const dd = re
    console.warn("delete ", re)
    //getAllProfil();
    alert('sous menu supprim?? avec succ??s')
    window.location.reload();
  }


  async function addprofil() {


    let item = {
      etattransaction, ventecomptoir, gestioncredit, encaissement,
      sortiedecaisse, notededebit, etatdecaisse, recouvrement, profil, entresortie, invcree,
      invvalider, consulstock, stockglo, consulinv, depot, client, produit, gamme,
      gererUtilisateu, profilUser, userdepot, ModeEncaissement, typedoc, tarif, tarifprofuit, motifdepense,
      utilisateur, menu, rptserveuse, rptgamme, rptproduit, rptbonus, rptbar, rptetatjournalier,
      rptsituationpersonnel, rptdepensecaisse,
    };

    console.warn(item);

    let result = await fetch('http://maxsalesbackend.com/api/profiladd', {
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
    console.warn(result);
    result = await result.json();
    console.warn(result);

    alert('op??ration effectu??e avec succ??s');
    //history.push("/useradd")
    window.location.reload()

  }

  const showInput = async () => {
    // e.preventDefault();
    if (profil === 'Autre') {
      setShowInputbalise(true)
    }
    if (profil !== 'Autre') {
      setShowInputbalise(false)
    }

    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/getProfilInfo/' + profil);
    setProfilinfo(res.data);
    setLoading(false);


    /*    setLoading(true);
       let rese = axios.get('http://maxsalesbackend.com/api/getProfilInfo/' + profil)
       .then((res) => setProfilinfo(res.data));
       setLoading(false); */

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
  console.warn(profil)
  console.warn(profil.length)

  var disabled = 'false'
  if (!profil) {
    disabled = 'true'
  }
  if (profil == 'Autre') {
    disabled = 'true'
  }
  console.warn(disabled);

  const indexOfLastPropfil = currentPage * postPerPage;
  const indexOfFistPropfil = indexOfLastPropfil - postPerPage;
  const currentPost = profilinfo.slice(indexOfFistPropfil, indexOfLastPropfil);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(profilinfo.length / postPerPage); i++) {
    pageNumber.push(i);
  }


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
        <select id="select" onClick={showInput} style={{ marginTop: '100px', float: 'left', height: '35px', marginLeft: '-145px', width: '180px', borderRadius: '100px', border: ' solid #D1D7DC' }} value={profil} onChange={e => setProfil(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>votre choix</option>

          {
            dataprofilfiltre.map((item) => (

              <option key={item.id} value={item.profil}>{item.profil} </option>

            ))

          }
          <option value="Autre" id="autre">Cr??er un profil</option>
        </select>
        {

          showInputbalise ?
            <span>
              <label style={{ marginTop: '75px', marginLeft: '40px', float: 'left' }}>Nouveau du Profil</label>
              <input type="text" className="form-control"
                style={{ borderRadius: '100px', float: 'left', width: '180px', marginTop: '3px', marginLeft: '15px', fontSize: '13px' }}
                onChange={e => setProfil(e.target.value)} /> </span>
            :
            <span>

              <label style={{ marginTop: '113px', marginBottom: '26px', marginLeft: '80px', float: 'left' }}></label>
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
              label="Entr??es/Sorties"
              value={entresortie}
              onChange={handleChangeEntresortie}
            />
            <br />
            <Checkbox
              label="Inventaire cr????"
              value={invcree}
              onChange={handleChangeInvcree}
            />
            <br />
            <Checkbox
              label="Inventaire valid??"
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


            <br />
            <Checkbox
              label="Gamme"
              value={gamme}
              onChange={handleChangeGamme}
            />
            <br />
            <Checkbox
              label="G??rer les Utilisateurs"
              value={gererUtilisateu}
              onChange={handleChangeGererUtilisateur}
            />
            <br />
            <Checkbox
              label="Profils Utilisateur"
              value={profilUser}
              onChange={handleChangeProfilUtili}
            />
            <br />
            <Checkbox
              label="Utilisateur && Depot"
              value={userdepot}
              onChange={handleChangeUtilisateurDepot}
            />
            <br />
            <Checkbox
              label="Mode Encaissement"
              value={ModeEncaissement}
              onChange={handleChangeModeEncaissement}
            />
            <br />
            <Checkbox
              label="Type Document"
              value={typedoc}
              onChange={handleChangeTypdoc}
            />
            <br />
            <Checkbox
              label="Tarifs"
              value={tarif}
              onChange={handleChangeTarif}
            />
            <br />
            <Checkbox
              label="Tarifs des Produits"
              value={tarifprofuit}
              onChange={handleChangeTarifProduit}
            />

            <br />
            <Checkbox
              label="Motifs des D??penses"
              value={motifdepense}
              onChange={handleChangeMotifDepens}
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
          disabled == 'true' ?

            <button disabled onClick={addprofil} style={{ marginLeft: '45px', marginTop: '0px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enr??gistr?? </button>
            :
            <button onClick={addprofil} style={{ marginLeft: '45px', marginTop: '0px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enr??gistr?? </button>


        }<br /> <br />
        <button onClick={reset} style={{ marginLeft: '10px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '-70px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button>


        {/*         <button style={{ marginLeft: '60px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Modifier </button>
        <button style={{ borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button> */}

      </div>


      <div className="profilDroi">
        {
          profil ?

            //tableshow ?


            <Table striped bordered hover variant="info">
              <thead>
                <tr>
                  <th>N??</th>
                  <th>Profil</th>
                  <th>Menu</th>
                  <th >Sous Menu</th>
                  <th>Actif </th>
                  <th>Action </th>

                </tr>
              </thead>
              <tbody>
                {

                  currentPost.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td style={{ width: '130px' }}>{item.profil}</td>
                      <td>{item.menu}</td>
                      <td style={{ width: '530px' }}>{item.sousmenu}</td>
                      <td>{item.actif}</td>
                      <td><span onClick={() => desactiver(item.id)} className="btdelete" title="cliquez pour desactiver ce sous menu">desactiver</span></td>


                    </tr>

                  ))
                }
              </tbody>
            </Table>
            :
            null

        }

        {
          loading ?
            <h2>Loading......</h2>
            :
            null
        }
        <nav>
          <ul style={{ marginLeft: '200px' }} className='pagination'>
            {
              pageNumber.map(number => (
                <li style={{ marginLeft: '20px' }} key={number} className='page-item'>
                  <a onClick={() => paginate(number)} href='#' className='page-link'>
                    {number}
                  </a>

                </li>
              ))
            }
          </ul>
        </nav>

        {/* 
        {
          tableshow ?
          null
          :
          <div> div profil</div>
          
          
        } */}




      </div>
      <div className="utiBas">

        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="user" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Utilisateurs</a>
        </div>
        <div className="gpepage">
          <img src={"menu.png"} alt="page" />
          <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="menu">Gestion des menus</a></div>

        <div className="gpesite">
          <img src={"depot.png"} alt="site" />

          <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="userdepot">Utilisateur && Depots</a></div>




      </div>

    </div>
  )
}

export default Profil;