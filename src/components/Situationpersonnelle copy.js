import Header from "./Header";
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios, { Axios } from "axios";
import { Table } from "react-bootstrap";

class Situationpersonnelle extends React.Component {


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
      recouvrementtab: [],
      userstab: [],
      personnel: "",
      code: "",
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
      notedebitID: "",
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
    this.getRecouvrement = this.getRecouvrement.bind(this);
    this.getNotedebit = this.getNotedebit.bind(this);
    this.getuser = this.getuser.bind(this);


  }



  componentDidMount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };

    this.getAllMatricule();
    this.getNotedebit();
    this.getuser();
    this.getRecouvrement();




  };

  componentWillUnmount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };

    this.getAllMatricule();
    this.getNotedebit();
    this.getuser();
    this.getRecouvrement();



  }




  getAllMatricule = async (codedepot) => {
    let res = axios.get("http://maxsalesbackend.com/api/alluser")
      .then((res) => this.setState({ matriculetab: res.data }));


    /*     this.state.matriculetab.forEach(element => {
          if (element.matricule === this.state.personnel) {
            this.setState({ nom: element.nom })
   
          }
    
    
        }); */

  }


  getNotedebit = async () => {
    let res = await axios.get("http://maxsalesbackend.com/api/allnotedebit")
      .then((res) => this.setState({ notedebittab: res.data }));

    console.log(this.state.notedebittab)


    /* this.state.notedebittab.forEach(element => {
      if (element.matricule === this.state.personnel) {
        this.setState({ nom: element.nom })
 
      } 
 
 
    });  */



  }


  getRecouvrement = async () => {
    let res = await axios.get("http://maxsalesbackend.com/api/allrecouvrement")
      .then((res) => this.setState({ recouvrementtab: res.data }));
    console.log(this.state.recouvrementtab)

    /*      this.state.recouvrementtab.forEach(element => {
           if (element.matricule === this.state.personnel) {
             this.setState({ nom: element.nom })
    
           }
     
     
         }); */

  }

  getuser = async () => {
    let res = await axios.get("http://maxsalesbackend.com/api/alluser")
      .then((res) => this.setState({ userstab: res.data }));
    console.log(this.state.userstab);

    /*   this.state.userstab.forEach(element => {
        if (element.matricule === this.state.personnel) {
          this.setState({ nom: element.nom })
 
        }
  
  
      }); */

  }



  render() {
    return (
      <div>
        <HeadOffline />
        <SideBar depotbd={this.state.depotbd} />
        <div className="topuser">
          <img style={{ width: '30px', height: '30px' }} src={"situ.png"} alt="produit" />
          <span style={{ margin: '15px' }}>SITUATION DU PERSONNEL</span>
        </div>



        <div className="situationpersonnel">

          <h5 style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}> Etat du Personnel</h5>



          <Table style={{ marginTop: '0px' }} striped bordered hover variant="info">
            <thead>
              <tr>

                <th>Personnel</th>
                <th>N°</th>
                <th>Paiement</th>
                <th>Date</th>
                <th>Motif</th>
                <th>Débit</th>
                <th>Crédit</th>
                <th>Solde</th>


              </tr>

            </thead>
            <tbody>
              {

                this.state.userstab.map((itemuser) => (
                  this.state.notedebittab.map((noteitem) => (

                    (itemuser.matricule === noteitem.personnel) ?

                        <tr onClick={() => this.OperationInfo(noteitem.id)} key={noteitem.id}>
                          <td>{itemuser.matricule}</td>
                          <td>{noteitem.id}</td>
                          <td>{noteitem.code}</td>
                          <td>{noteitem.updated_at}</td>
                          <td>{noteitem.description}</td>
                          <td>{noteitem.montant}</td>
                          <td>{noteitem.versement}</td>

                          <hr />
                          <hr />
                        </tr>
                          :
                          null
                      
                  ))
                
                ))


              }
            </tbody>
          </Table>


        </div>

      </div>
    );
  }
}

export default Situationpersonnelle;