import React, { useState, useEffect, Component } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


class InventaireCree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentPage: 1,
      postPerPage: 10,
      codegamme: "",
      datacodedepotfiltre: [],
      ecartbd: [],
      codedepot: "null",
      resultatbd: "",
      codProd: "",
      idproduit: "",
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
    this.getAllinventaireTempoBydepot = this.getAllinventaireTempoBydepot.bind(this);
    //this.getAllproduit = this.getAllproduit.bind(this);
    this.codedepotallfiltreInvCreer = this.codedepotallfiltreInvCreer.bind(this);
    this.reset = this.reset.bind(this);
    this.addinventaire = this.addinventaire.bind(this);
    this.inventaireInfo = this.inventaireInfo.bind(this);
    this.addinventaire = this.addinventaire.bind(this);
    this.onKeyDowna = this.onKeyDowna.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("user-info")) {
      //history.push("/")
    };
    /*   let matri =  localStorage.getItem('usermat').split("\"").join("");
      this.setState({matricule:matri}); */
    // const str2= matricule.replace(/.$/, ''); supprime le dernier caractere par espace
    

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

  getAllinventaireTempoBydepot = async (codedepot) => {
    this.setState({ loading: true });

    console.log(this.state.codedepot)
    const res = await axios.get('http://maxsalesbackend.com/api/inventaireTempoallBydepot/' + codedepot);
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    this.setState({ data: res.data });

    console.log(this.state.data);
    this.setState({ loading: false });


  };

  /*   getAllinventaire = async () => {
      this.setState({ loading: true });
  
      
       const res = await axios.get('http://maxsalesbackend.com/api/inventaireall');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      this.setState({ data: res.data }); 
      this.setState({ loading: false });
  
  
    }; */

  /*  getAllproduit = async () => {
     this.setState({ loading: true });
     const res = await axios.get('http://maxsalesbackend.com/api/produitall');
     //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
     this.setState({ data: res.data });
     this.setState({ loading: false });
 
 
   }; */



  reset() {
    window.location.reload();
  }

  codedepotallfiltreInvCreer() {
    let res = axios.get("http://maxsalesbackend.com/api/codedepotallfiltreInvCreer")
      .then((res) => this.setState({ datacodedepotfiltre: res.data }));

  };



  inventaireInfo(id, codProd, libelleProd, codegamme, qtetheo, idproduit) {

    /*     let res = axios.get('http://maxsalesbackend.com/api/produitwhereId/' +id)
          .then((res) =>this.setState({produitwhereId:res.data}));
    
          console.log(this.state.produitwhereId); 
          console.log(res.data) */

    console.log(id)
    console.log(codProd)
    console.log(this.state.qtephy)
    let x = this.state.qtephy - this.state.qtetheo;
    this.setState({ ecart: x })

    let codedepot = this.state.codedepot;
    //let codedepot = this.state.codedepot;
    //let codedepot = this.state.codedepot;

    let matricu = this.state.matricule;
    let matricule= matricu.replace(/"/g,'');
    let qtephy = this.state.qtephy;
    //let idprodui = this.state.qtephy;

    let ecart = this.state.ecart;
    let description = this.state.description;
    // let date = this.state.date;
    let item = {
      codedepot, codProd, libelleProd, codegamme, matricule, qtephy, qtetheo, ecart, description
    };
    // console.warn(item)




    /*     this.state.data.forEach(element => {
          if (element.id === id) {
            console.log(element.id)
            this.setState({
              codedepot:this.state.codedepot,
              codProd:element.codProd,
              qtephy:this.state.qtephy,
              qtetheo:this.state.qtetheo,
              iddelete:element.id,
              qtetheo:this.state.qtetheo,
            })
    
            let x = this.state.qtetheo - this.state.qtephy;
            this.setState({ecart:x})
            
            let codedepot = this.state.codedepot;
        let codProd = this.state.codProd;
        let matricule = this.state.matricule;
        let qtephy = this.state.qtephy;
        let qtetheo = this.state.qtetheo;
        let ecart = this.state.ecart;
        let description = this.state.description;
        let date = this.state.date;
        let item = {
          codedepot,codProd, matricule, qtephy,qtetheo,ecart,description,date
        };
       console.warn(item)
          
    
          }
        }); */

  }

  handleKeyPress = (e, id, codProd, libelleProd, codegamme, qtetheo, idprod) => {
    if (e.key === 'Enter') {
      if (this.state.codedepot === "null") {
        alert('Veuillez selectionner un depot svp')
        //this.setState({qtephy:0})
        window.location.reload();
      }
      if (this.state.codedepot !== "null") {
        console.log('You must have pressed Enter ');
        console.log(id);
        console.log(this.state.ecart);
        let codedepot = this.state.codedepot;

        
        let matricu = this.state.matricule;
        let matricule= matricu.replace(/"/g,'');
        let qtephy = this.state.qtephy;

        let eca = this.state.qtephy - qtetheo;

        this.setState({ ecart: eca });
        this.setState({ idproduit: idprod });
        console.log(this.state.ecart);
        let description = this.state.description;

        // let date = this.state.date;
        let item = {
          codedepot, codProd, libelleProd, codegamme, matricule, qtephy, qtetheo, eca, description, idprod
        };
        console.warn(item)
        this.setState({ ecartTd: eca });

        console.warn(eca)

        this.addinventaire(id, codProd, libelleProd, codegamme, qtetheo, eca, idprod);
        /*  const form = e.target.form;
       const index = [...form].indexOf.call(form,e.target);
       form.elements[index + 1].focus();
       e.preventDefault();  */

        /*  var form = e.target.form;
         var index = Array.prototype.indexOf.call(form, e.target);
         form.elements[index + 2].focus();
         e.preventDefault(); */
      }

    }
  };

  async addinventaire(id, codProd, libelleProd, codegamme, qtetheo, eca, idprod) {
    let codedepot = this.state.codedepot;

    
    let matricu = this.state.matricule;
    let matricule= matricu.replace(/"/g,'');
    let qtephy = this.state.qtephy;
    let ecart = eca;
    let description = this.state.description;
    //let date = this.state.date;
    let item = {
      id, codedepot, codProd, libelleProd, codegamme, matricule, qtephy, qtetheo, ecart, description, idprod
    };
    console.warn(item)

    let result = await fetch('http://maxsalesbackend.com/api/invtempoadd', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json();

    console.warn(result);
    // console.warn(result.codProd);
    this.setState({ resultatbd: result })
    this.setState({ ecart: result.ecart })
    console.warn('operation successful' + result);
    console.warn(this.state.resultatbd);


    // alert('Produit créé avec succès');
    //history.push("/useradd")
    //window.location.reload()
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
        <SideBar />

        <div className="topproduit">
          <img style={{ width: '40px', height: '25px' }} src={"inve.png"} alt="produit" />
          Création des inventaires
        </div>

        <div className="milieuprodui">

          <br />
          <label style={{ marginTop: '5px', marginLeft: '63px' }}>Depot</label>


          <select onClick={() => this.getAllinventaireTempoBydepot(this.state.codedepot)} style={{ height: '28px', width: '90px', borderRadius: '100px', border: ' solid #D1D7DC', marginTop: '5px', marginLeft: '5px', fontSize: '13px' }} value={this.state.codedepot}
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

          {/* <button onClick={this.addinventaire} style={{ borderRadius: '100px', marginLeft: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Valider </button> */}
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
              </tr>
            </thead>
            <tbody>
              {

                // currentMenu.map((item) => (
                this.state.data.map((item) => (
                  <tr onClick={() => this.inventaireInfo(item.id, item.codProd, item.libelleProd, item.codegamme, item.qtetheo, item.idproduit)} key={item.id} id={item.id}
                    onKeyPress={(e) => this.handleKeyPress(e, item.id, item.codProd, item.libelleProd, item.codegamme, item.qtetheo, item.idproduit)} >
                    <td>{item.codegamme}</td>
                    <td>{item.codProd}</td>
                    <td>{item.libelleProd}</td>
                    <td>{item.qtetheo}</td>
                    <td style={{ width: '70px' }}><input
                      id="inputqtephy" placeholder="0" type='number' style={{ width: '70px', height: '30px' }}
                      onChange={(e => this.setState({ qtephy: e.target.value }))} /></td>
                    {/* <td>{item.ecart}</td> */}



                    {
                     

                     this.state.resultatbd.codProd === item.codProd ?
                          <>
                            <td>{this.state.resultatbd.ecart}</td>
                          </>
                          :
                          <td></td>
                     
                    } 
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
export default InventaireCree;