import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function Tarif() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [codetarif, setCodetarif] = useState('')
  const [libelletarif, setLibelletarif] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllTarif();


  }, []);

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAllTarif = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/tarifall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function adddtarif() {
    console.log(iddelete);
    let item = {
      codetarif, libelletarif
    };
    console.warn(item);
    if (item.codetarif === "") {
      alert('veuillez renseigner le code svp')
    }
    if (item.libelletarif === "") {
      alert('veuillez renseigner le champ libéllé svp')
    };

    if (item.codetarif !== "" && item.libelletarif !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updatetarif/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/tarifadd', {
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

  const deletetarif = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deletetarif/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllTarif();
  }

  const menuInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodetarif(element.codetarif);
        setLibelletarif(element.libelletarif);
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
        <img src={"caisse.png"} alt="tarif" />
        Gestion des Tarifs
      </div>

      <div className="tarifGauc">


        <label style={{ marginTop: '80px', marginLeft: '40px', float: 'left' }}>Code Tarif</label>
        <input required type="text" className="form-control" value={codetarif ? codetarif : nu}
          style={{ float: 'left', width: '180px', marginTop: '-27px', marginLeft: '145px', fontSize: '13px' }}
          onChange={e => setCodetarif(e.target.value)} />

        <label style={{ marginTop: '45px', marginLeft: '40px', float: 'left' }}>Libellé</label>
        <input required type="text" className="form-control" placeholder="" value={libelletarif ? libelletarif : nu}
          style={{ float: 'left', width: '180px', marginTop: '-27px', marginLeft: '145px', fontSize: '13px' }}
          onChange={e => setLibelletarif(e.target.value)} />


        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /><br />

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={adddtarif} style={{ marginLeft: '90px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
        <button onClick={deletetarif} style={{ border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>



      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '550px', display: 'inline-block' }}></span>

      <div className="tarifDroi">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>
         
              <th>Code Tarif</th>
              <th>Libellé Tarif</th>



            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => menuInfo(item.id)} key={item.id}>
                 
                  <td>{item.codetarif}</td>
                  <td>{item.libelletarif}</td>



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
   {/*    <div className="utiBastarif">
        <div className="gpesitetarif">
          <img src={"produit.png"} alt="site" />

          <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}
            href="produits">Produit</a></div>



        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="produittarif" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Produits && Tarifs</a>
        </div>





      </div> */}

    </div>
  )
}

export default Tarif;