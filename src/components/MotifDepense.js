import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function MotifDepense() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [codemotif, setCodemotif] = useState('')
  const [libellemotif, setLibellemotif] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllmotif();


  }, []);

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAllmotif = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/motifdepenseall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function addmotifdepense() {
    console.log(iddelete);
    let item = {
      codemotif, libellemotif
    };
    console.warn(item);
    if (item.codemotif === "") {
      alert('veuillez renseigner le code du motif svp')
    }
    if (item.libellemotif === "") {
      alert('veuillez renseigner le  libéllé  svp')
    };

    if (item.codemotif !== "" && item.libellemotif !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updatemotifdepense/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/motifdepenseadd', {
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

        alert('motif créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deletemotifdepense = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deletemotifdepense/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllmotif();
  }

  const motifInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodemotif(element.codemotif);
        setLibellemotif(element.libellemotif);
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
        <img src={"caisse.png"} alt="motif depense" />
        Gestion des Motifs de depenses
      </div>

      <div className="gammGau">


        <label style={{ marginTop: '80px', marginLeft: '50px', float: 'left' }}>Code Motif</label>
        <input required type="text" className="form-control" value={codemotif ? codemotif : nu}
          style={{ borderRadius: '100px', float: 'left', width: '180px', marginTop: '110px', marginLeft: '-125px', fontSize: '13px' }}
          onChange={e => setCodemotif(e.target.value)} />

        <label style={{ marginTop: '-65px', marginLeft: '240px', float: 'left' }}>Libellé Motif </label>
        <input required type="text" className="form-control" placeholder="" value={libellemotif ? libellemotif : nu}
          style={{ float: 'left', borderRadius: '100px', width: '180px', marginLeft: '200px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setLibellemotif(e.target.value)} />


        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

        <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button>
        <button onClick={addmotifdepense} style={{ borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
        <br /> <br />

        <button onClick={deletemotifdepense} style={{ borderRadius: '100px', marginLeft: '150px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>


      <div className="gammDroi">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>
              <th>N°</th>
              <th>Code Motif</th>
              <th>Libellé </th>



            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => motifInfo(item.id)} key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.codemotif}</td>
                  <td>{item.libellemotif}</td>


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



      <div className="plusbasproduitgam">
        <Link to="/produits" className="linkgamm">
          <img src={"produit.png"} alt="produit" />
          Produits
        </Link>
      </div>
    

    </div >
  )
}

export default MotifDepense;