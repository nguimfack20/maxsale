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

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
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
  

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);


  useEffect(() => {

    const getAllMenu = async () => {
      setLoading(true);
      const res = await axios.get('http://maxsalesbackend.com/api/menuall');
    //  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);

    }
    getAllMenu();

  }, []);

console.log(posts);


const indexOfLastPost = currentPage * postPerPage;
const indexOfFistPost = indexOfLastPost - postPerPage;
const currentPost = posts.slice(indexOfFistPost ,indexOfLastPost);
const paginate = pageNumber => setCurrentPage(pageNumber);



  return (
    <div className='app'>
       <BrowserRouter>
       <Route path="/menu" >
        <Menu />
      </Route>
      
     
      </BrowserRouter>
    </div>
  )
}

export default App; 
