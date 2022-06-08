import { useState, useEffect } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function Produits() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);

  const [codegamme, setCodegamme] = useState("");
  const [datacodegammefiltre, setDatacodegammefiltre] = useState([]);
  const [codProd, setCodProd] = useState("");
  const [libelleprod, setLibelleprod] = useState("");

  const [qtephy, setQtephy] = useState(0);
  const [matricule, setMatricule] = useState(localStorage.getItem('usermat'));

  const [qtetheo, setQtetheo] = useState(0);
  const [tarifachat, setTarifachat] = useState(0);

  const [ecart, setEcart] = useState(0);
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');

  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }

    let matricu = matricule;
    let matricules = matricule.replace(/"/g, '');
    // const str2= matricule.replace(/.$/, ''); supprime le dernier caractere par espace
    setMatricule(matricules)
    getAllproduit();
    codegammeallfiltre();
    console.log(matricules)


  }, []);

  const getAllproduit = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/produitall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }

  function reset() {
    window.location.reload();
  }

  function codegammeallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/codegammeallfiltre")
      .then((res) => setDatacodegammefiltre(res.data));

  };


  async function addproduit() {
    console.log(iddelete);
    let item = {
      codProd, libelleprod, codegamme, tarifachat, qtephy, qtetheo, ecart, description, matricule
    };
    console.warn(item);
    if (item.codegamme === "") {
      alert('veuillez renseigner la gamme  svp')
    }
    if (item.codProd === "") {
      alert('veuillez renseigner le code  svp')
    };
    if (item.libelleprod === "") {
      alert('veuillez renseigner le libellé svp')
    };

    if (item.codegamme !== "" && item.codProd !== "" && item.libelleprod !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updateproduit/' + iddelete, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        console.warn('update' + result);
        //localStorage.setItem("user-info",JSON.stringify(result));

        alert('mise à jour effectué avec succès');
        //history.push("/useradd")
        window.location.reload()

      }

      if (!iddelete) {
        let result = await fetch('http://maxsalesbackend.com/api/produitadd', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        console.warn(result);
        console.warn(item);
        console.warn('operation successful' + result);
        //localStorage.setItem("user-info",JSON.stringify(result));

        alert('Produit créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deleteproduit = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deleteproduit/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllproduit();
  }

  async function search(key){

    console.log(key);

    if(key){
    let res =  await fetch('http://maxsalesbackend.com/api/searchproduit/'+key)
    res = await res.json();

         setData(res)    
    setSearchdata(res)
    console.log(res); 
    currentMenu = res
  }
  if(!key){
    let res = await axios.get('http://maxsalesbackend.com/api/produitall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);
  }


  }

  console.log(searchdata);




  const produitInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodegamme(element.codegamme);
        setCodProd(element.codProd);
        setLibelleprod(element.libelleprod);
        setTarifachat(element.tarifachat);
        setIddelete(element.id);

        console.log(element)

      }


    });

  }

  const indexOfLastMenu = currentPage * postPerPage;
  const indexOfFistMenu = indexOfLastMenu - postPerPage;
  const currentMenu = data.slice(indexOfFistMenu, indexOfLastMenu);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <HeadOffline />
      <SideBar />

      <div className="topproduit">
        <img src={"produit.png"} alt="produit" />
        Produits
      </div>

      <div className="milieuprodui">

        <label style={{ marginTop: '5px', marginLeft: '63px' }}>Gamme</label>
        <br />
        {/*   <input  value={codegamme ? codegamme : null} required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '200px', marginLeft: '5px', fontSize: '13px' }}
          onChange={e => setCodegamme(e.target.value)} /> */}

        <select style={{ height: '35px', width: '200px', border: ' solid #D1D7DC', marginTop: '5px', marginLeft: '-400px', fontSize: '13px' }} value={codegamme} onChange={e => setCodegamme(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionner une gamme</option>
          {
            datacodegammefiltre.map((item) => (

              <option key={item.id} value={item.codegamme}>{item.codegamme} </option>

            ))

          }
        </select>

        <label style={{ marginTop: '-20px', marginLeft: '320px', float: 'left' }}>Code Prod.</label>
        <input value={codProd ? codProd : null} required type="text" className="form-control" placeholder=""
          style={{  width: '180px', marginLeft: '260px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setCodProd(e.target.value)} />

        <label style={{ marginTop: '-60px', marginLeft: '541px', float: 'left' }}>Libellé Prod.</label>
        <input value={libelleprod ? libelleprod : null} required type="text" className="form-control" placeholder=""
          style={{  width: '200px', marginLeft: '485px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setLibelleprod(e.target.value)} />

        <label style={{ marginTop: '-60px', marginLeft: '737px', float: 'left' }}>Tarif Achat.</label>
        <input value={tarifachat ? tarifachat : null} required type="text" className="form-control" placeholder=""
          style={{  width: '120px', marginLeft: '715px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setTarifachat(e.target.value)} />

        {/* 
        <label style={{ marginTop: '-60px', marginLeft: '460px', float: 'left' }}>Tarif achat</label>
        <input value={tarifAch? tarifAch:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '435px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setTarifAch(e.target.value)} />



        <label style={{ marginTop: '-63px', marginLeft: '600px', float: 'left' }}>Tarif vente</label>
        <input value={tarifVen? tarifVen:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '585px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setTarifVen(e.target.value)} />

        <label style={{ marginTop: '-63px', marginLeft: '740px', float: 'left' }}>Tarif Weekend</label>
        <input value={tarifWeek? tarifWeek:null} required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '735px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setTarifWeek(e.target.value)} /> 

        <label style={{ marginTop: '-65px', marginLeft: '930px', float: 'left' }}>Bonus</label>
        <input value={bonus? bonus:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '900px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setBonus(e.target.value)} /> */}



        {/* <button onClick={reset} style={{ borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '12px', width: '200px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={addproduit} style={{ float: 'left', marginTop: '-30px', marginLeft: '860px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
        <button onClick={deleteproduit} style={{ float: 'left', marginTop: '-30px', marginLeft: '970px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimé </button>


        
        <input required type="text" className="form-control" placeholder="search"
          style={{ float: 'right', borderRadius: '100px', width: '230px', marginRight: '15px', marginTop: '12px', fontSize: '13px' }}
          onChange={e => search(e.target.value)} />
        {/* <button style={{ borderRadius: '100px', border: '1px solid #ACD3F2', marginTop: '5px', float: 'right', marginRight: '-360px', width: '120px', backgroundColor: '#E9F2FF' }} >Rechercher </button> */}

       </div>


      <div className="basprodui">



        <Table striped bordered hover variant="info">
          <thead>
            <tr>

              <th>GAMME</th>
              <th>Code Produit</th>
              <th>Libellé</th>
              <th>Tarif Achat</th>
              <th>créé par</th>


            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => produitInfo(item.id)} key={item.id}>

                  <td>{item.codegamme}</td>
                  <td>{item.codProd}</td>
                  <td>{item.libelleprod}</td>
                  <td>{item.tarifachat}</td>
                  <td>{item.matricule}</td>


                </tr>

              ))
            }
          </tbody>
        </Table>
        {
          loading ?
            <h2>Loading......</h2>
            :
            null
        }
        {/* <Pagination postPerPage={postPerPage} totalPosts={data.length} paginate={paginate}  /> */}
        <nav>

          <ul style={{ marginLeft: '480px' }} className='pagination'>
            {
              pageNumber.map(number => (
                <li key={number} className='page-item'>
                  <a onClick={() => paginate(number)} href='#' className="page-link">
                    {number}
                  </a>

                </li>
              ))
            }
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
      {/*        <div className="utiBas">

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

  )
}

export default Produits;