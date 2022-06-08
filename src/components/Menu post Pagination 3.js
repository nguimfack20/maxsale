import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Posts from './Posts';
import Pagination from './Pagination';


const Menu = () =>{


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);


  useEffect(() => {

    const getAllMenu = async () => {
      setLoading(true);
      const res = await axios.get('http://maxsalesbackend.com/api/menuall');
      //const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
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
    <div className='container'>
      <h1>menu</h1>
      <Posts  posts={currentPost} loading={loading} />
      <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}  />
     

    </div>
  )
}

export default Menu;