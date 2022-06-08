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
      solde: 0,
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

    /*     this.state.userstab.forEach(element => {
        
         this.setState({ salairenet:element.salaire + element.totalcredit + element.totaldebit });
   
       });  */

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

          <h5 style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}> Situation Financière du Personnel</h5>

          {

            this.state.userstab.map((itemuser) => (

              <div><span style={{ float: 'left', textAlign: 'left', fontSize: '25px', fontWeight: 'bold' }}>{itemuser.matricule} {itemuser.nom} ({itemuser.profil}) </span>
                <Table style={{ marginTop: '0px' }} striped bordered hover variant="info">
                  {/* <tr></tr> */}
                  <thead>

                    <tr>

                      {/* <th>Personnel</th> */}
                      <th>N°</th>
                      <th>Paiement</th>
                      <th>Date</th>
                      <th>Motif</th>
                      <th>Débit</th>
                      <th>Crédit</th>
                      {/* <th>Solde</th> */}
                    </tr>

                  </thead>
                  <tbody>
                    {

                      this.state.notedebittab.map((noteitem) => (
                        (itemuser.matricule === noteitem.personnel) ?
                          <tr key={noteitem.id}>
                            <td>{noteitem.id}</td>
                            <td>{noteitem.code}</td>
                            <td>{noteitem.updated_at}</td>
                            <td>{noteitem.description}</td>
                            {(noteitem.montant) ?
                              <td>{noteitem.montant}</td>
                              :
                              <td>0</td>
                            }

                            {(noteitem.versement) ?
                              <td>{noteitem.versement}</td>
                              :
                              <td>0</td>
                            }

                            {/* <td>{this.state.solde} + {noteitem.montant}+{noteitem.versement} </td> */}

                            <br />
                            <br />

                          </tr>

                          :
                          null

                      ))
                    }


                  </tbody>
                </Table>


                <div style={{ marginTop: '-17px', backgroundColor: '#BFE2E9', float: "right", width: '300px', height: '120px', border: '1px solid #BFE2E9' }}>


                  <h5 style={{ float: "left" }}> Salaire brute: {itemuser.salaire}</h5><br />

                  {(itemuser.totaldebit) ?

                    <h5 style={{ float: "left", marginLeft: '-191px' }}>Total debit:{itemuser.totaldebit}<br /></h5>

                    :

                    <h5 style={{ float: "left", marginLeft: '-191px' }}> Total debit:0 <br /></h5>

                  }
                  {(itemuser.totaldebit) ?
                    <h5 style={{ float: "left", marginLeft: '-191px', marginTop: '25px' }}>Total credit:{itemuser.totalcredit} </h5>
                    :
                    <h5 style={{ float: "left", marginLeft: '-191px', marginTop: '25px' }}>Total credit:0</h5>
                  }

                  {(itemuser.salairenet) ?
                    <h5 style={{ fontWeight: 'bold', float: "left", marginLeft: '-191px', marginTop: '70px' }}> Salaire net à payer:   {itemuser.salairenet}</h5>
                    :
                    <h5 style={{ fontWeight: 'bold', float: "left", marginLeft: '-191px', marginTop: '70px' }}>Salaire net à payer:   {itemuser.salaire}</h5>



                  }

                </div>


                <br /><br /><br /><br /><br /><br />
              </div>
            ))


          }



        </div>


      </div>
    );
  }
}

export default Situationpersonnelle;