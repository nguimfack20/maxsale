import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function EntreeSorties() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [codetype, setCodetype] = useState('')
  const [libelletype, setLibelletype] = useState('')
  const [sens, setSens] = useState('')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAlltypedoc();


  }, []);

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAlltypedoc = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/typedocumentall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function addtypedoc() {
    console.log(iddelete);
    let item = {
      codetype, libelletype, sens
    };
    console.warn(item);
    if (item.codetype === "") {
      alert('veuillez renseigner le champ code  svp')
    }
    if (item.libelletype === "") {
      alert('veuillez renseigner le champ libéllé depot svp')
    };
    if (item.sens === "") {
      alert('veuillez renseigner le champ sens depot svp')
    };

    if (item.codetype !== "" && item.libelletype !== "" && item.sens !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updatetypedocument/' + iddelete, {
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
        let result = await fetch('http://maxsalesbackend.com/api/typedocumentadd', {
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

        alert('Type de document créé avec succès');
        //history.push("/useradd")
        window.location.reload()
      }


    }
  }

  const deletetypedocument = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deletetypedocument/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAlltypedoc();
  }

  const typedocInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodetype(element.codetype);
        setLibelletype(element.libelletype);
        setSens(element.sens);
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
        <img src={"page.png"} alt="produit" />
        Entrées/Sorties
      </div>

      <div className="typedocGauch">


        <label style={{ marginTop: '80px', marginLeft: '40px', float: 'left' }}>Code </label>
        <input required type="text" className="form-control" value={codetype ? codetype : nu}
          style={{ marginTop: '-27px', marginLeft: '155px', float: 'left', width: '180px', fontSize: '13px' }}
          onChange={e => setCodetype(e.target.value)} />
          <br/>

        <label style={{  marginLeft: '10px', marginTop: '60px' }}>Nom Document</label>
        <input required type="text" className="form-control" placeholder="" value={libelletype ? libelletype : nu}
          style={{ marginTop: '-27px', marginLeft: '145px',float: 'left', width: '180px', fontSize: '13px' }}
          onChange={e => setLibelletype(e.target.value)} />
          
          <br/>

        <label style={{ marginLeft: '-310px', marginTop: '70px'}}>Sens</label>
        <div style={{ marginTop: '-27px' }}>
        <select style={{ float: 'left',  width: '180px', height: '38px', marginLeft: '143px', marginTop: '-10px', fontSize: '13px', border: ' solid #D1D7DC' }} value={sens} onChange={e => setSens(e.target.value)}>
        <option value="">votre choix</option>
          <option value="+1">+1</option>
          <option value="-1">-1</option>

        </select>
      </div>


        <br /> <br /> <br /> <br /> <br /> 

        {/* <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button> */}
        <button onClick={addtypedoc} style={{ marginLeft: '50px',  marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
     

        <button onClick={deletetypedocument} style={{  border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>
      <span style={{ float: 'left', borderLeft: '2px solid #135D74', height: '550px', display: 'inline-block' }}></span>


      <div className="typdocuDroit">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>
            
              <th>Libellé Document</th>
              <th>Code Document</th>
              <th>Sens</th>


            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => typedocInfo(item.id)} key={item.id}>
              
                  <td>{item.libelletype}</td>
                  <td>{item.codetype}</td>
                  <td>{item.sens}</td>


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

          <ul style={{ marginLeft: '350px' }} className='pagination'>
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

export default EntreeSorties;