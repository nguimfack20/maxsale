import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function Gamme() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [codegamme, setCodegamme] = useState('')
  const [libellegamme, setLibellegamme] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllGamme();


  }, []);

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAllGamme = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/gammeall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function addgamme() {
    console.log(iddelete);
    let item = {
      codegamme, libellegamme
    };
    console.warn(item);
    if (item.codegamme === "") {
      alert('veuillez renseigner le code de la gamme svp')
    }
    if (item.libellegamme === "") {
      alert('veuillez renseigner le  libéllé  svp')
    };

    if (item.codegamme !== "" && item.libellegamme !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updategamme/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/gammeadd', {
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

        alert('gamme créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deletegamme = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deletegamme/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllGamme();
  }

  const gammeInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodegamme(element.codegamme);
        setLibellegamme(element.libellegamme);
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
        <img src={"gamproduit.png"} alt="gamproduit" />
        Gestion des Gamme
      </div>

      <div className="gammGauche">


        <label style={{ marginTop: '80px', marginLeft: '40px', float: 'left' }}>Code gamme</label>
        <input required type="text" className="form-control" value={codegamme ? codegamme : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setCodegamme(e.target.value)} />

        <label style={{ marginTop: '15px', marginLeft: '40px', float: 'left' }}>Libellé </label>
        <input required type="text" className="form-control" placeholder="" value={libellegamme ? libellegamme : nu}
          style={{ float: 'left', width: '180px', marginLeft: '185px', marginTop: '-27px', fontSize: '13px' }}
          onChange={e => setLibellegamme(e.target.value)} />


        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={addgamme} style={{marginLeft: '60px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
   

        <button onClick={deletegamme} style={{ border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>

      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '550px', display: 'inline-block' }}></span>

      <div className="gammDroite">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>
        
              <th>Code Gamme</th>
              <th>Libellé Gamme</th>



            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => gammeInfo(item.id)} key={item.id}>
                
                  <td>{item.codegamme}</td>
                  <td>{item.libellegamme}</td>


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



     {/*  <div className="plusbasproduitgam">
        <Link to="/produits" className="linkgamm">
          <img src={"produit.png"} alt="produit" />
          Produits
        </Link>
      </div> */}
    

    </div >
  )
}

export default Gamme;