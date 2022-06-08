//import React from 'react'
import React, { Component, SyntheticEvent, useEffect, useState } from 'react';
import 'boxicons';
import 'boxicons/dist/boxicons';
import 'boxicons/css/boxicons.min.css';
import { useHistory, Link } from 'react-router-dom';
import Getuser from './Getuser';
import Aide from './Aide';
import axios from 'axios';

const SideBar = (props) => {

    const [depot, setDepot] = useState('0');

    const history = useHistory();
    const [usersousmenu, setUsersousmenu] = useState([]);
    const [CAISSE, SETCAISSE] = useState('false');
    const [VENTE, setVENTE] = useState('false');
    const [PARAMETRE, setPARAMETRE] = useState('false');
    const [STOCK, setSTOCK] = useState('false');
    const [RAPPORT, setRAPPORT] = useState('false');
    const [Encaissement, setEncaissement] = useState('false');
    const [SortieCaisse, setSortieCaisse] = useState('false');
    const [NoteDebit, setNoteDebit] = useState('false');
    const [EtatCaisse, setEtatCaisse] = useState('false');
    const [Recouvrement, setRecouvrement] = useState('false');

    let matricule = '';
    let profil = '';
    useEffect(() => {

        let user = JSON.parse('' + localStorage.getItem('user-info'))

        getAllUser();
        testmenu();
       // getAllUser2();
        console.log(props)

    }, []);

    function getAllUser() {
        let res = axios.get('http://maxsalesbackend.com/api/allusersousmenu')
          .then((res) => setUsersousmenu(res.data));

          usersousmenu.forEach(element => {
            if ((element.profil === user[0].profil) && (element.matricule === user[0].matricule)) {
                if (element.menu === 'CAISSE') {
                    SETCAISSE('true')
                    console.log(element.sousmenu)
                    console.log(element.sousmenu)

                }
                console.log(element.sousmenu)

                console.log(CAISSE)
                console.log(CAISSE) 
                if (element.menu === 'VENTE') {
                    setVENTE('true')

                }
                if (element.menu === 'PARAMETRE') {
                    setPARAMETRE('true')

                }
                if (element.menu === 'STOCK') {
                    setSTOCK('true')

                }
                if (element.menu === 'RAPPORT') {
                    SETCAISSE('true')

                }
                if (element.sousmenu === 'Encaissement') {
                    setEncaissement('true')

                }
                if (element.sousmenu === 'Sortie de Caisse') {
                    setSortieCaisse('true')

                }
                if (element.sousmenu === 'Note de Debit') {
                    setNoteDebit('true')
        

                }
                if (element.sousmenu === 'Etat de Caisse') {
                    setEtatCaisse('true')

                }
                if (element.sousmenu === 'Recouvrement') {
                    setRecouvrement('true')

                }
            }

        });
      };

/*       function getAllUser2() {
        let res = axios.get('http://maxsalesbackend.com/api/allusersousmenu')
          .then((res) => setUsersousmenu(res.data));

      usersousmenu.forEach(element => {
        if ((element.profil === user[0].profil) && (element.matricule === user[0].matricule)) {
      console.log(element)
        }
    });
} */


/*      const userinfo = () => {

        let res = axios.get('http://maxsalesbackend.com/api/allusersousmenu')
            .then((res) => setUsersousmenu(res.data));

        let result = res.data
        setUsersousmenu(result)
        console.log(result)
        console.log(usersousmenu)
        console.log(usersousmenu)

    }  */
    let user = JSON.parse('' + localStorage.getItem('user-info'))

 //   const testmenu = () => {
        function testmenu() {
        usersousmenu.forEach(element => {
            if ((element.profil === user[0].profil) && (element.matricule === user[0].matricule)) {
                if (element.menu === 'CAISSE') {
                    SETCAISSE('true')
                    console.log(element.sousmenu)
                    console.log(element.sousmenu)

                }
                console.log(element.sousmenu)

                console.log(CAISSE)
                console.log(CAISSE)
              
                if (element.menu === 'VENTE') {
                    setVENTE('true')
                    console.log(VENTE)

                }
                if (element.menu === 'PARAMETRE') {
                    setPARAMETRE('true')

                }
                if (element.menu === 'STOCK') {
                    setSTOCK('true')

                }
                if (element.menu === 'RAPPORT') {
                    SETCAISSE('true')

                }
                if (element.sousmenu === 'Encaissement') {
                    setEncaissement('true')

                }
                if (element.sousmenu === 'Sortie de Caisse') {
                    setSortieCaisse('true')

                }
                if (element.sousmenu === 'Note de Debit') {
                    setNoteDebit('true')

                }
                if (element.sousmenu === 'Etat de Caisse') {
                    setEtatCaisse('true')

                }
                if (element.sousmenu === 'Recouvrement') {
                    setRecouvrement('true')

                }
            }

        });

    }

    function logout() {
        localStorage.clear();
        history.push("/")
    }




    let arrow = document.querySelectorAll(".arrow");


    for (var i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
            let arrowParent = e.target.parentElement.parentElement;

            arrowParent.classList.toggle("showMenu");
        })
    }

    function choisirbarTr() {

        if (depot == 0) {
            alert('veuillez sélectionner un bar svp')
        }
        else {
            alert('Transaction')
        }
    }

    function choisirbarVc() {
        if (depot == 0) {
            alert('veuillez sélectionner un bar svp')
        }
        else {
            alert('vente comptoir')
        }
    }

    function choisirbarGc() {
        if (depot == 0) {
            alert('veuillez sélectionner un bar svp')
        }
        else {
            alert('Gestion Credit')
        }
    }




    function choisirbarUt() {
        if (depot == 0) {
            alert('veuillez sélectionner un bar svp')
        }
        else {
            history.push("/useradd")

        }
    }

    return (
        <div className='sidebar close'>
            {props.depotbd}
            <div className='logo-details'>
                {/* depuis en commentaire<i class='bx bxl-c-plus-plus'></i> */}
                <i className='bx bxs-drink'></i>
                {/* <span className='logo_name'> */}
                {/*             <span>
                    <span style={{ color: '#fff' }}>
                        Selectionner un bar
                    </span>

                    <select value={depot} onChange={e => setDepot(e.target.value)}>
                        <option value="0">Cliquez ici</option>
                        <option value="BAR 1">BAR 1</option>
                        <option value="BAR 2">BAR 2</option>
                        <option value="BAR 3">BAR 3</option>
                        <option value="BAR 4">BAR 4</option>
                        <option value="MAGASIN">MAGASIN</option>
                        <option value="DEPOT">DEPOT</option>
                    </select>
                </span> */}
            </div>

            <ul className='nav-links'>
                <li>
                    {
                        VENTE === 'true' ?
                            <div className='iocn-link'>
                                <a href='#'>
                                    <i className='bx bx-grid-alt'></i>
                                    <span className='link_name'>Ventes</span>
                                </a>
                                <i className='bx bxs-chevron-down arrow'></i>
                            </div>
                            :
                            <div>ff</div>
                    }
                    <ul className='sub-menu'>
                        <li>
                            {/* <a onClick={choisirbarTr} href='#'> Etats des Transactions</a></li> */}
                            <a href='etat_de_transaction'> Etats des Transactions</a></li>

                        <li>
                            <a onClick={choisirbarVc} href='#'> Vente Comptoir</a></li>
                        <li>
                            <a onClick={choisirbarGc} href='#'> Gestion des credits</a></li>
                    </ul>
                </li>
                <li>
                {
                        STOCK === 'true' ?
                    <div className='iocn-link'>
                        <a href='#'>
                            <i className='bx bx-collection'></i>
                            <span className='link_name'>Stock</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow'></i>
                    </div>
                    :
                    null
                    }
                    <ul className='sub-menu'>
                        <li>
                            <a href='entree_sortie'> Entrée/Sorties</a></li>
                        {/*   <li>
                            <a href='stock_global'>Stock Global</a></li> */}

                        <li>
                            <a href='inventaire_creer'>Inventaire Créer</a>
                        </li>
                        <li>
                            <a href='inventaire_valider'>Inventaire validée</a>
                        </li>
                        <li>
                            <a href='consultation_du_stock'>Consultation de stocks</a>
                        </li>
                        <li>
                            <a href='consultation_des_inventaires'>Consultation inventaire</a>
                        </li>
                    </ul>
                </li>


                <li>
                    {
                        CAISSE === 'true' ?
                            <div className='iocn-link'>

                                <a href='#'>
                                    <i className='bx bx-book-alt'></i>
                                    <span className='link_name'>Caisse</span>
                                </a>
                                <i className='bx bxs-chevron-down arrow'></i>

                            </div>
                            :
                            null
                    }
                    <ul className='sub-menu'>
                        <li>
                            <a href='#'> Encaissement</a></li>
                        <li>
                            <a href='#'>Note de débits</a></li>
                        <li>
                            <a href='#'>Sortie de Caisse</a>
                        </li>
                        <li>
                            <a href='#'>Recouvrement</a>
                        </li>
                        <li>
                            <a href='#'>Etat de caisse</a>
                        </li>
                    </ul>
                </li>


                <li>
                {
                        PARAMETRE === 'true' ?
                    <div className='iocn-link'>
                        <a href='#'>
                            <i className='bx bx-line-chart'></i>
                            <span className='link_name'>Paramètres</span>
                        </a>
                        <i className='bx bxs-chevron-down arrow'></i>
                    </div>
                    :
                    null
                    }
                    <ul className='sub-menu'>
                        <li>

                            <Link to={"/depot"}>Depots</Link>
                        </li>



                        <li>
                            {/* <a  href='#'>Produits</a> */}
                            <Link to={"/gamme"}>Gamme</Link>
                        </li>

                        <li>
                            {/* <a  href='#'>Produits</a> */}
                            <Link to={"/produits"}>Produits</Link>
                        </li>



                        {

                            (user[0].profil) === 'ADMIN' ?

                                <li>
                                    <li>
                                        <ul className='sub-menu'>
                                            <li>

                                                <Link to={"/user"}>Gérer les utilisateurs</Link>
                                            </li>

                                            <li>

                                                <Link to={"/profil"}>Profils Utilisateurs</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <a href='#'>Utilisateurs  <i className='bx bxs-chevron-down arrow'></i>

                                    </a>


                                </li>
                                :
                                null


                        }


                        <li>
                            <Link to={"/userdepot"}>Utilisateurs/Depots</Link>

                        </li>
                        <li>
                            {/* <a onClick={choisirbarUt} href='#'>Utilisateurs</a> */}
                            <Link to={"/menu"}>Menus</Link>

                        </li>
                        <li>
                            <Link to={"/mode_encaissement"}>Mode Encaissement</Link>
                        </li>
                        <li>
                            {/* <a onClick={choisirbarUt} href='#'>Utilisateurs</a> */}
                            <Link to={"/typedoc"}>Type Document</Link>

                        </li>
                        <li>
                            {/* <a onClick={choisirbarUt} href='#'>Utilisateurs</a> */}
                            <Link to={"/tarif"}>Tarifs</Link>

                        </li>
                        <li>
                            {/* <a onClick={choisirbarUt} href='#'>Utilisateurs</a> */}
                            <Link to={"/produittarif"}>Tarifs des Produits</Link>

                        </li>
                        <li>
                            {/* <a onClick={choisirbarUt} href='#'>Utilisateurs</a> */}
                            <Link to={"/motifdepense"}>Motifs des depenses</Link>

                        </li>


                    </ul>
                </li>
                {
                        RAPPORT === 'true' ?

                <li>
                    <a href='#'>
                        <i className='bx bx-pie-chart-alt-2'></i>
                        <span className='link_name'>Rapports</span>
                    </a>
                </li>
                :
                null
                }

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


            </ul>






        </div>
    )
}

export default SideBar




/* import React, { useState } from 'react'
//rafce 
import styled from 'styled-components'
import { Link } from 'react-router-dom/'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'


const Nav = styled.div`
background: #15171c;
height: 80px;
display: flex;  
justify-content: flex-start;
align-items: center;
`;


const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;  
justify-content: flex-start;
align-items: center;

`;

const SideBarNav = styled.nav`
background: #15171c;
width: 250px;
height: 100vh;
display: flex;  
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar}) => (sidebar ? '0' : '-100%')};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.nav`
width: 100%;
`;

const SideBar = () => {
    const [sidebar,setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
   <Nav>
       <NavIcon to="#">
           <FaIcons.FaBars onClick={showSidebar} />
       </NavIcon>
   </Nav>
   <SideBarNav sidebar={sidebar}>
       <SidebarWrap>
       <NavIcon to="#">
           <AiIcons.AiOutlineClose />
       </NavIcon>
       </SidebarWrap>
   </SideBarNav>
    </>
  )
}

export default SideBar */