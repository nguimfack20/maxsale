import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";

import imgdepot from '../Image/depot.png'

function Agence() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [adresse, setAdresse] = useState('')
  const [nom, setNom] = useState('')
  const [responsable, setResponsable] = useState('')
  const [type, setType] = useState('')
  const [dateCreation, setdateCreation] = useState('')
  const [boitePostale, setBoitePostale] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllSuccursale();


  }, []);

  const allSuccursale = "http://localhost:8181/api/v1/blessing/succursale"

  function getAllSuccursale() {
    setLoading(true);
    let res = axios.get(allSuccursale)
      .then((res) => setData(res.data));
    setLoading(false);
  };





  function reset() {
    window.location.reload();
  }


  async function adddepot() {
    console.log(iddelete);
    let succursale = JSON.stringify({
      nom: nom,
      responsable: responsable,
      type: type,
      adresse: adresse,
      boitePostale: boitePostale,
      dateCreation: dateCreation,
    });

    let item = { nom, responsable, type, adresse, boitePostale, dateCreation }

    if (item.nom === "") {
      alert('veuillez renseigner le champ nom  svp')
    }
    if (item.responsable === "") {
      alert('veuillez renseigner le responsable depot svp')
    };

    if (item.type === "") {
      alert('veuillez renseigner le champ type svp')
    };

    if (item.nom !== "" && item.responsable !== "" && item.type !== "") {

      if (iddelete) {
        console.log(iddelete)
        let succursale = JSON.stringify({
          nom: nom,
          responsable: responsable,
          type: type,
          adresse: adresse,
          boitePostale: boitePostale,
          dateCreation: dateCreation,
        });

        try {
          let result = await axios.put("http://localhost:8181/api/v1/blessing/succursale/" + iddelete, succursale,
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
        let succursale = JSON.stringify({
          nom: nom,
          responsable: responsable,
          type: type,
          adresse: adresse,
          boitePostale: boitePostale,
          dateCreation: dateCreation,
        });

        try {
          let result = await axios.post("http://localhost:8181/api/v1/blessing/succursale/", succursale,
            { headers: { "Content-Type": "application/json" } });
          console.log(result.data);
        } catch (error) {
          console.error(error.response.data);
        }


        alert('Succursale créée avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deletesuccursale = async () => {
    console.warn(iddelete);
    let succursale = JSON.stringify({
      nom: nom,
      responsable: responsable,
      type: type,
      adresse: adresse,
      boitePostale: boitePostale,
      dateCreation: dateCreation,
    });
    console.log(iddelete)


    try {
      let result = await axios.delete("http://localhost:8181/api/v1/blessing/succursale/" + iddelete,
        { headers: { "Content-Type": "application/json" } });
      console.log(result.data);
    } catch (error) {
      console.error(error.response.data);
    }
    window.location.reload();
    getAllSuccursale();
  }

  const menuInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setNom(element.nom);
        setAdresse(element.adresse);
        setBoitePostale(element.boitePostale);
        setResponsable(element.responsable);
        setType(element.type);
        setdateCreation(element.dateCreation);
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
        Gestion des Agences
      </div>

      <div className="depotGau">
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#6E0606' }}>Ajouter une agence/Station</div>



        <label style={{ marginTop: '59px', marginLeft: '40px', float: 'left' }}> Nom</label>
        <input required type="text" className="form-control" value={nom ? nom : nu}
          style={{ marginTop: '-27px', marginLeft: '185px', float: 'left', width: '180px', fontSize: '13px' }}
          onChange={e => setNom(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Responsable</label>
        <input required type="text" className="form-control" placeholder="" value={responsable ? responsable : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setResponsable(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Type</label>

        <select style={{ float: 'left', marginTop: '-30px', fontSize: '12px', marginLeft: '185px', height: '35px', width: '180px', border: ' solid #D1D7DC' }} value={type} onChange={e => setType(e.target.value)}>
          <option style={{ fontSize: '8px' }} value=''>Sélectionner un type</option>
          <option value="AGENCE">AGENCE</option>
          <option value="STATION">STATION</option>
        </select>


        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Adresse</label>
        <input required type="text" className="form-control" placeholder="" value={adresse ? adresse : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setAdresse(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>BP</label>
        <input required type="text" className="form-control" placeholder="" value={boitePostale ? boitePostale : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setBoitePostale(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>date Creation</label>
        <input required type="date" className="form-control" placeholder="" value={dateCreation ? dateCreation : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setdateCreation(e.target.value)} />


        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <br />
        <br />

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={adddepot} style={{ marginTop: '30px', marginLeft: '80px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>


        <button onClick={deletesuccursale} style={{ marginLeft: '10px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '500px', display: 'inline-block' }}></span>

      <div className="depotDroit">


        <Table striped bordered hover variant="danger">
          <thead>
            <tr>

              <th>Nom</th>
              <th>Type</th>
              <th>Responsable</th>
              <th>Adresse</th>
              <th>Bp</th>
              <th>Date de création</th>



            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => menuInfo(item.id)} key={item.id}>

                  <td>{item.nom}</td>
                  <td>{item.type}</td>
                  <td>{item.responsable}</td>
                  <td>{item.adresse}</td>
                  <td>{item.boitePostale}</td>
                  <td>{item.dateCreation}</td>



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

export default Agence;