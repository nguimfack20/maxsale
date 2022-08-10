import { useState, useEffect } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";

import imgpetrole from '../Image/petrol.png'


function Produits() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);


  const [codProd, setCodProd] = useState("");
  const [libelleprod, setLibelleprod] = useState("");

  const [matricule, setMatricule] = useState(localStorage.getItem('usermat'));

  const [tarifachat, setTarifachat] = useState('');
  const [tv1, setTv1] = useState('');



  const [data, setData] = useState([]);

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
    console.log(matricules)


  }, []);




  const allproduit = "http://localhost:8181/api/v1/blessing/produit"

  const getAllproduit = async () => {
    setLoading(true);
    let res = axios.get(allproduit)
      .then((res) => setData(res.data));
    setLoading(false);
  };

  console.warn(data)

  function reset() {
    window.location.reload();
  }




  async function addproduit() {
    console.log(iddelete);
    let item = {
      codProd, libelleprod, tarifachat, tv1
    };
    console.warn(item);

    if (item.codProd === "") {
      alert('veuillez renseigner le code  svp')
    };
    if (item.libelleprod === "") {
      alert('veuillez renseigner le libellé svp')
    };

    if (item.tarifachat === "") {
      alert('veuillez renseigner le tarif achat svp')
    };

    if (item.tv1 === "") {
      alert('veuillez renseigner le tarif de vente svp')
    };

    if (item.codProd !== "" && item.libelleprod !== "" && item.tarifachat !== "" && item.tv1 !== "") {

      if (iddelete) {
        console.log(iddelete)
        let produit = JSON.stringify({
          codeProduit: codProd,
          libelle: libelleprod,
          tarifAchat: tarifachat,
          tarifVente: tv1,
        });

        try {
          let result = await axios.put("http://localhost:8181/api/v1/blessing/produit/" +iddelete, produit,
            { headers: { "Content-Type": "application/json" } });
          console.log(result.data);
        } catch (error) {
          console.error(error.response.data);
        }


        alert('mise à jour effectué avec succès');
        //history.push("/useradd")
        window.location.reload()

      }

      if (!iddelete) {
        let produit = JSON.stringify({
          codeProduit: codProd,
          libelle: libelleprod,
          tarifAchat: tarifachat,
          tarifVente: tv1,
        });

        try {
          let result = await axios.post("http://localhost:8181/api/v1/blessing/produit", produit,
            { headers: { "Content-Type": "application/json" } });
          console.log(result.data);
        } catch (error) {
          console.error(error.response.data);
        }

        alert('Produit créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deleteproduit = async () => {
    console.warn(iddelete);
    let produit = JSON.stringify({
      codeProduit: codProd,
      libelle: libelleprod,
      tarifAchat: tarifachat,
      tarifVente: tv1,
    });
    console.log(iddelete)
 

    try {
      let result = await axios.delete("http://localhost:8181/api/v1/blessing/produit/" +iddelete, 
      {headers:{"Content-Type" : "application/json"}});
      console.log(result.data);
    } catch (error) {
      console.error(error.response.data);  
    } 
 
    getAllproduit();
  }


  const produitInfo = (id) => {
    console.log(id)

    data.forEach(element => {
      if (element.id === id) {

        setCodProd(element.codeProduit);
        setLibelleprod(element.libelle);
        setTarifachat(element.tarifAchat);
        setTv1(element.tarifVente);

        setIddelete(element.id);

        console.log(element)

      }


    });

  }

  console.warn(iddelete);

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
        <img src={imgpetrole} alt="produit" />
        Produits
      </div>

      <div className="milieuprodui">



        <div style={{ marginTop: '20px', marginLeft: '22px', float: 'left', border: '1px solid whitesmoke', width: '1050px' }} >
          <label style={{ marginTop: '1px', marginLeft: '2px', float: 'left' }}>Code Prod.</label>
          <input value={codProd ? codProd : null} required type="text" className="form-control" placeholder=""
            style={{ width: '110px', marginLeft: '1px', marginTop: '25px', fontSize: '13px' }}
            onChange={e => setCodProd(e.target.value)} />

          <label style={{ marginTop: '-60px', marginLeft: '140px', float: 'left' }}>Libellé Prod.</label>
          <input value={libelleprod ? libelleprod : null} required type="text" className="form-control" placeholder=""
            style={{ width: '150px', marginLeft: '140px', marginTop: '-35px', fontSize: '13px' }}
            onChange={e => setLibelleprod(e.target.value)} />

          <label style={{ marginTop: '-60px', marginLeft: '320px', float: 'left' }}>Tarif Achat</label>
          <input value={tarifachat ? tarifachat : null} required type="text" className="form-control" placeholder=""
            style={{ width: '110px', marginLeft: '320px', marginTop: '-35px', fontSize: '13px' }}
            onChange={e => setTarifachat(e.target.value)} />

          <label style={{ marginTop: '-60px', marginLeft: '480px', float: 'left' }}>Tarif Vente</label>
          <input value={tv1 ? tv1 : null} required type="text" className="form-control" placeholder=""
            style={{ width: '110px', marginLeft: '480px', marginTop: '-35px', fontSize: '13px' }}
            onChange={e => setTv1(e.target.value)} />

          <button onClick={addproduit} style={{ float: 'left', marginTop: '-40px', marginLeft: '620px', border: '1px solid #F8D7DA', width: '100px', backgroundColor: '#F8D7DA' }} >Enrégistré </button>
          <button onClick={deleteproduit} style={{ float: 'left', marginTop: '-40px', marginLeft: '740px', border: '1px solid #F8D7DA', width: '100px', backgroundColor: '#F8D7DA' }} >Supprimé </button>



          <input  required type="text" className="form-control" placeholder="search"
            style={{ float: 'left', borderRadius: '100px', width: '190px', marginLeft: '854px', marginTop: '-45px', fontSize: '13px' }}
             />
          {/* <button style={{ borderRadius: '100px', border: '1px solid #ACD3F2', marginTop: '5px', float: 'right', marginRight: '-360px', width: '120px', backgroundColor: '#E9F2FF' }} >Rechercher </button> */}

        </div>

      </div>


      <div className="basprodui">



        <Table style={{ float: 'left', marginTop: '-40px' }} striped bordered hover variant="danger">
          <thead>
            <tr>

              <th>Code Produit</th>
              <th>Libellé</th>
              <th>Tarif Achat</th>
              <th>Tarif Vente</th>
              {/* <th>créé par</th> */}


            </tr>
          </thead>
          <tbody>
            {

              //currentMenu.map((item) => (
                currentMenu.map((item) => (
                <tr onClick={() => produitInfo(item.id)} key={item.id}>

                  <td>{item.codeProduit}</td>
                  <td>{item.libelle}</td>
                  <td>{item.tarifAchat}</td>
                  <td>{item.tarifVente}</td>
                  {/* <td>{item.matricule}</td> */}


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
    
    </div>

  )
}

export default Produits;