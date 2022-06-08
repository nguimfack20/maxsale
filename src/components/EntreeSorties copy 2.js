import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios, { Axios } from "axios";
import { Table } from "react-bootstrap";


function EntreeSorties() {
  const [user, setUser] = useState([]);
  const [tabcodedepottransaction, setTabcodedepottransaction] = useState([]);
  const [datacodedepotTransaction, setDatacodedepotTransaction] = useState([]);

  const [btnValidez, setBtnValidez] = useState(false);
  const [filcodedepot, setFilcodedepot] = useState('');
  const [filtransaction, setFiltransaction] = useState('');
  const [codedepot, setCodedepot] = useState('');
  const [libelleProd, setLibelleProd] = useState('');
  const [quantite, setQuantite] = useState('');
  const [codegamme, setCodegamme] = useState('');
  const [prix, setPrix] = useState('');
  const [total, setTotal] = useState('');
  const [datacodedepotfiltre, setDatacodedepotfiltre] = useState([]);
  const [typetransaction, setTypetransaction] = useState([]);
  const [produittab, setProduittab] = useState([]);
  const [codProd, setCodeprod] = useState([]);
  const [transaction, setTransaction] = useState();
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

    getAlldepot();

    getAlldepotfil();

    getAllTypetransation();

    getAllTypetransationfil();


    getAllproduit();

    getEnstreSortieTempo();





  }, []);

  const getAlldepot = async () => {

    let res = axios.get("http://maxsalesbackend.com/api/codedepotallES")
      .then((res) => setDatacodedepotfiltre(res.data));

  }
  const getAlldepotfil = async () => {

    let res = axios.get("http://maxsalesbackend.com/api/codedepotallES")
      .then((res) => setDatacodedepotfiltre(res.data));

  }


  const getEnstreSortieTempo = async () => {

    //let res = axios.get('http://maxsalesbackend.com/api/getEnstreSortieTempo/' +codedepot)
    let res = axios.get('http://maxsalesbackend.com/api/getEnstreSortieTempo')
      .then((res) => setData(res.data));

  }

  const getAllTypetransation = async () => {

    let res = axios.get("http://maxsalesbackend.com/api/transactionAll")
      .then((res) => setTypetransaction(res.data));

  }


  const getAllTypetransationfil = async () => {

    let res = axios.get("http://maxsalesbackend.com/api/transactionAll")
      .then((res) => setTypetransaction(res.data));

  }

  const getAllproduit = async (codeproduit) => {

    let res = axios.get("http://maxsalesbackend.com/api/produitAllES")
      .then((res) => setProduittab(res.data));



    produittab.forEach(element => {
      if (element.codProd === codeproduit) {
        setLibelleProd(element.libelleprod);
        setCodegamme(element.codegamme);
      }

    });

  }

  const OperationInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodedepot(element.codedepot);
        setCodeprod(element.codProd);
        setTransaction(element.typeope);
        setLibelleProd(element.libelleProd);
        setPrix(element.prix);
        setQuantite(element.qte);
        setTotal(element.total);
        setIddelete(element.id);

        //alert(iddelete)


      }


    });

  }


  // console.warn(total);
  const ajouter = async () => {
    let matricule = 'rodeo';
    //setTotal(prix * quantite);
    let item = { codedepot, codegamme, codProd, libelleProd, transaction, quantite, prix, matricule, total }

    let qte = prix * quantite;
    setTotal(qte);

    console.warn(prix * quantite);
    console.warn(item);
    let result = await fetch('http://maxsalesbackend.com/api/opertempoadd', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    });
    let res = await result.json();
    console.warn(res);
    alert('Opération réalisée avec succès')
    window.location.reload();

  }


  const Recherchez = async () => {
    let matricule = 'rodeo';
    let item = { filcodedepot, filtransaction };



    if (filcodedepot == '') {
      alert('svp veuillez selectionner un depot pour filtrer la recherche ')
      setBtnValidez(false);
    }
    if (filtransaction == '') {
      alert('svp veuillez selectionner une transaction pour filtrer la recherche ')
      setBtnValidez(false);
    }


    //let tab=[];
    if (filcodedepot !== '' && filtransaction !== '') {
    /*   setTabcodedepottransaction([])
      data.forEach(element => {
        if (element.codedepot == filcodedepot && element.typeope == filtransaction) {
          tabcodedepottransaction.push(element);
        }

      }); */

     // const res = await fetch('http://maxsalesbackend.com/api/entresortiegetdepotTransanction/'+filcodedepot+'/'+filtransaction);
      const res = await axios.get('http://maxsalesbackend.com/api/entresortiegetdepotTransanction/'+filcodedepot+'/'+filtransaction);
       

       //const result = await res.json();
      //  setDatacodedepotTransaction(res)
      let resul = res.data

       console.log(res)
       console.log(res.data)
       console.log(datacodedepotTransaction)
       setDatacodedepotTransaction(res.data)
       console.log(datacodedepotTransaction)
       console.log(resul)
       setDatacodedepotTransaction(resul)


      setBtnValidez(true);
    }
    console.log(item);
    console.log(datacodedepotTransaction);
    //console.log(datacodedepotTransaction)
    //setTotal(prix * quantite);
    /*     let item = { codedepot, codegamme, codProd, libelleProd, transaction, quantite, prix, matricule, total }
    
        let qte = prix * quantite;
        setTotal(qte);
    
        console.warn(prix * quantite);
        console.warn(item);
        let result = await fetch('http://maxsalesbackend.com/api/opertempoadd', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        let res = await result.json();
        console.warn(res);
        alert('Opération réalisée avec succès')
        window.location.reload(); */

  }



  console.log(tabcodedepottransaction);


  const supprimer = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/opertempodelete/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    alert(re.message)
    window.location.reload();

  }
  const nu = ' ';

  return (
    <div>
      <HeadOffline />
      <SideBar depotbd={depotbd} />
      <div className="topuser">
        <img style={{ width: '30px', height: '30px' }} src={"flechehaut.png"} alt="produit" />
        <img style={{ width: '30px', height: '30px' }} src={"flechebas.png"} alt="produit" />
        Opérations Entrées / Sorties
      </div>

      <div className="utiGau">


        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}>Ajouter une Entrée/Sortie</div>

        <div style={{ float: 'left', marginTop: '5px', width: '180px' }}>

          <label style={{ marginTop: '15px', marginLeft: '-95px' }}>Depot</label>

          <div style={{ marginTop: '-20px' }}>
            <select onClick={() => getAlldepot(codedepot)} style={{ marginLeft: '165px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={codedepot}
              onChange={e => setCodedepot(e.target.value)}>
              <option style={{ fontSize: '11px' }} value=''>Sélectionner un depot</option>
              {
                datacodedepotfiltre.map((item) => (

                  <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

                ))

              }
            </select>

          </div>




          <label style={{ marginTop: '15px', marginLeft: '-6px' }}>Type Transaction</label>

          <div style={{ marginTop: '-22px' }}>
            <select onClick={() => getAllTypetransation(transaction)} style={{ marginLeft: '165px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={transaction}
              onChange={e => setTransaction(e.target.value)}>
              <option style={{ fontSize: '11px' }} value=''>Sélectionner un type</option>
              {
                typetransaction.map((item) => (

                  <option key={item.id} value={item.codetype}>{item.codetype} </option>

                ))

              }
            </select>

          </div>


          <label style={{ marginTop: '15px', marginLeft: '-34px' }}>Code produit</label>

          <div style={{ marginTop: '-20px' }}>
            <select onClick={() => getAllproduit(codProd)} style={{ marginLeft: '165px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={codProd}
              onChange={e => setCodeprod(e.target.value)}>
              <option style={{ fontSize: '11px' }} value=''>Sélectionner un produit</option>
              {
                produittab.map((item) => (

                  <option key={item.id} value={item.codProd}>{item.codProd} </option>



                ))

              }
            </select>

          </div>



          <label style={{ marginTop: '25px', marginLeft: '-29px' }}>Libelle produit</label>
          <input disabled value={libelleProd ? libelleProd : nu} required type="text" className="form-control" placeholder=""
            style={{ marginTop: '-27px', fontSize: '11px', marginLeft: '165px', width: '150px' }}
            onChange={e => setLibelleProd(e.target.value)} />


          <label style={{ marginTop: '15px', marginLeft: '-70px' }}>Quantité</label>
          <input value={quantite ? quantite : quantite} style={{ fontSize: '12px', marginTop: '-27px', width: '150px', marginLeft: '165px' }} id="inputtelephone" type="number"
            className="form-control" placeholder=""
            onChange={e => setQuantite(e.target.value)} />


          <label style={{ marginTop: '15px', marginLeft: '-45px' }}>Prix unitaire</label>
          <input value={prix ? prix : nu} type="number" className="form-control" placeholder=""
            style={{ marginTop: '-27px', fontSize: '12px', width: '150px', marginLeft: '165px' }}
            onChange={e => setPrix(e.target.value)} />


          <label style={{ marginTop: '15px', marginLeft: '-100px' }}>Total</label>
          <input value={prix * quantite} type="number" disabled className="form-control" placeholder=""
            style={{ marginTop: '-27px', fontSize: '12px', width: '150px', marginLeft: '165px' }}
            onChange={e => setTotal(e.target.value)} />


        </div>


        <div>

        </div>

        <br /><br /> <br /> <br /><br /><br /> <br /> <br /><br />
        <div style={{ marginTop: '157px', marginLeft: '145px' }} >
          <button onClick={ajouter} style={{ marginLeft: '-115px', marginRight: '65px', border: '1px solid #ACD3F2', width: '160px', backgroundColor: '#E9F2FF' }} >ajoutez en attente </button>

          <button onClick={supprimer} style={{ border: '1px solid #ACD3F2', marginLeft: '-30px', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimé </button>

        </div>


      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '600px', display: 'inline-block' }}></span>



      <div className="utiDroi">
        <h5 style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}> Entrée / Sortie en attente (non validées)</h5>
        <br />

        <div style={{ marginLeft: '100px', border: '1px solid white', width: '200px', height: '100px' }}>
          <label style={{ marginTop: '0px', marginLeft: '0px' }}>filtre:</label>



          <select onClick={() => getAlldepotfil(filcodedepot)} style={{ marginLeft: '0px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={filcodedepot}
            onChange={e => setFilcodedepot(e.target.value)}>
            <option style={{ fontSize: '11px' }} value=''>filtrer par depot</option>
            {
              datacodedepotfiltre.map((item) => (

                <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

              ))

            }
          </select>




          <select onClick={() => getAllTypetransationfil(filtransaction)} style={{ marginTop: '15px', marginLeft: '40px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={filtransaction}
            onChange={e => setFiltransaction(e.target.value)}>
            <option style={{ fontSize: '11px' }} value=''>Sélectionner un type</option>
            {
              typetransaction.map((item) => (

                <option key={item.id} value={item.codetype}>{item.codetype} </option>

              ))

            }
          </select>



        </div>

        <div style={{ border: '1px solid white', width: '130px', marginLeft: '300px', marginTop: '-80px' }}>
          <button onClick={() => Recherchez()} style={{ border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Recherchez </button>

        </div>

        <br />

        {/*<table className="table table-bordered table-striped"> */}
        <Table style={{ marginTop: '0px' }} striped bordered hover variant="info">
          <thead>
            <tr>

              <th>Code depot</th>
              <th>Opération</th>
              <th>Code</th>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Total</th>

            </tr>

          </thead>
          <tbody>
            {

              tabcodedepottransaction.map((item) => (

                <tr onClick={() => OperationInfo(item.id)} key={item.id}>


                  <td>{item.codedepot}</td>
                  <td>{item.typeope}</td>
                  <td>{item.codProd}</td>
                  <td>{item.libelleProd}</td>
                  <td>{item.qte}</td>
                  <td>{item.prix}</td>
                  <td>{item.total}</td>


                  <br /><br />
                </tr>
              ))

              /*    data.map((item) => (
   
                   <tr onClick={() => OperationInfo(item.id)} key={item.id}>
   
   
                     <td>{item.codedepot}</td>
                     <td>{item.typeope}</td>
                     <td>{item.codProd}</td>
                     <td>{item.libelleProd}</td>
                     <td>{item.qte}</td>
                     <td>{item.prix}</td>
                     <td>{item.total}</td>
   
   
                     <br /><br />
                   </tr>
                 )) */
            }
          </tbody>
        </Table>
        {btnValidez === true ?
          <button onClick={ajouter} style={{ marginLeft: '40px', marginRight: '65px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Validez </button>
          :
          <button onClick={ajouter} disabled style={{ marginLeft: '40px', marginRight: '65px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Validez </button>

        }
      </div>

    </div>
  )
}

export default EntreeSorties;