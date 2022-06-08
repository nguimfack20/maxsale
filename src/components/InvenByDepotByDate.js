import React, { useState, useEffect, Component } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


class InvenByDepotByDate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentPage: 1,
      postPerPage: 10,
      codegamme: "",
      datacodedepotfiltre: [],
      ecartbd: [],
      dateinventaire:"",
      dateinventairetab: [],
      codedepot: "null",
      resultatbd: "",
      codProd: "",
      idproduit: "",
      libelleProd: "",
      codegamme: "",
      matricule: "",
      qtephy: 0,
      qtetheo: "0",
      ecart: "0",
      ecartTd: "0",
      description: "",
      description: "",
      description: "",
      data: [],
      statut: "",
      date: "",
      produitwhereId: "",
      //history: useHistory(),
      iddelete: "",

    };
    this.getInvenByDepotBydate = this.getInvenByDepotBydate.bind(this);
    this.consultationInvenByDepotbyDate = this.consultationInvenByDepotbyDate.bind(this);
    this.codedepotallfiltreInvCreer = this.codedepotallfiltreInvCreer.bind(this);

  }

  componentDidMount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };
    /*   let matri =  localStorage.getItem('usermat').split("\"").join("");
      this.setState({matricule:matri}); */
    // const str2= matricule.replace(/.$/, ''); supprime le dernier caractere par espace
    this.setState({ matricule: 'rodeo' })

    let d = new Date();
    let da = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

    this.codedepotallfiltreInvCreer();

  }


  componentWillUnmount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };
    //let matri =  localStorage.getItem('usermat').split("\"").join("");;
    // const str2= matricule.replace(/.$/, ''); supprime le dernier caractere par espace
    //this.setState({matricule:matri})

    let d = new Date();
    let da = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.codedepotallfiltreInvCreer();

  }

  getInvenByDepotBydate = async (codedepot) => {
    this.setState({ loading: true });

    console.log(this.state.codedepot)
    const res = await axios.get('http://maxsalesbackend.com/api/getInvenByDepotBydate/' + codedepot);
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    this.setState({ dateinventairetab: res.data });

    console.log(this.state.dateinventairetab);
    this.setState({ loading: false });


  };


  consultationInvenByDepotbyDate = async (dateinventaire) => {
    this.setState({ loading: true });

    let codedepot = this.state.codedepot;
    console.log(this.state.dateinventaire)
 /*    let dateInve = dateinventaire.replace(/ /g, '_');
    console.log(dateInve) */

    const res = await axios.get('http://maxsalesbackend.com/api/consultationInvenByDepotbyDate/' + codedepot + '/' + dateinventaire);
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    this.setState({ data: res.data });

    this.setState({ loading: false });


  };




  reset() {
    window.location.reload();
  }

  codedepotallfiltreInvCreer() {
    let res = axios.get("http://maxsalesbackend.com/api/codedepotallfiltreInvCreer")
      .then((res) => this.setState({ datacodedepotfiltre: res.data }));

  };

  render() {
    return (

      <div>
        <HeadOffline />
        <SideBar />

        <div className="topproduit">
          <img style={{ width: '40px', height: '25px' }} src={"inve.png"} alt="produit" />
          Consultation des Inventaires
        </div>

        <div className="milieuprodui">

          <br />
          <label style={{ marginTop: '5px', marginLeft: '63px' }}>Depot</label>


          <select onClick={() => this.getInvenByDepotBydate(this.state.codedepot)} style={{ height: '28px', width: '90px', borderRadius: '100px', border: ' solid #D1D7DC', marginTop: '5px', marginLeft: '5px', fontSize: '13px' }} value={this.state.codedepot}
            onChange={e => this.setState({ codedepot: e.target.value })}>
            <option style={{ fontSize: '12px' }} value=''>Sélectionner un depot</option>
            {
              this.state.datacodedepotfiltre.map((item) => (

                <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

              ))

            }
          </select>


          <label style={{ marginTop: '5px', marginLeft: '63px' }}>Date de l'inventaire</label>


<select onClick={() => this.consultationInvenByDepotbyDate(this.state.dateinventaire)} style={{width:'170px', height: '28px', borderRadius: '100px', border: ' solid #D1D7DC', marginTop: '5px', marginLeft: '5px', fontSize: '13px' }} value={this.state.dateinventaire}
  onChange={e => this.setState({ dateinventaire: e.target.value })}>
  <option style={{ fontSize: '12px',width:'100px' }} value=''>Sélectionner une date</option>
  {
    this.state.dateinventairetab.map((item) => (

      <option key={item.id} value={item}>{item} </option>

    ))

  }
</select>

          <label style={{ marginTop: '5px', marginLeft: '63px', marginRight: '5px' }}>Date</label>
          <input type="text" readOnly value={this.state.date} style={{ width: '100px', backgroundColor: '#DFDFE2', border: '2px solid #ACD3F2' }} />

          {/* <button onClick={this.addinventaire} style={{ borderRadius: '100px', marginLeft: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Valider </button> */}
        </div>


        <div className="basproduiniventaire">

          <Table style={{marginTop:'-60px'}} striped bordered hover variant="info">
            <thead>
              <tr>

                <th>GAMME</th>
                <th>Code Produit</th>
                <th>Designation</th>
                <th>stock</th>
               
              </tr>
            </thead>
            <tbody>
              {

                // currentMenu.map((item) => (
                this.state.data.map((item) => (
                  <tr  key={item.id} >
                     
                    <td>{item.codegamme}</td>
                    <td>{item.codProd}</td>
                    <td>{item.libelleProd}</td>
                    <td>{item.qtetheo}</td>
              
                  </tr>

                ))
              }
            </tbody>
          </Table>
          {
            this.state.loading ?
              <h2>Loading......</h2>
              :
              null
          }
          {/*    
        <Pagination postPerPage={postPerPage} totalPosts={data.length} paginate={paginate}  /> */}
          <nav>

            <ul style={{ marginLeft: '250px' }} className='pagination'>
              {/*   {
              pageNumber.map(number => (
                <li key={number} className='page-item'>
                  <a onClick={() => paginate(number)} href='#' className="page-link">
                    {number}
                  </a>

                </li>
              ))
            } */}
            </ul>

          </nav>


        </div>
        {/*     
      <div className="plusbasproduitgam">
        <Link to="/gamme" className="linkgamm">
          <img src={"gamproduit.png"} alt="produit" />
          Gamme de Produits
        </Link>
      </div> */}
        {/* <div className="utiBas">

          <div className="gpeut">
            <img src={"gamproduit.png"} alt="usergroupe" />
            <a href="gamme" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Gamme de Produits</a>
          </div>
          <div className="gpepage">
            <img src={"caisse.png"} alt="page" />
            <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="tarif">Tarifs</a></div>

          <div className="gpesite">
            <img src={"caisse.png"} alt="site" />

            <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="produittarif">Tarifs des Produits</a></div>




        </div> */}
      </div>

    );
  }
}
export default InvenByDepotByDate;