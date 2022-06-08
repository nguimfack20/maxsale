import { useState, useEffect } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function Inventaire() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [codegamme, setCodegamme] = useState("");
  const [libelleProd, setLibelleProd] = useState("");
  const [datacodedepotfiltre, setDatacodedepotfiltre] = useState([]);
  const [codedepot, setCodedepot] = useState("");
  const [codProd, setCodProd] = useState("");
  const [matricule, setMatricule] = useState(localStorage.getItem('usermat'));
  const [qtephy, setQtephy] = useState("");
  const [qtetheo,setQtetheo] = useState("");
  const [ecart, setEcart] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [statut, setStatut] = useState("");
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');

  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }

    let d = new Date();
    //date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
   //console.log(date);

   setDate(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate());


    getAllproduit();
    codedepotallfiltre();
    console.log(data);


  }, []);

  const getAllproduit = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/produitall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    console.log(data);
    setLoading(false);

  }

  console.log(qtetheo)

  function reset() {
    window.location.reload();
  }

  function codedepotallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/codedepotallfiltre")
      .then((res) => setDatacodedepotfiltre(res.data));

  };


  async function addinventaire() {
    console.log(data)
    console.log(iddelete);
    let matricule= matricule.replace(/"/g,'');
    let item = {
      codedepot,codProd,libelleProd,codegamme, matricule, qtephy,qtetheo,ecart,description,date
    };
    console.warn(item);

    

      if (iddelete) {
        console.log(iddelete)
        let result = await fetch('http://maxsalesbackend.com/api/updateproduit/' +iddelete, {
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

        //alert('mise à jour effectué avec succès');
        //history.push("/useradd")
        //window.location.reload()

      }

      if (!iddelete) {
        let result = await fetch('http://maxsalesbackend.com/api/produitadd', {
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

       // alert('Produit créé avec succès');
        //history.push("/useradd")
        //window.location.reload()
      }


    
  }

  const deleteproduit = async () => {
    console.warn(iddelete);
    let result = await fetch('http://maxsalesbackend.com/api/deleteproduit/' + iddelete, {
      method: 'DELETE',
    });
    let re = await result.json();
    console.warn("delete ", re);
    window.location.reload();
    getAllproduit();
  }

  //const verifTouche2 = (event) => {
  const myFunction = () =>{
    alert("You pressed a key inside the input field");
  }
   /*  var keycode;

    keycode = event.which;
    if (window.event){ 
      keycode = window.event.keyCode;
    }
    if ( keycode == 13 ){
      alert('touche entree')
    }	
  } */

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      console.log('You must have pressed Enter ');
     // document.getElementById("5").focus();
      //focus();
    }
  }

 let tab =[]

 const qt = 0;
  
  const inventaireInfo = (id) => {

    console.log('okkkkkkkkkkkk')
    console.log(qtephy)

    console.log(qtephy);
    data.forEach(element => {
      if (element.id === id) {

        setCodedepot(element.codedepot);
        setCodProd(element.codProd);
        setLibelleProd(element.libelleprod);
        setCodegamme(element.codegamme);
        //setLibell(element.libelleprod);
        setIddelete(element.id);

        console.log(element);
        tab.push(element);
        console.log(qtephy)

      }
    });
    console.log(tab)

  }
 

/*   var indic=0;
  function changeColrInputQtePhy() {
    if (indic==0)
	{
	document.getElementById("inputqtephy").style.backgroundColor="red";
	indic=1;
	}else
	{
    document.getElementById("inputqtephy").style.backgroundColor="red";
	indic=0;	
	}
    console.log(indic);
    //document.getElementById('inputqtephy').style.backgroundColor='red';
    
  } */

  

  const indexOfLastMenu = currentPage * postPerPage;
  const indexOfFistMenu = indexOfLastMenu - postPerPage;
  const currentMenu = data.slice(indexOfFistMenu, indexOfLastMenu);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
    pageNumber.push(i);
  }



  return (
    <div>
      <HeadOffline />
      <SideBar />

      <div className="topproduit">
        <img src={"produit.png"} alt="produit" />
        Création des inventaires
      </div>

      <div className="milieuprodui">

      <br/>
      <label style={{ marginTop: '5px', marginLeft: '63px' }}>Depot</label>
       

 <select style={{ height: '28px', width: '90px', borderRadius: '100px', border: ' solid #D1D7DC', marginTop: '5px',marginLeft: '5px', fontSize: '13px' }} value={codedepot} onChange={e => setCodedepot(e.target.value)}>
<option style={{ fontSize: '12px' }} value=''>Sélectionner un depot</option>
            {
              datacodedepotfiltre.map((item) => (

                <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

              ))

            }
          </select> 

          <label style={{ marginTop: '5px', marginLeft: '63px',marginRight: '5px' }}>Date</label>
          <input type="text" readOnly value={date} style={{ width: '100px',backgroundColor:'#DFDFE2',border: '2px solid #ACD3F2' }} />

        <button onClick={addinventaire} style={{ borderRadius: '100px', marginLeft: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Valider </button>
 </div>


      <div className="basproduiniventaire">



        <Table striped bordered hover variant="info">
          <thead>
            <tr>
   
              <th>GAMME</th>
              <th>Code Produit</th>
              <th>Designation</th>
              <th>the</th>
              <th>phy</th>
              <th>ecart</th>
              <th>description</th>
   

            </tr>
          </thead>
          <tbody>
            {

              // currentMenu.map((item) => (
                currentMenu.map((item) => (
                <tr onClick={() => inventaireInfo(item.id)} key={item.id} id={item.id}
                onKeyPress={handleKeyPress}>
           
                  <td>{item.codegamme}</td>
                  <td>{item.codProd}</td>
                  <td>{item.libelleprod}</td>
                  <td>{item.qtetheo ? item.qtetheo : '0' }</td>
                  <td style={{width:'70px'}}><input
                    id="inputqtephy" type='number' style={{
                    width:'70px',height:'30px'}} placeholder="0" onChange={e => setQtephy(e.target.value)}
                  /></td>
                  <td>{item.ecart}</td>
                  {/* onChange={e => setTarifWeek(e.target.value)} */}
                  <td>{item.statut}</td>


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
        {/*    
        <Pagination postPerPage={postPerPage} totalPosts={data.length} paginate={paginate}  /> */}
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
  {/*     
      <div className="plusbasproduitgam">
        <Link to="/gamme" className="linkgamm">
          <img src={"gamproduit.png"} alt="produit" />
          Gamme de Produits
        </Link>
      </div> */}
       <div className="utiBas">

<div className="gpeut">
  <img src={"gamproduit.png"} alt="usergroupe" />
  <a href="gamme" style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }}>Gamme de Produits</a>
</div>
<div className="gpepage">
  <img src={"caisse.png"} alt="page" />
  <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="tarif">Tarifs</a></div>

<div className="gpesite">
  <img src={"caisse.png"} alt="site" />
        
        <a style={{ textDecoration: 'none', color: 'black', marginLeft: '8px' }} href="produittarif">Tarifs des Produits</a></div>




</div>
    </div>
    
  )
}

export default Inventaire;