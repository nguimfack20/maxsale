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
    /*     const [CAISSE, SETCAISSE] = useState('false');
        const [VENTE, setVENTE] = useState('false');
        const [PARAMETRE, setPARAMETRE] = useState('false');
        const [STOCK, setSTOCK] = useState('false');
        const [RAPPORT, setRAPPORT] = useState('false');
        const [Encaissement, setEncaissement] = useState('false');
        const [SortieCaisse, setSortieCaisse] = useState('false');
        const [NoteDebit, setNoteDebit] = useState('false');
        const [EtatCaisse, setEtatCaisse] = useState('false');
        const [Recouvrement, setRecouvrement] = useState('false'); */

    let menuParametre = '';
    let menuVente = '';
    let menuCaisse = '';
    let menuStock = '';
    let menuRapport = '';
    let sousEtatTransactions = 'Etat des Transactions';
    let sousVenteComptoir = 'Vente Comptoir';
    let sousGestionCredits = 'Gestion des Credits';
    let sousentresortie = 'entresortie';
    let sousconsulinv = 'consulinv';
    let sousinvcree = 'invcree';
    let sousinvvalider = 'invvalider';
    let sousConsulstock = 'consulstock';
    let sousstockglo = 'stockglo';
    let sousEncaissement = 'Encaissement';
    let sousEtatCaisse = 'Etat de Caisse';
    let sousSortieCaisse = 'Sortie de Caisse';
    let sousNoteDebit = 'Note de Debit';
    let sousRecouvrement = 'Recouvrement';
    let sousDepot = 'Depot';
    let sousClient = 'Client';
    let sousProduit = 'Produit';
    let sousUtilisateur = 'Utilisateur';
    let sousMenu = 'Menu';
    let sousgamme = 'Gamme';
    let sousgererUtilisateu = 'gererUtilisateu';
    let sousprofilUser = 'profilUser';
    let soususerdepot = 'userdepot';
    let sousModeEncaissement = 'ModeEncaissement';
    let soustypedoc = 'typedoc';
    let soustarif = 'tarif';
    let soustarifprofuit = 'tarifprofuit';
    let sousmotifdepense = 'tarifprofuit';
    let sousEntreesSorties = 'Entrees/Sorties';
    useEffect(() => {

        let user = JSON.parse('' + localStorage.getItem('user-info'))

        getAllUser();
        testmenu();
        // console.log(props)

    }, []);


    function getAllUser() {
        let res = axios.get('http://maxsalesbackend.com/api/allusersousmenu')
            .then((res) => setUsersousmenu(res.data));


    };



    let user = JSON.parse('' + localStorage.getItem('user-info'))

    //   const testmenu = () => {
    function testmenu() {
        usersousmenu.forEach(element => {
            if ((element.profil === user[0].profil) && (element.matricule === user[0].matricule)) {
                if (element.menu === 'CAISSE') {
                    //console.log(element.sousmenu)


                }
                ///console.log(element.sousmenu)



                if (element.menu === 'VENTE') {
                    //setVENTE('true')

                }
                if (element.menu === 'PARAMETRE') {
                    //setPARAMETRE('true')

                }
                if (element.menu === 'STOCK') {
                    // setSTOCK('true')

                }
                if (element.menu === 'RAPPORT') {
                    // SETCAISSE('true')

                }
                if (element.sousmenu === 'Encaissement') {
                    // setEncaissement('true')

                }
                if (element.sousmenu === 'Sortie de Caisse') {
                    // setSortieCaisse('true')

                }
                if (element.sousmenu === 'Note de Debit') {
                    // setNoteDebit('true')

                }
                if (element.sousmenu === 'Etat de Caisse') {
                    // setEtatCaisse('true')

                }
                if (element.sousmenu === 'Recouvrement') {
                    //setRecouvrement('true')

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
    let tabmenu = [];
    let tabsousmenu = [];
   // console.log(usersousmenu)


    usersousmenu.forEach(element => {
        if ((element.profil === user[0].profil) && (element.matricule === user[0].matricule)) {
            /*    if (element.menu === 'CAISSE') {
                  SETCAISSE('true')
                 
  
              }  */
            // console.log(element)
  
            tabmenu.push(element.menu)
            tabsousmenu.push(element.sousmenu)

        }
        // console.log(tabmenu)
        //console.log(tabsousmenu)

        menuParametre = tabmenu.includes("PARAMETRE")
        menuCaisse = tabmenu.includes("CAISSE")
        menuVente = tabmenu.includes("VENTE")
        menuStock = tabmenu.includes("STOCK")
        menuRapport = tabmenu.includes("RAPPORT")
        sousentresortie = tabsousmenu.includes("Entrees/Sorties")
        sousinvcree = tabsousmenu.includes("Inventaire Creer")
        sousinvvalider = tabsousmenu.includes("Inventaire Valider")

   
        sousConsulstock = tabsousmenu.includes("Consultation de Stock")
        sousstockglo = tabsousmenu.includes("Stock Global")
        sousconsulinv = tabsousmenu.includes("Consultation Inventaire")


       

        sousClient = tabsousmenu.includes("Client")
        sousDepot = tabsousmenu.includes("Depot")
        sousEtatTransactions = tabsousmenu.includes("Etat des Transactions")
        sousVenteComptoir = tabsousmenu.includes("Vente Comptoir")
        sousGestionCredits = tabsousmenu.includes("Gestion Credit")
        sousEncaissement = tabsousmenu.includes("Encaissement")
        sousEtatCaisse = tabsousmenu.includes("Etat de Caisse")
        sousSortieCaisse = tabsousmenu.includes("Sortie de Caisse")
        sousNoteDebit = tabsousmenu.includes("Note de Debit")
        sousRecouvrement = tabsousmenu.includes("Recouvrement")
        sousProduit = tabsousmenu.includes("Produit")
        sousUtilisateur = tabsousmenu.includes("Utilisateur")
        sousMenu = tabsousmenu.includes("Menu")
        sousEntreesSorties = tabsousmenu.includes("Entrees/Sorties")
        sousgamme = tabsousmenu.includes("Gamme")
        sousgererUtilisateu = tabsousmenu.includes("Gerer Utilisateur")
        sousprofilUser = tabsousmenu.includes("Profi lUser")
        soususerdepot = tabsousmenu.includes("User Depot")
        sousModeEncaissement = tabsousmenu.includes("Mode Encaissement")
        soustypedoc = tabsousmenu.includes("Type Document")
        soustarif = tabsousmenu.includes("Tarif")
        soustarifprofuit = tabsousmenu.includes("Tarif Profuit")
        sousmotifdepense = tabsousmenu.includes("Motif Depense")
        // setPARAMETRE(n)
        //console.log(menuParametre)


    });


    return (
        <div className='sidebar close'>
            {props.depotbd}
            <div className='logo-details'>
                {/* depuis en commentaire<i class='bx bxl-c-plus-plus'></i> */}
                <i className='bx bxs-drink'></i>
                <i className='bx bxs-drink'></i>
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
                        menuVente === true ?
                            <div className='iocn-link'>
                                <a href='#'>
                                    <i className='bx bx-grid-alt'></i>
                                    <span className='link_name'>Ventes</span>
                                </a>
                                <i className='bx bxs-chevron-down arrow'></i>
                            </div>
                            :
                            null
                    }
                    <ul className='sub-menu'>
                        {
                            sousEtatTransactions === true ?
                                <li>
                                    <a href='etat_de_transaction'> Etats des Transactions</a>
                                </li>
                                :
                                null
                        }

                        {
                            sousVenteComptoir === true ?
                                <li>
                                    <a href='#'> Vente Comptoir</a>
                                </li>
                                :
                                null
                        }

                         {
                            sousGestionCredits === true ?

                                <li>
                                    <a href='#'> Gestion des credits</a>
                                </li>
                                :
                                null
                          }
                     </ul>
                  </li>
                 <li>
                    {
                        menuStock === true ?
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
                        {
                            sousentresortie === true ?
                                <li>
                                    <a href='entree_sortie'> Entrée/Sorties</a>
                                </li>
                                :
                                null
                        }

                        {
                            sousinvcree === true ?
                                <li>
                                    <a href='inventaire_creer'>Inventaire Créer</a>
                                </li>
                                :
                                null
                        }
                        {
                            sousinvvalider === true ?
                                <li>
                                    <a href='inventaire_valider'>Inventaire validée</a>
                                </li>
                                :
                                null
                        }
                        {
                            sousConsulstock === true ?
                                <li>
                                    <a href='consultation_du_stock'>Consultation de stocks</a>
                                </li>
                                :
                                null
                        }
                        {
                            sousconsulinv === true ?
                                <li>
                                    <a href='consultation_des_inventaires'>Consultation inventaire</a>
                                </li>
                                :
                                null
                        }
                    </ul>
                </li>


                <li>
                    {
                        menuCaisse === true ?
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
                        {
                            sousEncaissement === true ?
                                <li>
                                    <a href='encaissement'> Encaissement</a>
                                </li>
                                :
                                null
                        }
                        {
                            sousNoteDebit === true ?
                                <li>
                                    <a href='note_de_debit'>Note de débits</a>
                                </li>
                                :
                                null
                        }
                        {
                            sousSortieCaisse === true ?
                                <li>
                                    <a href='sortie_de_caisse'>Sortie de Caisse</a>
                                </li>
                                :
                                null
                        }
                        {
                            sousRecouvrement === true ?
                                <li>
                                    <a href='recouvrement'>Recouvrement</a>
                                </li>
                                :
                                null
                        }
                        {
                            sousEtatCaisse === true ?
                                <li>
                                    <a href='#'>Etat de caisse</a>
                                </li>
                                :
                                null}
                    </ul>
                </li>


                <li>
                    {
                        menuParametre === true ?
                            <div className='iocn-link'>
                                <a href='#'>
                                    <i className='bx bx-line-chart'></i>
                                    <span className='link_name'>Paramètres</span>
                                </a>
                                <i style={{marginLeft:'-30px'}}  className='bx bxs-chevron-down arrow'></i>
                            </div>
                            :
                            null
                    }
                    <ul className='sub-menu'>
                        {
                            sousDepot === true ?
                                <li>
                                    <Link to={"/depot"}>Depots</Link>
                                </li>
                                :
                                null
                        }


                        {
                            sousgamme === true ?
                                <li>
                                    <Link to={"/gamme"}>Gamme</Link>
                                </li>
                                :
                                null
                        }

                        {
                            sousProduit === true ?

                                <li>
                                    {/* <a  href='#'>Produits</a> */}
                                    <Link to={"/produits"}>Produits</Link>
                                </li>
                                :
                                null
                        }





                        <li>
                            <li>
                                <ul className='sub-menu'>
                                    {
                                        sousgererUtilisateu === true ?
                                            <li>

                                                <Link to={"/user"}>Gérer les utilisateurs</Link>
                                            </li>
                                            :
                                            null
                                    }

                                    {
                                        sousprofilUser === true ?

                                            <li>

                                                <Link to={"/profil"}>Profils Utilisateurs</Link>
                                            </li>
                                            :
                                            null
                                    }
                                </ul>
                            </li>
                            {
                                // sousUtilisateur === true ?
                                (sousprofilUser === true)||( sousgererUtilisateu === true) ?
                                    <a href='#'>Utilisateurs  

                                    <i className='bx bxs-chevron-down arrow'></i>

                                    </a>
                                    :
                                    null
                            }


                        </li>

                        {
                            soususerdepot === true ?
                                <li>
                                    <Link to={"/userdepot"}>Utilisateurs/Depots</Link>

                                </li>
                                :
                                null
                        }
                        {
                            sousMenu === true ?
                                <li>
                                    <Link to={"/menu"}>Menus</Link>

                                </li>
                                :
                                null
                        }
                        {
                            sousModeEncaissement === true ?
                                <li>
                                    <Link to={"/mode_encaissement"}>Mode Encaissement</Link>
                                </li>
                                :
                                null
                        }
                        {
                            soustypedoc === true ?
                                <li>
                                    <Link to={"/typedoc"}>Type Document</Link>

                                </li>
                                :
                                null
                        }
                        {
                            soustarif === true ?
                                <li>
                                    <Link to={"/tarif"}>Tarifs</Link>

                                </li>
                                :
                                null
                        }
                        {
                            soustarifprofuit === true ?
                                <li>
                                    <Link to={"/produittarif"}>Tarifs des Produits</Link>

                                </li>
                                :
                                null
                        }
                        {
                            sousmotifdepense === true ?
                                <li>
                                    <Link to={"/motifdepense"}>Motifs des depenses</Link>

                                </li>
                                :
                                null
                        }
                    </ul>
                </li>
                <li>
                    {
                        menuRapport === true ?
                            <div className='iocn-link'>
                              <a href='#'>
                                <i className='bx bx-pie-chart-alt-2'></i>
                                <span className='link_name'>Rapports</span>
                            </a>
                                <i className='bx bxs-chevron-down arrow'></i>
                            </div>
                            :
                            null
                    }
                    <ul className='sub-menu'>
                        {
                            sousentresortie === true ?
                                <li>
                                    <a href='situation_du_personnel'> Situation du Personnel</a>
                                </li>
                                :
                                null
                        }

                        </ul>
                  </li>

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