import React, { useState, useEffect, Component } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


class  InventaireValider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentPage: 1,
      postPerPage: 10,
      codegamme: "",
      datacodedepotfiltre: [],
      codedepot: "null",
      codProd: "",
      libelleProd: "",
      codegamme: "",
      matricule: localStorage.getItem('usermat'),
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
      //indexOfLastMenu : this.state.currentPage * this.state.postPerPage,
      //indexOfFistMenu: this.state.indexOfLastMenu - this.state.postPerPage,
      //currentMenu : this.state.data.slice(this.state.indexOfFistMenu, this.state.indexOfLastMenu),
      //pageNumber : [],
      //paginate : this.state.pageNumber = this.setState({currentPage:this.state.pageNumber}),

      i: 1,

    };
    //this.getAllinventaire = this.getAllinventaire.bind(this);
    this.getAllinventaireValiTempoBydepot = this.getAllinventaireValiTempoBydepot.bind(this);
    //this.getAllproduit = this.getAllproduit.bind(this);
    this.codedepotallfiltreInvCreer = this.codedepotallfiltreInvCreer.bind(this);
    this.reset = this.reset.bind(this);
    this.addinventaire = this.addinventaire.bind(this);
    //this.inventaireInfo = this.inventaireInfo.bind(this);
    this.onKeyDowna = this.onKeyDowna.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };
    /*   let matri =  localStorage.getItem('usermat').split("\"").join("");
      this.setState({matricule:matri}); */
    // const str2= matricule.replace(/.$/, ''); supprime le dernier caractere par espace
    let matricu = this.state.matricule;
    let matricule= matricu.replace(/"/g,'');

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

  getAllinventaireValiTempoBydepot= async (codedepot) =>  {
    this.setState({ loading: true });

    console.log(this.state.codedepot)
     const res = await axios.get('http://maxsalesbackend.com/api/inventaireValiTempoallBydepot/' +codedepot);
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    this.setState({ data: res.data }); 

    console.log(this.state.data);
    this.setState({ loading: false });


  };

  reset() {
    window.location.reload();
  }

  codedepotallfiltreInvCreer() {
    let res = axios.get("http://maxsalesbackend.com/api/codedepotallfiltreInvCreer")
      .then((res) => this.setState({ datacodedepotfiltre: res.data }));

  };




  async addinventaire( codedepot) {
    let item = this.state.data;
    console.warn(item)
    console.warn(codedepot)

    let result = await fetch('http://maxsalesbackend.com/api/inventaireadd/' +codedepot, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json();

    console.warn(result);
    this.setState({ecart:result.ecart})
    console.warn('operation successful' + result);


     alert('inventaire créé avec succès');
    //history.push("/useradd")
    window.location.reload()
  }


  changprod = (e, id) => {
    console.log('onchange' + id)
    this.state.data.forEach(element => {
      if (element.id === id) {
        this.setState({
          codedepot: this.state.codedepot,
          codProd: element.codProd,
          qtephy: this.state.qtephy,
          qtetheo: this.state.qtetheo,
          iddelete: element.id,
          qtetheo: this.state.qtetheo,
        })
        let x = this.state.qtetheo - this.state.qtephy;
        this.setState({ ecart: x })

        console.log(this.state.codedepot)
        console.log(this.state.codProd)
        console.log(this.state.qtephy)
        console.log(this.state.qtetheo)
        console.log(this.state.matricule)
        console.log(id)

      }
    });
  }

  onKeyDowna = (e, id) => {
    if (e.key === 'Tab') {
      console.log('You must have pressed tab ');
      console.log(id);
      //this.addinventaire(id);
      this.state.data.forEach(element => {
        if (element.id === id) {
          this.setState({
            codedepot: this.state.codedepot,
            codProd: element.codProd,
            qtephy: this.state.qtephy,
            qtetheo: this.state.qtetheo,
            iddelete: element.id,
            qtetheo: this.state.qtetheo,
          })
          let x = this.state.qtetheo - this.state.qtephy;
          this.setState({ ecart: x })
        }
      });
    }
  };



  /* for ( i = 1, i < Math.ceil(data.length / postPerPage); i++) {
    pageNumber.push(i);
  } */


  render() {
    return (

      <div>
        <HeadOffline />
        <SideBar  />

        <div className="topproduit">
          <img style={{ width: '40px', height: '25px' }} src={"inve.png"} alt="produit" />
          Validation des inventaires
        </div>

        <div className="milieuprodui">

          <br />
          <label style={{ marginTop: '5px', marginLeft: '63px' }}>Depot</label>


          <select onClick={() => this.getAllinventaireValiTempoBydepot(this.state.codedepot)} style={{ height: '28px', width: '90px', borderRadius: '100px', border: ' solid #D1D7DC', marginTop: '5px', marginLeft: '5px', fontSize: '13px' }} value={this.state.codedepot}
            onChange={e => this.setState({ codedepot: e.target.value })}>
            <option style={{ fontSize: '12px' }} value=''>Sélectionner un depot</option>
            {
              this.state.datacodedepotfiltre.map((item) => (

                <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

              ))

            }
          </select>

          <label style={{ marginTop: '5px', marginLeft: '63px', marginRight: '5px' }}>Date</label>
          <input type="text" readOnly value={this.state.date} style={{ width: '100px', backgroundColor: '#DFDFE2', border: '2px solid #ACD3F2' }} />

          <button onClick={() => this.addinventaire(this.state.codedepot)} style={{ borderRadius: '100px', marginLeft: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Valider </button>
        </div>


        <div className="basproduiniventaire">





          <Table striped bordered hover variant="info">
            <thead>
              <tr>
           
                <th>GAMME</th>
                <th>Code Produit</th>
                <th>Designation</th>
                <th>theo</th>
                <th>phy</th>
                <th>ecart</th>
                <th>description</th>


              </tr>
            </thead>
            <tbody>
              {

                // currentMenu.map((item) => (
                this.state.data.map((item) => (
                  <tr key={item.id} id={item.id}
                 >

                    {/* <tr onClick={() => this.inventaireInfo(item.id)} key={item.id} id={item.id}
                onKeyPress={(e) => this.handleKeyPress(e,item.id,item.codProd,item.qtetheo)} onChange={(e) => this.changprod(e,item.id)}
                onKeyDown={(e) => this.onKeyDowna(e,item.id)}> */}

               
                    <td>{item.codegamme}</td>
                    <td>{item.codProd}</td>
                    <td>{item.libelleProd}</td>
                    <td>{item.qtetheo ? item.qtetheo : '0'}</td>
                    <td style={{ width: '70px' }}>{item.qtephy}</td>
                    <td>{item.ecart}</td>
                    {/* onChange={e => setTarifWeek(e.target.value)} */}
                    <td>{item.statut}</td>


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
export default InventaireValider;