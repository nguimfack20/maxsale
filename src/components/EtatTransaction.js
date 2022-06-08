import { useState, useEffect } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import Moment from 'moment';

import { useHistory, Link } from 'react-router-dom';
import axios from "axios";
import Posts from './Data';
import Pagination from './Pagination';


function EtatTransaction() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const [codedepot, setCodedepot] = useState("");
  const [codedepottab, setCodedepottab] = useState([]);
  const [entresortietab, setEntresortietab] = useState([]);
  const [matriculetab, setMatriculetab] = useState([]);
  const [codegamme, setCodegamme] = useState("");
  const [datedeb, setDatedeb] = useState("");
  const [heuredeb, setHeuredeb] = useState('12:00');
  const [datetimedeb, setDatetimedeb] = useState("");
  const [datetimefin, setDatetimefin] = useState("");
  const [datefin, setDatefin] = useState("");
  const [heurefin, setHeurefin] = useState('12:00');
  const [transaction, setTransaction] = useState("");
  const [transactiontab, setTransactiontab] = useState([]);

  const [datacodegammefiltre, setDatacodegammefiltre] = useState([]);
  const [codProd, setCodProd] = useState("");
  const [libelleprod, setLibelleprod] = useState("");

  const [qtephy, setQtephy] = useState(0);
  const [matricule, setMatricule] = useState(localStorage.getItem('usermat'));

  const [qtetheo, setQtetheo] = useState(0);
  const [tarifachat, setTarifachat] = useState(0);

  const [ecart, setEcart] = useState(0);
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const history = useHistory();
  const [iddelete, setIddelete] = useState('');

  useEffect(() => {

    if (!localStorage.getItem("user-info")) {
      history.push("/")
    }

    let matricu = matricule;
    let matricules = matricule.replace(/"/g, '');
    // const str2= matricule.replace(/.$/, ''); supprime le dernier caractere par espace
    setMatricule(matricules)
    getAllTypetransation();
    getAllMatricule();
    getAllcodedepot();


    /* sa marche   
    const formatDate = Moment().format('DD-MM-YYYY')
      const formatDate1 = Moment().format('YYYY-MM-DD')
      const formatDate3 = Moment().format("MMM Do YY");
  
      console.log(formatDate)
      console.log(formatDate1) */

    getAllproduit();
    codegammeallfiltre();
    console.log(matricules)


  }, []);

  const getAllTypetransation = async () => {
    let res = axios.get('http://maxsalesbackend.com/api/transactionAll')
      .then((res) => setTransactiontab(res.data));

    //console.log(transactiontab)

  }

  const getAllcodedepot = async () => {
    let res = axios.get('http://maxsalesbackend.com/api/codedepotallES')
      .then((res) => setCodedepottab(res.data));

    //console.log(codedepottab)

  }


  const getAllMatricule = async () => {
    let res = axios.get('http://maxsalesbackend.com/api/allmatricule')
      .then((res) => setMatriculetab(res.data));

  }


  const rechercher = async (codedepot, transaction, datedeb, heuredeb, datefin, heurefin) => {
    let item = {
      datedeb, heuredeb, datefin, heurefin, transaction, matricule, codedepot
    };

    /*  let d = new Date();
     let ajourMois = d.getDate();
     let amois = d.getMonth();
     let ayear = d.getFullYear(); */


    /*  const datetimedeb = datedeb+' '+heuredeb 
     const datetimefin = datefin+' '+heurefin  */

    /*     const formatDate = Moment().format('YYYY-MM-DD').datedeb
        console.warn(formatDate); */

    /* setDatetimedeb(datedeb+' '+heuredeb )
    setDatetimefin(datefin+' '+heurefin ) */




    console.warn(item);
    if (item.datedeb === "") {
      alert('veuillez renseigner la date de debut  svp')
    }
    if (item.transaction === "") {
      alert('veuillez renseigner le type de transaction  svp')
    };
    if (item.datefin === "") {
      alert('veuillez renseigner la date de fin  svp')
    };


    if (item.datedeb !== "" && item.datefin !== "" && item.transaction !== "") {


      //console.log(iddelete)
      //let item2 = {codedepot,datetimedeb,datetimefin,transaction,matricule}
      // console.warn(item2);
      const res = await axios.get('http://maxsalesbackend.com/api/etattransaction/'
        // +codedepot+'/'+datetimedeb+'/'+datetimefin+'/'+transaction+'/'+matricule);
        +codedepot+ '/' +datedeb+ '/' +datefin+ '/' +heuredeb+ '/' +heurefin+ '/' +transaction+ '/' +matricule);

      setEntresortietab(res.data);



      console.warn(res.data);
      //console.warn(entresortietab);
      console.warn(res.data);
      //localStorage.setItem("user-info",JSON.stringify(result));

      //alert('mise à jour effectué avec succès');
      //history.push("/useradd")
      // window.location.reload()
    }
  }



  const getAllproduit = async () => {
    setLoading(true);
    const res = await axios.get('http://maxsalesbackend.com/api/produitall');
    //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setData(res.data);
    setLoading(false);

  }

  function reset() {
    window.location.reload();
  }

  function codegammeallfiltre() {
    let res = axios.get("http://maxsalesbackend.com/api/codegammeallfiltre")
      .then((res) => setDatacodegammefiltre(res.data));

  };


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




  const produitInfo = (id) => {

    data.forEach(element => {
      if (element.id === id) {

        setCodegamme(element.codegamme);
        setCodProd(element.codProd);
        setLibelleprod(element.libelleprod);
        setTarifachat(element.tarifachat);
        setIddelete(element.id);

        console.log(element)

      }


    });

  }

  const indexOfLastMenu = currentPage * postPerPage;
  const indexOfFistMenu = indexOfLastMenu - postPerPage;
  const currentMenu = entresortietab.slice(indexOfFistMenu, indexOfLastMenu);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(entresortietab.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <HeadOffline />
      <SideBar />

      <div className="topproduit">
        <img style={{ marginRight: '10px' }} src={"tran.png"} alt="produit" />
        Etats des Transactions
      </div>

      <div className="milieuprodui">
        <div style={{ width: '1080px', height: '70px' }}>

          <div style={{ marginLeft: '15px', float: 'left', width: '130px', height: '70px' }}>
            <label style={{ marginTop: '5px', marginLeft: '23px' }}>Depot</label>

            <select onClick={() => getAllcodedepot()}
              style={{ height: '35px', marginLeft: '1px', width: '90px', border: ' solid #D1D7DC', fontSize: '11px' }} value={codedepot}
              onChange={e => setCodedepot(e.target.value)}>
              <option style={{ fontSize: '11px' }} value=''>Sélectionner un depot</option>
              {
                codedepottab.map((item) => (

                  <option key={item.id} value={item.codedepot}>{item.codedepot} </option>

                ))

              }
            </select>

          </div>

          <div style={{ marginLeft: '5px', float: 'left', width: '130px', height: '70px' }}>
            <label style={{ marginTop: '5px', marginLeft: '23px' }}>Date debut</label>

            <input value={datedeb ? datedeb : null} required type="date" className="form-control" placeholder=""
              style={{
                height: '35px', borderRadius: '100px',
                width: '120px', marginLeft: '0px', fontSize: '13px'
              }}
              onChange={e => setDatedeb(e.target.value)} />

          </div>

          <div style={{ marginLeft: '20px', float: 'left', width: '130px', height: '70px' }}>
            <label style={{ marginTop: '5px', marginLeft: '13px' }}>Heure debut</label>

            <input value={heuredeb ? heuredeb : null} required type="time" className="form-control" placeholder=""
              style={{
                height: '35px', borderRadius: '100px',
                width: '120px', marginLeft: '0px', fontSize: '13px'
              }}
              onChange={e => setHeuredeb(e.target.value)} />

          </div>

          <div style={{ marginLeft: '20px', float: 'left', width: '130px', height: '70px' }}>
            <label style={{ marginTop: '5px', marginLeft: '23px' }}>Date de fin</label>

            <input value={datefin ? datefin : null} required type="date" className="form-control" placeholder=""
              style={{
                height: '35px', borderRadius: '100px',
                width: '120px', marginLeft: '0px', fontSize: '13px'
              }}
              onChange={e => setDatefin(e.target.value)} />

          </div>

          <div style={{ marginLeft: '20px', float: 'left', width: '130px', height: '70px' }}>
            <label style={{ marginTop: '5px', marginLeft: '23px' }}>Heure de fin</label>

            <input value={heurefin ? heurefin : null} required type="time" className="form-control" placeholder=""
              style={{
                height: '35px', borderRadius: '100px',
                width: '120px', marginLeft: '0px', fontSize: '13px'
              }}
              onChange={e => setHeurefin(e.target.value)} />

          </div>


          <div style={{ marginLeft: '20px', float: 'left', width: '160px', height: '70px' }}>
            <label style={{ marginTop: '5px', marginLeft: '13px' }}>Type de Transaction</label>

            {/*             <input value={heurefin ? heurefin : null} required type="text" className="form-control" placeholder=""
              style={{
                height: '35px', borderRadius: '100px',
                width: '120px', marginLeft: '30px', fontSize: '13px'
              }}
              onChange={e => setHeurefin(e.target.value)} /> */}


            <select onClick={() => getAllTypetransation(transaction)}
              style={{ height: '35px', marginLeft: '20px', width: '130px', border: ' solid #D1D7DC', fontSize: '11px' }} value={transaction}
              onChange={e => setTransaction(e.target.value)}>
              <option style={{ fontSize: '11px' }} value=''>Sélectionner un type</option>
              {
                transactiontab.map((item) => (

                  <option key={item.id} value={item.codetype}>{item.codetype} </option>

                ))

              }
            </select>



          </div>

          <div style={{ marginLeft: '10px', float: 'left', width: '160px', height: '70px' }}>
            <label style={{ marginTop: '5px', marginLeft: '53px' }}>Personnel</label>

            <select onClick={() => getAllMatricule(matricule)}
              style={{ height: '35px', marginLeft: '20px', width: '130px', border: ' solid #D1D7DC', fontSize: '11px' }} value={matricule}
              onChange={e => setMatricule(e.target.value)}>
              <option style={{ fontSize: '11px' }} value=''>Sélectionner un personnel</option>
              <option style={{ fontSize: '11px' }} value='ALL'>ALL</option>
              {
                matriculetab.map((item) => (

                  <option key={item.id} value={item}>{item} </option>

                ))

              }
            </select>

          </div>


          {/* <button onClick={deleteproduit} style={{ float: 'left', marginTop: '-30px', marginLeft: '970px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Supprimé </button> */}




        </div>
        <div style={{ marginLeft: '350px', float: "left", width: '800px', height: '50px' }}>
          <button onClick={() => rechercher(codedepot, transaction, datedeb, heuredeb, datefin, heurefin)} style={{ marginLeft: '10px', float: 'left', marginTop: '15px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Rechercher </button>

          <button style={{ marginLeft: '30px', float: 'left', marginTop: '15px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >PDF </button>
          <button style={{ marginLeft: '30px', float: 'left', marginTop: '15px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >EXCEL </button>

        </div>


      </div>




      <div className="basproduiEtattransaction">



        <Table striped bordered hover variant="info">
          <thead>
            <tr>

              <th>Depot</th>
              <th>Transaction</th>
              <th>Code Produit</th>
              <th>Libéllé</th>
              <th>Quantité</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Effectué par</th>


            </tr>
          </thead>
          <tbody>
            {
              currentMenu.map((item) => (
                <tr onClick={() => produitInfo(item.id)} key={item.id}>

                  <td>{item.codedepot}</td>
                  <td>{item.typeope}</td>
                  <td>{item.codProd}</td>
                  <td>{item.libelleProd}</td>
                  <td>{item.qte}</td>
                  <td>{item.valqte}</td>
                  <td>{item.updated_at}</td>
                  <td>{item.matricule}</td>


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

          <ul style={{ marginLeft: '480px' }} className='pagination'>
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

export default EtatTransaction;