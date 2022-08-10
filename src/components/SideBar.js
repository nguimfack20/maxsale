//import React from 'react'
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';
import 'boxicons';
import 'boxicons/dist/boxicons';
import 'boxicons/css/boxicons.min.css';
import { useHistory, Link } from 'react-router-dom';

import imgblessing from '../Image/blessing.png'

import axios from 'axios';

const SideBar = (props) => {

    const [depot, setDepot] = useState('0');

    const history = useHistory();



    useEffect(() => {

        let user = JSON.parse('' + localStorage.getItem('user-info'))

        if (!localStorage.getItem("user-info")) {
            history.push("/")
        };



    }, []);






    let user = JSON.parse('' + localStorage.getItem('user-info'))





    function logout() {
        localStorage.clear();
        history.push("/")
    }


    return (
        <div className='sidebar close'>

            <div className='logo-details'>

                <img style={{ marginLeft: '70px', marginTop: '50px', width: '100px', height: '100px', borderRadius: '100px' }} src={imgblessing} alt="produit" />


            </div>

            <ul className='nav-links'>
                <li>

                    <div className='iocn-link'>
                        <a href='#'>
                            <i className='bx bx-grid-alt'></i>
                            <span className='link_name'>Compte</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow'></i>
                    </div>

                    <ul className='sub-menu'>

                        <li>
                            <a href=''> Approvionnement</a>
                        </li>
                        <li>
                            <a href=''> consulter solde</a>
                        </li>


                    </ul>
                </li>

                <li>

                    <div className='iocn-link'>

                        <a href='#'>
                            <i className='bx bx-book-alt'></i>
                            <span className='link_name'>Conso </span>
                        </a>
                        <i className='bx bxs-chevron-down arrow'></i>

                    </div>

                    <ul className='sub-menu'>

                        <li>
                            <a href=''> Achat Carburant</a>
                        </li>


                        <li>
                            <a href=''>Historique de Consommation</a>
                        </li>

                    </ul>
                </li>


                <li>

                    <div className='iocn-link'>
                        <a href='#'>
                            <i className='bx bx-line-chart'></i>
                            <span className='link_name'>Paramètres</span>
                        </a>
                        <i style={{ marginLeft: '-30px' }} className='bx bxs-chevron-down arrow'></i>
                    </div>

                    <ul className='sub-menu'>

                        <li>
                            <Link to={"/agence"}>Agence</Link>
                        </li>



                        <li>
                            {/* <a  href='#'>Produits</a> */}
                            <Link to={"/produits"}>Produits</Link>
                        </li>


                        <li>
                            <li>
                                <ul className='sub-menu'>

                                    <li>

                                        <Link to={"/user"}>Gérer les utilisateurs</Link>
                                    </li>



                                    <li>

                                        <Link to={"/compte"}>Gérer les comptes</Link>
                                    </li>

                                </ul>
                            </li>

                            <a href='#'>Utilisateurs

                                <i className='bx bxs-chevron-down arrow'></i>

                            </a>




                        </li>



                    </ul>
                </li>
                <li>

                    <div className='iocn-link'>
                        <a href='#'>
                            <i className='bx bx-pie-chart-alt-2'></i>
                            <span className='link_name'>Rapports</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow'></i>
                    </div>


                </li>

                {user[0] ?
                    <li>
                        <div className='profile-details'>
                            <div className='profile-content'>
                                <img src={"user.png"} alt='profile' />
                            </div>


                            <div className='name-job'>
                                <div className='profile-name'>Hi {user[0].matricule}</div>
                                <div className='job'>{user[0].profil}</div>
                            </div>
                            <i className='bx bx-log-out'></i>
                            <ul className='sub-menu'>
                                <li>
                                    <a onClick={logout} className='link_name' href='#'>Deconnexion</a></li>



                            </ul>
                        </div>
                    </li>
                    :
                    null

                }


            </ul>






        </div>
    )
}

export default SideBar


