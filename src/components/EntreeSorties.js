import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios, { Axios } from "axios";
import { Table } from "react-bootstrap";

class EntreeSorties extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentPage: 1,
      postPerPage: 10,
      codegamme: "",
      datacodedepotfiltre: [],
      ecartbd: [],
      codedepot: "",
      filcodedepot: "",
      filtransaction: "",
      codProd: "",
      matricule: localStorage.getItem('usermat'),
      libelleProd: "",
      quantite: "",
      codegamme: "",
      nu: "",
      iddelete: "",
      prix: "",
      total: "",
      datacodedepotfiltre: [],
      typetransaction: [],
      data: [],
      produittab: [],
      tabcodedepottransaction: [],
      datacodedepotTransaction: [],
      btnValidez: false,

    };

    this.getAlldepot = this.getAlldepot.bind(this);
    this.getAllTypetransation = this.getAllTypetransation.bind(this);
    this.getAllTypetransationfil = this.getAllTypetransationfil.bind(this);
    this.getAlldepotfil = this.getAlldepotfil.bind(this);
    this.getAllproduit = this.getAllproduit.bind(this);
    this.getEnstreSortieTempo = this.getEnstreSortieTempo.bind(this);
    this.OperationInfo = this.OperationInfo.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.Validez = this.Validez.bind(this);
    this.supprimer = this.supprimer.bind(this);
    this.Recherchez = this.Recherchez.bind(this);

  }


  componentDidMount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };
  
    this.getAlldepot();
    this.getAllTypetransation();
    this.getAlldepotfil();
    this.getEnstreSortieTempo();
    this.getAllproduit();

   /*  let matri = localStorage.getItem("usermat");
    console.log(matri); */


  console.log(this.state.matricule);

  };

  componentWillUnmount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };
    
    this.getAlldepot();
    this.getAllTypetransation();
    this.getAllTypetransationfil();
    this.getAlldepotfil();
    this.getEnstreSortieTempo();
    this.getAllproduit();
   

  }




  getAlldepot = async (codedepot) => {
    let res = axios.get("http://maxsalesbackend.com/api/codedepotallES")
      .then((res) => this.setState({ datacodedepotfiltre: res.data }));

  }


  getAlldepotfil = async (codedepot) => {
    let res = axios.get("http://maxsalesbackend.com/api/codedepotallES")
      .then((res) => this.setState({ datacodedepotfiltre: res.data }));

  }

  getEnstreSortieTempo = async () => {
    let res = axios.get('http://maxsalesbackend.com/api/getEnstreSortieTempo')
      .then((res) => this.setState({ data: res.data }));

  }

  getAllTypetransation = async () => {
    let res = axios.get('http://maxsalesbackend.com/api/transactionAll')
      .then((res) => this.setState({ typetransaction: res.data }));

  }

  getAllTypetransationfil = async () => {
    let res = axios.get('http://maxsalesbackend.com/api/transactionAll')
      .then((res) => this.setState({ typetransaction: res.data }));

  }

  getAllproduit = async () => {
    let res = axios.get('http://maxsalesbackend.com/api/produitAllES')
      .then((res) => this.setState({ produittab: res.data }));

    this.state.produittab.forEach(element => {
      if (element.codProd === this.state.codProd) {
        this.setState({ libelleProd: element.libelleprod })
        this.setState({ codegamme: element.codegamme })
        this.setState({ prix: element.tarifachat })
        //this.setState({ idproduit: element.id })

        
      }

      console.log(this.state.codeproduit)
        console.log(this.state.libelleProd)
        console.log(this.state.codegamme)
        console.log(this.state.prix)

    });

  }


  OperationInfo = async (id) => {
    this.state.data.forEach(element => {
      if (element.id === id) {

        this.setState({ codedepot: element.codedepot })
        this.setState({ codProd: element.codProd })
        this.setState({ transaction: element.typeope })
        this.setState({ libelleProd: element.libelleProd })
        this.setState({ prix: element.prix })
        this.setState({ codegamme: element.codegamme })
        this.setState({ quantite: element.qte })
        this.setState({ total: element.total })
        this.setState({ iddelete: element.id })

      }


    });


  }


  
  Validez = async () => {
    let item = this.state.datacodedepotTransaction;
    console.warn(item)
    let filcodedep = this.state.filcodedepot
    let filtransac = this.state.filtransaction
    console.warn(filcodedep)
    console.warn(filtransac)

    let matricule = this.state.matricule;


    let result = await fetch('http://maxsalesbackend.com/api/entreesortiesave/' +filcodedep+ '/'+filtransac+ '/'+matricule, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json();

    console.warn(result);

     alert('operation successful'); 
    //history.push("/useradd")
    window.location.reload()


  }















  ajouter = async () => {
    let matricu = this.state.matricule;
    let str2= matricu.replace(/.$/, ''); //supprime le dernier caractere par espace
    let matricule= matricu.replace(/"/g,''); //supprime les doubles quotes au debut et fin  dune chaine 
/*     console.warn(str2);
    console.warn(matricule); */

    let codedepot = this.state.codedepot;
    let codegamme = this.state.codegamme;
    //alert( codegamme)
    let codProd = this.state.codProd;
    let libelleProd = this.state.libelleProd;
    let transaction = this.state.transaction;
    let quantite = this.state.quantite;
    let prix = this.state.prix;
    let total = this.state.total;
    let item = { codedepot, codegamme, codProd, libelleProd, transaction, quantite, prix, matricule, total }

    let qte = prix * quantite;
    this.setState({ total: qte })

    console.warn(prix * quantite);
/*     console.warn(this.state.matricule);
    console.warn(matricule); */
    console.warn(item);
    console.warn(item.matricule);

     let result = await fetch('http://maxsalesbackend.com/api/opertempoadd', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
     // body: JSON.stringify(item)
      body: JSON.stringify({codedepot, codegamme, codProd, libelleProd, 
        transaction, quantite, prix, matricule, total})
    });
    let res = await result.json();
    console.warn(res);
    alert('Opération réalisée avec succès')
     window.location.reload();
 

  }

  getAllinventaireTempoBydepot = async (codedepot) => {
    this.setState({ loading: true });

    console.log(this.state.codedepot)
    const res = await axios.get('http://maxsalesbackend.com/api/inventaireTempoallBydepot/' + codedepot);
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    this.setState({ data: res.data });

    console.log(this.state.data);
    this.setState({ loading: false });


  };

  Recherchez = async (filcodedepot, filtransaction) => {
    let matricu = this.state.matricule;
    let matricule= matricu.replace(/"/g,'');

    let item = { filcodedepot, filtransaction };

    if (this.state.filcodedepot == '') {
      alert('svp veuillez selectionner un depot pour filtrer la recherche ')
      this.setState({ btnValidez: false })

    }
    if (this.state.filtransaction == '') {
      alert('svp veuillez selectionner une transaction pour filtrer la recherche ')
      this.setState({ btnValidez: false })
    }

    if (this.state.filcodedepot !== '' && this.state.filtransaction !== '') {
      /*   setTabcodedepottransaction([])
        data.forEach(element => {
          if (element.codedepot == filcodedepot && element.typeope == filtransaction) {
            tabcodedepottransaction.push(element);
          }
  
        }); */

      // const res = await fetch('http://maxsalesbackend.com/api/entresortiegetdepotTransanction/'+filcodedepot+'/'+filtransaction);
      const res = await axios.get('http://maxsalesbackend.com/api/entresortiegetdepotTransanction/' + filcodedepot + '/' + filtransaction);

      this.setState({ datacodedepotTransaction: res.data })

      console.log(this.state.datacodedepotTransaction)

      //console.log(res.data)

      this.setState({ btnValidez: true })



    }

  };


  supprimer = async () => {
    console.warn(this.state.iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/opertempodelete/' + this.state.iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    alert(re.message)
    window.location.reload();

  };


  nu = ' ';

  render() {
    return (
      <div>
        <HeadOffline />
        <SideBar depotbd={this.state.depotbd} />
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
              <select onClick={() => this.getAlldepot(this.state.codedepot)} style={{ marginLeft: '165px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={this.state.codedepot}
                onChange={e => this.setState({ codedepot: e.target.value })}>
                <option style={{ fontSize: '11px' }} value=''>Sélectionner un depot</option>
                {
                  this.state.datacodedepotfiltre.map((item) => (

                    <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

                  ))

                }
              </select>

            </div>




            <label style={{ marginTop: '15px', marginLeft: '-6px' }}>Type Transaction</label>

            <div style={{ marginTop: '-22px' }}>
              <select onClick={() => this.getAllTypetransation(this.state.transaction)} style={{ marginLeft: '165px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={this.state.transaction}
                onChange={e => this.setState({ transaction: e.target.value })}>
                <option style={{ fontSize: '11px' }} value=''>Sélectionner un type</option>
                {
                  this.state.typetransaction.map((item) => (

                    <option key={item.id} value={item.codetype}>{item.codetype} </option>

                  ))

                }
              </select>

            </div>


            <label style={{ marginTop: '15px', marginLeft: '-34px' }}>Code produit</label>

            <div style={{ marginTop: '-20px' }}>
              <select onClick={() => this.getAllproduit(this.state.codProd)} style={{ marginLeft: '165px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={this.state.codProd}
                onChange={e => this.setState({ codProd: e.target.value })}>
                <option style={{ fontSize: '11px' }} value=''>Sélectionner un produit</option>
                {
                  this.state.produittab.map((item) => (

                    <option key={item.id} value={item.codProd}>{item.codProd} </option>



                  ))

                }
              </select>

            </div>



            <label style={{ marginTop: '25px', marginLeft: '-29px' }}>Libelle produit</label>
            <input disabled value={this.state.libelleProd ? this.state.libelleProd : this.state.nu} required type="text" className="form-control" placeholder=""
              style={{ marginTop: '-27px', fontSize: '11px', marginLeft: '165px', width: '150px' }}
              onChange={e => this.setState({ libelleProd: e.target.value })} />


            <input hidden  disabled value={this.state.codegamme} required type="text" className="form-control" placeholder=""
              style={{ marginTop: '7px', fontSize: '11px', marginLeft: '165px', width: '150px' }}
              onChange={e => this.setState({ codegamme: e.target.value })} />


            <label style={{ marginTop: '15px', marginLeft: '-70px' }}>Quantité</label>
            <input value={this.state.quantite ? this.state.quantite : this.state.quantite} style={{ fontSize: '12px', marginTop: '-27px', width: '150px', marginLeft: '165px' }} id="inputtelephone" type="number"
              className="form-control" placeholder=""
              onChange={e => this.setState({ quantite: e.target.value })} />


            <label style={{ marginTop: '15px', marginLeft: '-45px' }}>Prix unitaire</label>
            <input disabled value={this.state.prix ? this.state.prix : this.state.nu} type="number" className="form-control" placeholder=""
              style={{ marginTop: '-27px', fontSize: '12px', width: '150px', marginLeft: '165px' }}
              onChange={e => this.setState({ prix: e.target.value })} />


            <label style={{ marginTop: '15px', marginLeft: '-100px' }}>Total</label>
            <input value={this.state.prix * this.state.quantite} type="number" disabled className="form-control" placeholder=""
              style={{ marginTop: '-27px', fontSize: '12px', width: '150px', marginLeft: '165px' }}
              onChange={e => this.setState({ total: e.target.value })} />


          </div>


          <div>

          </div>

          <br /><br /> <br /> <br /><br /><br /> <br /> <br /><br />
          <div style={{ marginTop: '157px', marginLeft: '145px' }} >
            <button onClick={this.ajouter} style={{ marginLeft: '-115px', marginRight: '65px', border: '1px solid #ACD3F2', width: '160px', backgroundColor: '#E9F2FF' }} >ajoutez en attente </button>

            <button onClick={this.supprimer} style={{ border: '1px solid #ACD3F2', marginLeft: '-30px', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimé </button>

          </div>


        </div>

        <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '600px', display: 'inline-block' }}></span>



        <div className="utiDroi">
          <h5 style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}> Entrée / Sortie en attente (non validées)</h5>
          <br />

          <div style={{ marginLeft: '100px', border: '1px solid white', width: '200px', height: '100px' }}>
            <label style={{ marginTop: '0px', marginLeft: '0px' }}>filtre:</label>



            <select onClick={() => this.getAlldepotfil(this.state.filcodedepot)} style={{ marginLeft: '0px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={this.state.filcodedepot}
              onChange={e => this.setState({ filcodedepot: e.target.value })}>
              <option style={{ fontSize: '11px' }} value=''>filtrer par depot</option>
              {
                this.state.datacodedepotfiltre.map((item) => (

                  <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

                ))

              }
            </select>




            <select onClick={() => this.getAllTypetransationfil(this.state.filtransaction)} style={{ marginTop: '15px', marginLeft: '40px', width: '150px', border: ' solid #D1D7DC', fontSize: '11px' }} value={this.state.filtransaction}
              onChange={e => this.setState({ filtransaction: e.target.value })}>
              <option style={{ fontSize: '11px' }} value=''>Sélectionner un type</option>
              {
                this.state.typetransaction.map((item) => (

                  <option key={item.id} value={item.codetype}>{item.codetype} </option>

                ))

              }
            </select>



          </div>

          <div style={{ border: '1px solid white', width: '130px', marginLeft: '300px', marginTop: '-80px' }}>
            <button onClick={() => this.Recherchez(this.state.filcodedepot, this.state.filtransaction)} style={{ border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Recherchez </button>

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
              {this.state.filcodedepot !== '' && this.state.filtransaction !== '' ?

                this.state.datacodedepotTransaction.map((item) => (

                  <tr onClick={() => this.OperationInfo(item.id)} key={item.id}>


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
                :

                this.state.data.map((item) => (

                  <tr onClick={() => this.OperationInfo(item.id)} key={item.id}>


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
              }
            </tbody>
          </Table>
          {this.state.btnValidez === true ?
            <button onClick={this.Validez} style={{ marginLeft: '40px', marginRight: '65px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Validez </button>
            :
            <button onClick={this.Validez} disabled style={{ marginLeft: '40px', marginRight: '65px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Validez </button>

          }
        </div>

      </div>
    );
  }
}

export default EntreeSorties;