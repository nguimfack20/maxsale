import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import { Route } from 'react-router-dom/';
import HeadOffline from './components/HeadOffline';
import 'boxicons';
import 'boxicons/dist/boxicons';
import 'boxicons/css/boxicons.min.css';
import Utilisateuradd from './components/Utilisateuradd';
import Footer from './components/Footer';
import Produits from './components/Produits';

import Agence from './components/Agence';


import Compte from './components/Compte';

 function App() {
  return (
    <div className="app">
      <BrowserRouter>
      {/* <HeadOffline/>  */}

{/*       <Route exact path="/" >
        <Login />
      </Route> */}

     {/*  <Route exact path="/blessing" >
        <Login />
      </Route> */}

      <Route exact path="/blessing" >
        <Utilisateuradd />
      </Route>


     


      <Route path="/compte" >
        <Compte />
      </Route>

      <Route path="/user" >
        <Utilisateuradd />
      </Route>



      <Route path="/agence" >
        <Agence />
      </Route>

      <Route path="/produits" >
        <Produits />
      </Route>





     
      </BrowserRouter>
    </div>
  );
}

export default App; 
