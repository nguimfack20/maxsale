import { useState, useEffect } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function ProduitTarif() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [codProd, setCodProd] = useState("");
  const [codetarif, setCodetarif] = useState("");
  const [prix, setPrix] = useState("");
  const [dataproduitfiltre, setDatacodeproduitfiltre] = useState([]);
  const [datatariffiltre, setDatacodetariffiltre] = useState([]);
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');

  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllproduittarif();
    codetarifallfiltre();
    codeproduitallfiltre();


  }, []);

  const getAllproduittarif = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/produittarifall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }

  function reset() {
    window.location.reload();
  }

  function codeproduitallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/codeproduitallfiltre")
      .then((res) => setDatacodeproduitfiltre(res.data));

  };

  function codetarifallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/codetarifallfiltre")
      .then((res) => setDatacodetariffiltre(res.data));

  };


  async function addproduittarif() {
    console.log(iddelete);
    let item = {
      codProd, codetarif, prix
    };
    console.warn(item);
    if (item.codProd === "") {
      alert('veuillez renseigner le code du produit  svp')
    }
    if (item.codetarif === "") {
      alert('veuillez renseigner le code du tarif svp')
    };
    if (item.prix === "") {
      alert('veuillez renseigner le prix svp')
    };

    if (item.codetarif !== "" && item.codProd !== "" && item.prix !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updateproduittarif/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/produittarifadd', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        console.warn('operation successful' + result);
        //localStorage.setItem("user-info",JSON.stringify(result));

        alert('tarif créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deleteproduittarif = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deleteproduittarif/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllproduittarif();
  }




  const produittarifInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodetarif(element.codetarif);
        setCodProd(element.codProd);
        setPrix(element.prix);
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
  const nu = ' ';


  return (
    <div>
      <HeadOffline />
      <SideBar />
      <div className="topgamme">
        <img src={"caisse.png"} alt="produit" />
        Gestion des Tarifs des produits
      </div>

      <div className="produitTarifGauch">


        <label style={{ marginTop: '80px', marginLeft: '30px' }}>Code du Produit</label>
        <select style={{marginTop: '-27px', marginLeft: '175px', float: 'left', height: '35px', width: '170px', border: ' solid #D1D7DC' }}
          value={codProd} onChange={e => setCodProd(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionner un produit</option>
          {
            dataproduitfiltre.map((item) => (

              <option key={item.id} value={item.codProd}>{item.codProd} </option>

            ))

          }
        </select>
        <br />


        <label style={{ marginTop: '45px', marginLeft: '30px' }}>Code du tarif</label>
        <select style={{ marginTop: '-26px', marginLeft: '175px', float: 'left', height: '35px', width: '170px', border: ' solid #D1D7DC' }}
          value={codetarif} onChange={e => setCodetarif(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionner un tarif</option>
          {
            datatariffiltre.map((item) => (

              <option key={item.id} value={item.codetarif}>{item.codetarif} </option>

            ))

          }
        </select>
        <br />

        <label style={{ marginTop: '65px', marginLeft: '39px' }}>Prix </label>
        <input required type="text" className="form-control" placeholder="" value={prix ? prix : nu}
          style={{  float: 'left', marginTop: '-26px', marginLeft: '175px',  width: '180px', fontSize: '13px' }}
          onChange={e => setPrix(e.target.value)} />


        <br /> <br /> <br /> <br /> <br /> <br />

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={addproduittarif} style={{ marginLeft: '50px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
        

        <button onClick={deleteproduittarif} style={{ border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '550px', display: 'inline-block' }}></span>

      <div className="produitarifDroi">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>
       
              <th>Code Produit</th>
              <th>Code Tarif</th>
              <th>Prix</th>


            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => produittarifInfo(item.id)} key={item.id}>
             
                  <td>{item.codProd}</td>
                  <td>{item.codetarif}</td>
                  <td>{item.prix}</td>


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

          <ul style={{ marginLeft: '250px' }} className='pagination'>
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

    </div>
  )
}

export default ProduitTarif;