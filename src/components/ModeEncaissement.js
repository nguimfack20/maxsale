import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function ModeEncaissement() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [codemode, setCodemode] = useState('')
  const [libellemode, setLibellemode] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllModeencaissementadd();


  }, []);

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAllModeencaissementadd = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/modeencaissementall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function addmodeencaissement() {
    console.log(iddelete);
    let item = {
       codemode, libellemode
    };
    console.warn(item);
    if (item.codemode === "") {
      alert('veuillez renseigner le code  svp')
    }
    if (item.libellemode === "") {
      alert('veuillez renseigner le  libéllé  svp')
    };

    if (item.codemode !== "" && item.libellemode !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updatemodeencaissement/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/modeencaissementadd', {
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

        alert('Mode créé avec succès');
        //history.push("/useradd")
       window.location.reload()
      }


    }
  }

  const deletemodeencaissement = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deletemodeencaissement/' +iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllModeencaissementadd();
  }

  const modeInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodemode(element.codemode);
        setLibellemode(element.libellemode);
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
        <img style={{width:'40px'}} src={"modeen.png"} alt="gamproduit" />
        Gestion des Modes d'encaissements
      </div>

      <div className="gammModeencai">


        <label style={{ marginTop: '80px', marginLeft: '50px', float: 'left' }}>Code </label>
        <input required type="text" className="form-control" value={codemode ? codemode : nu}
          style={{  marginTop: '-27px', marginLeft: '145px' , float: 'left', width: '180px',fontSize: '13px' }}
          onChange={e => setCodemode(e.target.value)} />

        <label style={{ marginTop: '85px',marginLeft: '54px'  }}>Libellé </label>
        <input required type="text" className="form-control" placeholder="" value={libellemode ? libellemode : nu}
          style={{marginTop: '-27px', marginLeft: '145px' , float: 'left', width: '180px', fontSize: '13px' }}
          onChange={e => setLibellemode(e.target.value)} />


        <br /> <br /> <br /> <br /> <br /> 

       <button onClick={addmodeencaissement} style={{marginLeft: '45px' , marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
      
  
        <button  onClick={deletemodeencaissement}  style={{   border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>
      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '550px', display: 'inline-block' }}></span>


      <div className="modeencaiDroit">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>
         
              <th>Code </th>
              <th>Libellé </th>
             
             

            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => modeInfo(item.id)} key={item.id}>
            
                  <td>{item.codemode}</td>
                  <td>{item.libellemode}</td>
                 

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

export default ModeEncaissement;