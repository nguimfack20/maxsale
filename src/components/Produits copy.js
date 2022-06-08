import { useState } from "react";
import HeadOffline from "./HeadOffline";
import SideBar from "./SideBar";
import { Button, Table } from 'react-bootstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function Produits() {
  const [gamme, setGamme] = useState("");
  const [codProd, setCodProd] = useState("");
  const [libelle, setLibelle] = useState("");
  const [tarifVen, setTarifVen] = useState("");
  const [tarifAch, setTarifAch] = useState("");
  const [tarifWeek, setTarifWeek] = useState("");
  const [bonus, setBonus] = useState("");
  const [test, setTest] = useState("");

   function top(){
    console.warn("super")
    
    setGamme("CHAMPAGNE")
    setCodProd("ARMAND_BR")
    setLibelle("ARMAND DE BRIGNAC")
    setTarifAch("230000")
    setTarifVen("600000")
    setTarifWeek("600000")
    setBonus("500")

  }

   function reset(){
    window.location.reload();
  }


  return (
    <div>
      <HeadOffline />
      <SideBar />

      <div className="topproduit">
        <img src={"produit.png"} alt="produit" />
        Produits
      </div>

      <div className="milieuprodui">

        <label style={{ marginTop: '5px', marginLeft: '23px' }}>Gamme</label>
        <input value={gamme? gamme:null} required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '-5px', fontSize: '13px' }}
          onChange={e => setGamme(e.target.value)} />

        <label style={{ marginTop: '-60px', marginLeft: '168px', float: 'left' }}>Code Prod.</label>
        <input value={codProd? codProd:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '140px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setCodProd(e.target.value)} />

        <label style={{ marginTop: '-60px', marginLeft: '301px', float: 'left' }}>Libellé Prod.</label>
        <input value={libelle? libelle:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '285px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setLibelle(e.target.value)} />


        <label style={{ marginTop: '-60px', marginLeft: '460px', float: 'left' }}>Tarif achat</label>
        <input value={tarifAch? tarifAch:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '435px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setTarifAch(e.target.value)} />



        <label style={{ marginTop: '-63px', marginLeft: '600px', float: 'left' }}>Tarif vente</label>
        <input value={tarifVen? tarifVen:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '585px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setTarifVen(e.target.value)} />

        <label style={{ marginTop: '-63px', marginLeft: '740px', float: 'left' }}>Tarif Weekend</label>
        <input value={tarifWeek? tarifWeek:null} required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '735px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setTarifWeek(e.target.value)} />


        <label style={{ marginTop: '-65px', marginLeft: '930px', float: 'left' }}>Bonus</label>
        <input value={bonus? bonus:null}  required type="text" className="form-control" placeholder=""
          style={{ borderRadius: '100px', width: '130px', marginLeft: '900px', marginTop: '-35px', fontSize: '13px' }}
          onChange={e => setBonus(e.target.value)} />

        <br />

        <button onClick={reset} style={{ borderRadius: '100px', marginRight: '20px', border: '1px solid #ACD3F2', marginTop: '12px', width: '200px', backgroundColor: '#E9F2FF' }} >Effacez les champs</button>
        <button style={{ borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Enrégistré </button>
        <button style={{ borderRadius: '100px', marginRight: '30px', border: '1px solid #ACD3F2', width: '100px', backgroundColor: '#E9F2FF' }} >Excel file </button>



        <input required type="text" className="form-control" placeholder=""
          style={{ float: 'right', borderRadius: '100px', width: '230px', marginRight: '200px', marginTop: '2px', fontSize: '13px' }}
          onChange={e => setBonus(e.target.value)} />
        <button style={{ borderRadius: '100px', border: '1px solid #ACD3F2', marginTop: '5px', float: 'right', marginRight: '-360px', width: '120px', backgroundColor: '#E9F2FF' }} >Rechercher </button>

      </div>


      <div className="basprodui">



        <Table striped bordered hover variant="info">
          <thead>
            <tr>
              <th>GAMME</th>
              <th>Produit</th>
              <th>Libellé</th>
              <th>Tarif Achat</th>
              <th>Tarif Vente</th>
              <th>Tarif Weekend</th>
              <th>Bonus</th>
              <th>Operations</th>

            </tr>
          </thead>
          <tbody>
            <tr onClick={top}>
              <td>CHAMPAGNE</td>
              <td>ARMAND_BR</td>
              <td>ARMAND DE BRIGNAC</td>
              <td>230000</td>
              <td>600000</td>
              <td>600000</td>
              <td>500</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
         
           
          </tbody>
        </Table>

      </div>

      <div className="plusbasproduit">
       <Link to="/gamme" className="linkgamm">
        <img src={"gamproduit.png"} alt="produit" />
        Gamme de Produits
        </Link>
      </div>
    </div>
  )
}

export default Produits;