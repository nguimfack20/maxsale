import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import { Route } from 'react-router-dom/';
import Login from './components/Login';
import Home from './components/Home';
import Aide from './components/Aide';
import HeadOffline from './components/HeadOffline';
import 'boxicons';
import 'boxicons/dist/boxicons';
import 'boxicons/css/boxicons.min.css';
import Utilisateuradd from './components/Utilisateuradd';
import Footer from './components/Footer';
import Getuser from './components/Getuser';
import Produits from './components/Produits';
import Menu from './components/Menu';
import Profil from './components/Profil';
import ProfilUpdate from './components/ProfilUpdate';
import Test from './components/Test';
import Depot from './components/Depot';
import ModeEncaissement from './components/ModeEncaissement';
import Gamme from './components/Gamme';
import TypeDocument from './components/TypeDocument';
import UserDepot from './components/UserDepot';
import Tarif from './components/Tarif';
import ProduitTarif from './components/ProduitTarif';
import MotifDepense from './components/MotifDepense';
import Inventaire from './components/Inventaire';
import InventaireValider from './components/InventaireValider';
import InventaireCree from './components/InventaireCree';
import Stock from './components/Stock';
import StockGlobal from './components/StockGlobal';
import InvenByDepotByDate from './components/InvenByDepotByDate';
import EntreeSorties from './components/EntreeSorties';
import EtatTransaction from './components/EtatTransaction';
import Encaissement from './components/Encaissement';
import SortiedeCaisse from './components/SortiedeCaisse';
import Notededebit from './components/Notededebit';
import Recouvrement from './components/Recouvrement';
import Situationpersonnelle from './components/Situationpersonnelle';

 function App() {
  return (
    <div className="app">
      <BrowserRouter>
      {/* <HeadOffline/>  */}

      <Route exact path="/" >
        <Login />
      </Route>

      <Route path="/home" >
        <Home />
      </Route>

      <Route path="/inventaire_valider" >
        <InventaireValider />
      </Route>

      <Route path="/inventaire_creer" >
        <InventaireCree />
      </Route>

      <Route path="/consultation_du_stock" >
        <Stock />
      </Route>

      <Route path="/stock_global" >
        <StockGlobal />
      </Route>

      <Route path="/entree_sortie" >
        <EntreeSorties />
      </Route>

      <Route path="/etat_de_transaction" >
        <EtatTransaction />
      </Route>


      <Route path="/consultation_des_inventaires" >
        <InvenByDepotByDate />
      </Route>

      <Route path="/inventairesancien" >
        <Inventaire />
      </Route>

      <Route path="/encaissement" >
        <Encaissement />
      </Route>

      <Route path="/note_de_debit" >
        <Notededebit />
      </Route>

      <Route path="/situation_du_personnel" >
        <Situationpersonnelle />
      </Route>
      
      <Route path="/recouvrement" >
        <Recouvrement />
      </Route>

      
      <Route path="/sortie_de_caisse" >
        <SortiedeCaisse />
      </Route>


      <Route path="/profileupdate" >
        <ProfilUpdate />
      </Route>

      <Route path="/test/:profilupdate" >
        <Test />
      </Route>

      
      <Route path="/user" >
        <Utilisateuradd />
      </Route>

      <Route path="/mode_encaissement" >
        <ModeEncaissement />
      </Route>

      <Route path="/typedoc" >
        <TypeDocument />
      </Route>

      <Route path="/userdepot" >
        <UserDepot />
      </Route>

      <Route path="/depot" >
        <Depot />
      </Route>

      <Route path="/produits" >
        <Produits />
      </Route>

      <Route path="/produittarif" >
        <ProduitTarif />
      </Route>

      <Route path="/motifdepense" >
        <MotifDepense />
      </Route>


      <Route path="/gamme" >
        <Gamme />
      </Route>
      <Route path="/tarif" >
        <Tarif />
      </Route>

      <Route path="/menu" >
        <Menu />
      </Route>

      <Route path="/profil" >
        <Profil />
      </Route>

      {/* <Route  path="/getuser/:id" component={Getuser}/> */}

       <Route  path="/getuser/:id" >
        <Getuser />
      </Route> 

 {/*      <Route  path="/update/:id">
          <Protected Cmp ={Update} /> 
          </Route> */}


      <Route path="/aide" >
        <Aide />
      </Route>

     
      </BrowserRouter>
    </div>
  );
}

export default App; 
