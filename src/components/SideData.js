import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'


export const SideData = [
    {
        title: 'Vente',
        path: '/vente',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Etat des Transactions',
                path: '/transaction',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Vente Comptoir',
                path: '/ventecompt',
                icon: <IoIcons.IoIosAddCircle />,
            },

        ]
    },

    {
        title: 'Stocks',
        path : '/stocks',
        icon : <AiIcons.AiFillHome />,
        iconClosed:<RiIcons.RiArrowDownSFill />,
        iconOpened:<RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Entrées Sorties',
                path : '/entresortuie',
                icon : <IoIcons.IoIosPaper />,
            },
            {
                title: 'Stock Global',
                path : '/ventecompt',
                icon : <IoIcons.IoIosAddCircle />,
            },
            {
                title: 'Inv Valider',
                path : '/ventecompt',
                icon : <IoIcons.IoIosAddCircle />,
            },
            {
                title: 'Inv creer',
                path : '/ventecompt',
                icon : <IoIcons.IoIosAddCircle />,
            },
            {
                title: 'Consultation stock',
                path : '/ventecompt',
                icon : <IoIcons.IoIosAddCircle />,
            },
            {
                title: 'Consultation inventaire',
                path : '/ventecompt',
                icon : <IoIcons.IoIosAddCircle />,
            },
          
        ]
    },


    {
        title: 'Caisse',
        path: '/vente',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Encaissement',
                path: '/transaction',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Note de debit',
                path: '/ventecompt',
                icon: <IoIcons.IoIosAddCircle />,
            },
            {
                title: 'Sortie de caisse',
                path: '/ventecompt',
                icon: <IoIcons.IoIosAddCircle />,
            },
            {
                title: 'Etat de caisse',
                path: '/ventecompt',
                icon: <IoIcons.IoIosAddCircle />,
            },

        ]
    },


    {
        title: 'Rapports',
        path: '/vente',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'rapport',
                path: '/transaction',
                icon: <IoIcons.IoIosPaper />,
            },
        ]
    },

    

    
    {
        title: 'Parametrage',
        path: '/vente',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Depot',
                path: '/transaction',
                icon: <IoIcons.IoIosPaper />,
            },

            {
                title: 'Clients',
                path: '/transaction',
                icon: <IoIcons.IoIosPaper />,
            },

            {
                title: 'Produits',
                path: '/transaction',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Utilisateurs',
                path: '/transaction',
                icon: <IoIcons.IoIosPaper />,
            },

            

        ]
    },
]