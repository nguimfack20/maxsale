import { useState, useEffect } from "react";

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function Menu() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [menu, setMenu] = useState('')
  const [sousmenu, setSousmenu] = useState('')
  const [codemenu, setCodemenu] = useState('')
  const [etat, setEtat] = useState('ON')
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }


    getAllMenu();


  }, []);

  /*   function getAllMenu() {
      let res = axios.get("http://maxsalesbackend.com/api/menuall")
        .then((res) => setData(res.data));
    }; */
  const getAllMenu = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/menuall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }



  function reset() {
    window.location.reload();
  }


  async function addmenu() {
    console.log(iddelete);
    let item = {
      menu, sousmenu, codemenu, etat
    };
    console.warn(item);
    if (item.menu === "") {
      alert('veuillez renseigner le champ menu svp')
    }
    if (item.sousmenu === "") {
      alert('veuillez renseigner le champ sousmenu svp')
    };
    if (item.codemenu === "") {
      alert('veuillez renseigner le champ codemenu svp')
    }


    if (item.menu !== "" && item.sousmenu !== "" && item.codemenu !== "") {

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updatemenu/' + iddelete, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        console.warn(result);
        //localStorage.setItem("user-info",JSON.stringify(result));

        alert('mise à jour effectué avec succès');
        //history.push("/useradd")
        window.location.reload()

      }

      if (!iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/menuadd', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(item)
        });
        result = await result.json();
        console.warn(result);
        // console.warn(result.length===0);
        //console.warn(Array.isArray(result));
        if (result.errorcode) {
          alert('erreur,ce code existe deja,merci de changer');

        }


        if (result.error) {
          alert('Ce sous menu existe déjà');

        }

        if (!result.error && !result.errorcode) {
          alert('menu/sousmenu créé avec succès');
          //history.push("/useradd")
           // window.location.reload()

        }



      }


    }
  }

  const deletemenu = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deletemenu/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllMenu();
  }

  const menuInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodemenu(element.codemenu);
        setMenu(element.menu);
        setSousmenu(element.sousmenu);
        setEtat(element.etat);
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
        <img src={"menu.png"} alt="produit" />
        Gestion des Menus
      </div>

      <div className="gammGau">


        <label style={{ marginTop: '80px', marginLeft: '50px', float: 'left' }}>Nom du Menu</label>
        <input required type="text" className="form-control" value={menu ? menu : nu}
          style={{ borderRadius: '100px', float: 'left', width: '180px', marginTop: '110px', marginLeft: '-145px', fontSize: '13px' }}
          onChange={e => setMenu(e.target.value)} />

        <label style={{ marginTop: '-65px', marginLeft: '240px', float: 'left' }}>Sous Menu</label>
        <input required type="text" className="form-control" placeholder="" value={sousmenu ? sousmenu : nu}
          style={{ float: 'left', borderRadius: '100px', width: '180px', marginLeft: '200px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setSousmenu(e.target.value)} />


        <label style={{ marginTop: '50px', marginLeft: '70px', float: 'left' }}>Code</label>
        <input required type="text" className="form-control" value={codemenu ? codemenu : nu}
          style={{ borderRadius: '100px', float: 'left', width: '180px', marginTop: '80px', marginLeft: '-100px', fontSize: '13px' }}
          onChange={e => setCodemenu(e.target.value)} />

        <label style={{ marginTop: '-65px', marginLeft: '270px', float: 'left' }}>Etat</label>


        <select style={{ float: 'left', borderRadius: '100px', width: '180px', height: '38px', marginLeft: '200px', marginTop: '-35px', fontSize: '13px', border: ' solid #D1D7DC' }} value={etat} onChange={e => setEtat(e.target.value)}>
          <option value="ON">ON</option>
          <option value="OFF">OFF</option>

        </select>

        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

        <button onClick={reset} style={{ marginLeft: '30px', borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '30px', width: '170px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button>
        <button onClick={addmenu} style={{ borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
        <br /> <br />

        <button onClick={deletemenu} style={{ borderRadius: '100px', marginLeft: '150px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>


      <div className="menu">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>

              <th>Menu</th>
              <th>Sous Menu</th>
              <th>Code </th>
              <th>Etat</th>

            </tr>
          </thead>
          <tbody>
            {

              currentMenu.map((item) => (
                <tr onClick={() => menuInfo(item.id)} key={item.id}>

                  <td>{item.menu}</td>
                  <td>{item.sousmenu}</td>
                  <td>{item.codemenu}</td>
                  <td>{item.etat}</td>

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

          <ul style={{ marginLeft: '500px' }} className='pagination'>
            {
              pageNumber.map(number => (
                <li style={{ marginLeft: '10px' }} key={number} className='page-item'>
                  <a onClick={() => paginate(number)} href='#' className="page-link">
                    {number}
                  </a>

                </li>
              ))
            }
          </ul>

        </nav>

      </div>
      {/*      <div className="utiBas">

        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="profil" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>profils d'utilisateurs</a>
        </div>
        <div className="gpeut">
          <img src={"usergroup.png"} alt="usergroupe" />
          <a href="user" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Utilisateurs</a>
        </div>

        <div className="gpesite">
          <img src={"depot.png"} alt="site" />

          <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="userdepot">Utilisateur && Depots</a></div>




      </div> */}

    </div>
  )
}

export default Menu;