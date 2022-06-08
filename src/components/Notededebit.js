import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios, { Axios } from "axios";
import { Table } from "react-bootstrap";

class Notededebit extends React.Component {


  constructor(props) {
    super(props);


    this.state = {
      loading: false,
      currentPage: 1,
      postPerPage: 10,
      codegamme: "",
      datacodedepotfiltre: [],
      matriculetab: [],
      notedebittab: [],
      personnel: "",
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
      nom: "",
      total: "",
      datacodedepotfiltre: [],
      motiftab: [],
      modeencaissementtab: [],
      typetransaction: [],
      motif: "",
      modeencai: "",
      montant: "",
      description: "",
      data: [],
      produittab: [],
      tabcodedepottransaction: [],
      datacodedepotTransaction: [],
      btnValidez: false,

    };

    this.getAllMatricule = this.getAllMatricule.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.getNotedebit = this.getNotedebit.bind(this);


  }


  componentDidMount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };

    this.getAllMatricule();
    this.getNotedebit();
    console.log(this.state.matricule);

  };

  componentWillUnmount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };

    this.getAllMatricule();
    this.getNotedebit();



  }




  getAllMatricule = async (codedepot) => {
    let res = axios.get("http://maxsalesbackend.com/api/alluser")
      .then((res) => this.setState({ matriculetab: res.data }));

      this.state.matriculetab.forEach(element => {
        if (element.matricule === this.state.personnel) {
          this.setState({ nom: element.nom })
 
        }
  
  
      });

  }


  getNotedebit = async (codedepot) => {
    let res = axios.get("http://maxsalesbackend.com/api/allnotedebitNoversement")
      .then((res) => this.setState({ notedebittab: res.data }));

      this.state.notedebittab.forEach(element => {
        if (element.matricule === this.state.personnel) {
          this.setState({ nom: element.nom })
 
        }
  
  
      });

  }




  ajouter = async () => {
    let matricu = this.state.matricule;
    let str2 = matricu.replace(/.$/, ''); //supprime le dernier caractere par espace
    let matricule = matricu.replace(/"/g, ''); //supprime les doubles quotes au debut et fin  dune chaine 

    let montant = this.state.montant;
    let personnel = this.state.personnel;
    let description = this.state.description;
    let item = {personnel, montant, description ,personnel}


    console.warn(item);
    //console.warn(item.matricule);

    let result = await fetch('http://maxsalesbackend.com/api/notedebitadd', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      // body: JSON.stringify(item)
      body: JSON.stringify({
        personnel, montant, matricule,
        description
      })
    });
    let res = await result.json();
    console.warn(res);
    alert('Opération réalisée avec succès')
     window.location.reload();


  }

  nu = ' ';

  render() {
    return (
      <div>
        <HeadOffline />
        <SideBar depotbd={this.state.depotbd} />
        <div className="topuser">
          <img style={{ width: '30px', height: '30px' }} src={"debit.png"} alt="produit" />
         <span style={{margin:'15px'}}>NOTE DE DEBIT</span> 
        </div>

        <div className="utiGauNotedebit">


          <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}>Appliquez Une Sanction</div>

          <div style={{ float: 'left', marginTop: '5px', width: '180px' }}>

            <label style={{ marginTop: '15px', marginLeft: '-85px' }}>Personnel</label>

            <div style={{ marginTop: '-20px' }}>
              <select onClick={() => this.getAllMatricule(this.state.personnel)} style={{ marginLeft: '165px', width: '150px',height:'40px', border: ' solid #D1D7DC', fontSize: '11px' }} value={this.state.personnel}
                onChange={e => this.setState({ personnel: e.target.value })}>
                <option style={{ fontSize: '11px' }} value=''>Sélectionner un matricule</option>
                {
                  this.state.matriculetab.map((item) => (

                    <option key={item.id} value={item.matricule}>{item.matricule} </option>

                  ))

                }
              </select>

            </div>




            <label style={{ marginTop: '15px', marginLeft: '-89px' }}>Nom </label>

            <div style={{ marginTop: '-22px' }}>
              <input disabled   style={{ marginLeft: '165px', width: '150px',height:'40px', border: ' solid #D1D7DC', fontSize: '11px' }} value={this.state.nom}
                onChange={e => this.setState({ nom: e.target.value })} />

            </div>


            <label style={{ marginTop: '15px', marginLeft: '-84px' }}>Code</label>

            <div style={{ marginTop: '-20px' }}>
              <input disabled onClick={() => this.getAllmodeencaissement(this.state.modeencai)} 
              style={{ marginLeft: '165px', width: '150px',height:'40px',
               border: ' solid #D1D7DC', fontSize: '11px' }} value="Note de débit"/>
         

            </div>



            <label style={{ marginTop: '25px', marginLeft: '-69px' }}>Montant</label>
            <input value={this.state.montant ? this.state.montant : this.state.nu} required type="number" className="form-control" placeholder=""
              style={{ marginTop: '-25px', fontSize: '11px', marginLeft: '165px', width: '150px' }}
              onChange={e => this.setState({ montant: e.target.value })} />





            <label style={{ marginTop: '15px', marginLeft: '-50px' }}>Description</label>
            <textarea value={this.state.description ? this.state.description : this.state.description} style={{ fontSize: '12px', marginTop: '-20px', width: '150px',height:'80px', marginLeft: '165px' }} type="textarea"
              className="form-control" placeholder=""
              onChange={e => this.setState({ description: e.target.value })}>

            </textarea>
            {/*  <input value={this.state.description ? this.state.description : this.state.description} style={{ fontSize: '12px', marginTop: '-27px', width: '150px', marginLeft: '165px' }}  type="textarea"
              className="form-control" placeholder=""
              onChange={e => this.setState({ description: e.target.value })} /> */}





          </div>


          <div>

          </div>

          <br /><br /> <br /> <br /><br /><br /><br /><br />
          <div style={{ marginTop: '187px', marginLeft: '-5px' }} >
            <button onClick={this.ajouter} style={{ marginLeft: '175px', marginRight: '65px', border: '1px solid #ACD3F2', width: '130px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>

            {/* <button onClick={this.supprimer} style={{ border: '1px solid #ACD3F2', marginLeft: '-30px', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimé </button> */}

          </div>


        </div>

        {/* <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '600px', display: 'inline-block' }}></span> */}



        <div className="utiDroiNotedebit">

            <h5 style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}> Liste des Sanctions</h5>
       

         
          <Table style={{ marginTop: '0px' }} striped bordered hover variant="info">
            <thead>
              <tr>

                <th>Personnel</th>
                <th>Montant</th>
                <th>Observation</th>
                <th>Payé</th>
              

              </tr>

            </thead>
            <tbody>
              {

                this.state.notedebittab.map((item) => (

                  <tr onClick={() => this.OperationInfo(item.id)} key={item.id}>

                    <td>{item.personnel}</td>
                    <td>{item.reste}</td>
                    <td>{item.description}</td>
                    <td>{item.paye}</td>
                    <br /><br />
                  </tr>
                ))
            
              }
            </tbody>
          </Table>
      
       
        </div>

      </div>
    );
  }
}

export default Notededebit;