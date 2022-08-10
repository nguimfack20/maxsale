import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";

import imgdepot from '../Image/depot.png'

function Compte() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [matriculeClient, setMatriculeClient] = useState('')
  const [numeroCompte, setNumeroCompte] = useState('')
  const [solde, setSolde] = useState('')
  const [agenceCreation, setAgenceCreation] = useState('')
  const [dateCreation, setdateCreation] = useState('')
  const [dateExpiration, setdateExpiration] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllCompte();


  }, []);

  const allcompte = "http://localhost:8181/api/v1/blessing/compte"

  function getAllCompte() {
    setLoading(true);
    let res = axios.get(allcompte)
      .then((res) => setData(res.data));
    setLoading(false);
  };





  function reset() {
    window.location.reload();
  }


  async function addCompte() {
    console.log(iddelete);
    let compte = JSON.stringify({
      agenceCreation: agenceCreation,
      dateCreation: dateCreation,
      dateExpiration: dateExpiration,
      description: description,
      matriculeClient: matriculeClient,
      numeroCompte: numeroCompte,
      solde: solde,
    });

    let item = {
      agenceCreation, dateCreation, dateExpiration, description, matriculeClient, solde, numeroCompte
    }

    if (item.numeroCompte === "") {
      alert('veuillez renseigner le numero de compte nom  svp')
    }
    if (item.matriculeClient === "") {
      alert('veuillez renseigner le matricule du Client depot svp')
    };

    if (item.dateExpiration === "") {
      alert('veuillez renseigner le date Expiration type svp')
    };

    if (item.solde === "") {
      alert('veuillez renseigner le solde type svp')
    };

    if (item.numeroCompte !== "" && item.matriculeClient !== "" && item.dateExpiration !== ""
      && item.solde !== "") {

      if (iddelete) {
        console.log(iddelete)
        let compte = JSON.stringify({
          agenceCreation: agenceCreation,
          dateCreation: dateCreation,
          dateExpiration: dateExpiration,
          description: description,
          matriculeClient: matriculeClient,
          numeroCompte: numeroCompte,
          solde: solde,
        });


        try {
          let result = await axios.put("http://localhost:8181/api/v1/blessing/compte/" + iddelete, compte,
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
        let compte = JSON.stringify({
          agenceCreation: agenceCreation,
          dateCreation: dateCreation,
          dateExpiration: dateExpiration,
          description: description,
          matriculeClient: matriculeClient,
          numeroCompte: numeroCompte,
          solde: solde,
        });

        try {
          let result = await axios.post("http://localhost:8181/api/v1/blessing/compte/", compte,
            { headers: { "Content-Type": "application/json" } });
          console.log(result.data);
        } catch (error) {
          console.error(error.response.data);
        }


        alert('compte créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deletecompte = async () => {
    console.warn(iddelete);
    let compte = JSON.stringify({
      agenceCreation: agenceCreation,
      dateCreation: dateCreation,
      dateExpiration: dateExpiration,
      description: description,
      matriculeClient: matriculeClient,
      numeroCompte: numeroCompte,
      solde: solde,
    });
    console.log(iddelete)


    try {
      let result = await axios.delete("http://localhost:8181/api/v1/blessing/compte/" + iddelete,
        { headers: { "Content-Type": "application/json" } });
      console.log(result.data);
    } catch (error) {
      console.error(error.response.data);
    }
    window.location.reload();
    getAllCompte();
  }

  const menuInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setAgenceCreation(element.agenceCreation);
        setDescription(element.description);
        setMatriculeClient(element.matriculeClient);
        setNumeroCompte(element.numeroCompte);
        setSolde(element.solde);
        setdateCreation(element.dateCreation);
        setdateExpiration(element.dateExpiration);
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
        <img src={imgdepot} alt="produit" />
        Gestion des Comptes
      </div>

      <div className="depotGau">
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#6E0606' }}>Ajouter un Compte</div>



        <label style={{ marginTop: '59px', marginLeft: '40px', float: 'left' }}> Numero Compte</label>
        <input required type="text" className="form-control" value={numeroCompte ? numeroCompte : nu}
          style={{ marginTop: '-27px', marginLeft: '185px', float: 'left', width: '180px', fontSize: '13px' }}
          onChange={e => setNumeroCompte(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Matricule Client</label>
        <select style={{ float: 'left', marginTop: '-30px', fontSize: '12px', marginLeft: '185px', height: '35px', width: '180px', border: ' solid #D1D7DC' }}
          value={matriculeClient} onChange={e => setMatriculeClient(e.target.value)}>
          <option style={{ fontSize: '8px' }} value=''>Sélectionner un matricule</option>
          
        </select>



        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Solde</label>
        <input required type="number" className="form-control" placeholder="" value={solde ? solde : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setSolde(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Agence Creation</label>
        <select style={{ float: 'left', marginTop: '-30px', fontSize: '12px', marginLeft: '185px', height: '35px', width: '180px', border: ' solid #D1D7DC' }}
          value={agenceCreation} onChange={e => setAgenceCreation(e.target.value)}>
          <option style={{ fontSize: '8px' }} value=''>Sélectionner un agence</option>
       
        </select>

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>date Creation</label>
        <input required type="date" className="form-control" placeholder="" value={dateCreation ? dateCreation : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setdateCreation(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>date Expiration</label>
        <input required type="date" className="form-control" placeholder="" value={dateExpiration ? dateExpiration : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setdateExpiration(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Description</label>
        <input required type="text" className="form-control" placeholder="" value={description ? description : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setDescription(e.target.value)} />


        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <br />
        <br />

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={addCompte} style={{ marginTop: '30px', marginLeft: '80px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>


        <button onClick={deletecompte} style={{ marginLeft: '10px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '500px', display: 'inline-block' }}></span>

      <div className="depotDroit">


        <Table striped bordered hover variant="danger">
          <thead>
            <tr>

              <th>Num.Compte</th>
              <th> Client</th>
              <th>solde</th>
              <th>agence Creation</th>
              <th>Date de création</th>
              <th>Date Expiration</th>
              <th>Description</th>



            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => menuInfo(item.id)} key={item.id}>

                  <td>{item.numeroCompte}</td>
                  <td>{item.matriculeClient}</td>
                  <td>{item.solde}</td>
                  <td>{item.agenceCreation}</td>
                  <td>{item.dateCreation}</td>
                  <td>{item.dateExpiration}</td>
                  <td>{item.description}</td>



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

export default Compte;