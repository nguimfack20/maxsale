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
import Gamme from './components/Gamme';
import Menu from './components/Menu';
import Profil from './components/Profil';
import ProfilUpdate from './components/ProfilUpdate';
import Test from './components/Test';

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

      <Route path="/profileupdate" >
        <ProfilUpdate />
      </Route>

      <Route path="/test/:profilupdate" >
        <Test />
      </Route>

      
      <Route path="/useradd" >
        <Utilisateuradd />
      </Route>

      <Route path="/produits" >
        <Produits />
      </Route>

      <Route path="/gamme" >
        <Gamme />
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
