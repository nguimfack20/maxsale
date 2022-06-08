import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function Depot() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [nomdepot, setNomdepot] = useState('')
  const [codedepot, setCodedepot] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllDepot();


  }, []);

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAllDepot = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/depotall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function adddepot() {
    console.log(iddelete);
    let item = {
      codedepot, nomdepot
    };
    console.warn(item);
    if (item.codedepot === "") {
      alert('veuillez renseigner le champ code depot svp')
    }
    if (item.nomdepot === "") {
      alert('veuillez renseigner le champ libéllé depot svp')
    };

    if (item.codedepot !== "" && item.nomdepot !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updatedepot/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/depotadd', {
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

        alert('depot créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deletedepot = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deletedepot/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllDepot();
  }

  const menuInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodedepot(element.codedepot);
        setNomdepot(element.nomdepot);
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
  /*  let active = 1;
   for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
     pageNumber.push(
       <Pagination.Item key={i} active={i === active}>
         {i}
       </Pagination.Item>);
   } */
  const nu = ' ';


  return (
    <div>
      <HeadOffline />
      <SideBar />
      <div className="topgamme">
        <img src={"depot.png"} alt="produit" />
        Gestion des Depots
      </div>

      <div className="depotGau">
      <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#135D74' }}>Ajouter un depot</div>



        <label style={{ marginTop: '59px', marginLeft: '40px', float: 'left' }}> Code du Depot</label>
        <input required type="text" className="form-control"  value={codedepot ? codedepot : nu}
          style={{ marginTop: '-27px', marginLeft: '185px', float: 'left', width: '180px', fontSize: '13px' }}
           onChange={e => setCodedepot(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Nom du Depot</label>
        <input required type="text" className="form-control" placeholder="" value={nomdepot ? nomdepot : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setNomdepot(e.target.value)} /> 


        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={adddepot} style={{marginLeft: '80px',  marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>


        <button onClick={deletedepot} style={{ marginLeft: '10px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '500px', display: 'inline-block' }}></span>

      <div className="depotDroit">


        <Table striped bordered hover variant="info">
          <thead>
            <tr>
      
              <th>Libellé Depot</th>
              <th>Code Depot</th>


            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => menuInfo(item.id)} key={item.id}>
             
                  <td>{item.nomdepot}</td>
                  <td>{item.codedepot}</td>


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
   {/*    <div className="utiBas">
        <div className="gpesite">
          <img src={"depot.png"} alt="site" />

          <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}
            href="userdepot">Utilisateur && Depots</a></div>



        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="profil" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>profils d'utilisateurs</a>
        </div>
        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="user" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Utilisateurs</a>
        </div>




      </div> */}

    </div>
  )
}

export default Depot;