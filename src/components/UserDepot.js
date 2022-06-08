import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function UserDepot() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [matricule, setMatricule] = useState(localStorage.getItem('usermat'));
  const [codedepot, setCodedepot] = useState('')
  const [nomdepot, setNomdepot] = useState('')
  const [datauserdepotfiltre, setDatauserdepotfiltre] = useState([]);
  const [datacodedepotfiltre, setDatacodedepotfiltre] = useState([]);
  const [datanomdepotfiltre, setDatanomdepotfiltre] = useState([]);
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAlluserdepot();
    userdepotallfiltre();
    codedepotallfiltre();
    nomdepotallfiltre();


  }, []);

  function userdepotallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/userdepotallfiltre")
      .then((res) => setDatauserdepotfiltre(res.data));

  };

  function codedepotallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/codedepotallfiltre")
      .then((res) => setDatacodedepotfiltre(res.data));

  };

  function nomdepotallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/nomdepotallfiltre")
      .then((res) => setDatanomdepotfiltre(res.data));

  };

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAlluserdepot = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/userdepotall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function adduserdepot() {
    console.log(iddelete);
    let matricu = localStorage.getItem('usermat');
    let matricule= matricu.replace(/"/g,'');
    let item = {
      matricule, codedepot, nomdepot
    };
    console.warn(item);
    if (item.matricule === "") {
      alert('veuillez renseigner le champ matricule  svp')
    }
    if (item.codedepot === "") {
      alert('veuillez renseigner le champ code depot svp')
    };
    if (item.nomdepot === "") {
      alert('veuillez renseigner le champ nom depot svp')
    };

    if (item.codedepot !== "" && item.nomdepot !== "" && item.matricule !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updateuserdepot/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/userdepotadd', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        console.warn('operation successful' + result);

        console.warn(item);

        //localStorage.setItem("user-info",JSON.stringify(result));

        alert('operation réalisée avec succès');
        //history.push("/useradd")
       // window.location.reload()
      }


    }
  }

  const deleteuserdepot = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deleteuserdepot/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAlluserdepot();
  }

  const userdepotInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setMatricule(element.matricule);
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
        Affectation des utilisateurs aux depots
      </div>

      <div className="userdepGauch">


        <label style={{ marginTop: '80px', marginLeft: '70px' }}>Login </label>
        <div style={{ marginTop: '-27px' }}>
        <select style={{fontSize: '12.5px', marginTop: '0px', float: 'left', height: '35px', marginLeft: '210px', width: '160px', border: ' solid #D1D7DC' }}
          value={matricule} onChange={e => setMatricule(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionner un matricule</option>
          {
            datauserdepotfiltre.map((item) => (

              <option key={item.id} value={item.matricule}>{item.matricule} </option>

            ))

          }
        </select>
        </div>

        <label style={{ marginTop: '35px',marginLeft: '70px'}}>Code depot</label>

        <select style={{fontSize: '13px', marginTop: '-35px', float: 'left', height: '35px', marginLeft: '210px', width: '160px', border: ' solid #D1D7DC' }}
          value={codedepot} onChange={e => setCodedepot(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionner un matricule</option>
          {
            datacodedepotfiltre.map((item) => (

              <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

            ))

          }
        </select>

     {/*    <label style={{ marginTop: '25px', marginLeft: '140px', float: 'left' }}>Nom Depot</label>
        <select style={{ marginTop: '5px', float: 'left', height: '35px', marginLeft: '100px', width: '160px', borderRadius: '100px', border: ' solid #D1D7DC' }}
          value={nomdepot} onChange={e => setNomdepot(e.target.value)}>
          <option style={{ fontSize: '12px' }} value=''>Sélectionner un matricule</option>
          {
            datanomdepotfiltre.map((item) => (

              <option key={item.id} value={item.nomdepot}>{item.nomdepot} </option>

            ))

          }
        </select> */}


        <br /> <br /> <br /> <br /> <br /> <br /> 

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={adduserdepot} style={{  marginLeft: '80px',marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
  

        <button onClick={deleteuserdepot} style={{ border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '550px', display: 'inline-block' }}></span>


      <div className="userdepoDroit">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>

              <th>Matricule</th>
              <th>Code Depot</th>
              <th>Nom Depot</th>


            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => userdepotInfo(item.id)} key={item.id}>
         
                  <td>{item.matricule}</td>
                  <td>{item.codedepot}</td>
                  <td>{item.nomdepot}</td>


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
  {/*     <div className="utiBas">
       
        <div className="gpeut">
          <img src={"depot.png"} alt="depot" />
          <a href="depot" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Depots</a>
        </div>
        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="user" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Utilisateurs</a>
        </div>
        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="profil" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>profils d'utilisateurs</a>
        </div>




      </div> */}


    </div>
  )
}

export default UserDepot;