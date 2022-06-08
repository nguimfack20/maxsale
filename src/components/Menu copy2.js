import React, { useState, useEffect } from 'react';

import { useHistory, Link } from 'react-router-dom';
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';


const Menu = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);

  const [menu, setMenu] = useState('')
  const [sousmenu, setSousmenu] = useState('')
  const [codemenu, setCodemenu] = useState('')
  const [etat, setEtat] = useState('ON')

  const history = useHistory();


  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }
    // setDepotbd("bar10");
    const getAllMenu = async () => {
      setLoading(true);
      const res = await axios.get('http://maxsalesbackend.com/api/menuall');
      setData(res.data);
      setLoading(false);

    }
    getAllMenu();
    console.warn(data.menu)


  }, []);





  function reset() {
    window.location.reload();
  }


  async function addmenu() {
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

      let result = await fetch('http://maxsalesbackend.com/api/menuadd', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(item)
      });
      result = await result.json();
      console.warn('voici le result' + result);
      //localStorage.setItem("user-info",JSON.stringify(result));

      alert('un menu/sous menu a été ajouté avec succès');
      //history.push("/useradd")
      window.location.reload()
    }
  }

  const indexOfLastPropfil = currentPage * postPerPage;
  const indexOfFistPropfil = indexOfLastPropfil - postPerPage;
  const currentPost = data.slice(indexOfFistPropfil, indexOfLastPropfil);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
    pageNumber.push(i);
  }



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
        <input required type="text" className="form-control"
          style={{ borderRadius: '100px', float: 'left', width: '180px', marginTop: '110px', marginLeft: '-145px', fontSize: '13px' }}
          onChange={e => setMenu(e.target.value)} />

        <label style={{ marginTop: '-65px', marginLeft: '240px', float: 'left' }}>Sous Menu</label>
        <input required type="text" className="form-control" placeholder=""
          style={{ float: 'left', borderRadius: '100px', width: '180px', marginLeft: '200px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setSousmenu(e.target.value)} />


        <label style={{ marginTop: '50px', marginLeft: '70px', float: 'left' }}>Code</label>
        <input required type="text" className="form-control"
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
        <button style={{ marginLeft: '60px', borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Modifier </button>
        <button style={{ borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimer </button>

      </div>


      <div className="gammDroi">

        <Table striped bordered hover variant="info">
          <thead>
            <tr>
              <th>N°</th>
              <th>Menu</th>
              <th>Sous Menu</th>
              <th>Code </th>
              <th>Etat</th>

            </tr>
          </thead>
          <tbody>
            {

              currentPost.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
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
        <nav>
          <ul className="pagination">
            {
               
              pageNumber.map(number => (
                <li key={number} className="page-item">
                  <a onClick={() => paginate(number)} href="!#" className="page-link">
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

export default Menu;