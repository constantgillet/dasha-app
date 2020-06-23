import React, { Component } from 'react'
import Profile from '../Profile'
import {CampainContext} from '../CampainsContext'
import CampainList from './CampainList'
import { Link } from 'react-router-dom'
export default class Menu extends Component {

    constructor(props) {
        super(props)

    }
    
    render() {
        if(this.props.history.location.pathname == '/login' || this.props.history.location.pathname == '/register') {
            return null
        } 
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/" className="brand-link">
                    <img src="/dist/img/AdminLTELogo.png" alt="Dasha Logo" className="brand-image" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">Dashaboard</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/dist/img/avatar.png" className="img-circle" alt="User" />
                    </div>
                    <div className="info">
                        <Link to="/" className="d-block">{ Profile.fullName != null ? (Profile.fullName) : ("Nom prénom") }</Link>
                    </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library */}
                        <li className="nav-item">
                            <CampainContext.Consumer>
                            {
                
                                value => {
                                    
                                    if (value.campains.length > 0) {

                                        return(
                                            <Link to={`/campain/${value.campains[0].id}`} className="nav-link active">
                                                <i className="nav-icon far fa-file" />
                                                <p>
                                                    Dernière campagne
                                                </p>
                                            </Link>
                                        )
                                    }
                                }
                            }
                                
                            </CampainContext.Consumer>
                        </li>
                        <li className="nav-item has-treeview">
                            <a href="" className="nav-link">
                                <i className="nav-icon fas fa-copy" />
                                <p>
                                    Les campagnes
                                <i className="fas fa-angle-left right" />
                                <CampainContext.Consumer>
                                {   
                                    value => {
                                        return <span className="badge badge-primary right">{value.campains.length}</span>
                                    }
                                    
                                }
                                </CampainContext.Consumer>
                                </p>
                            </a>
                            <CampainList/>
                        </li>
                        <li className="nav-item">
                            <Link to="addCampain" className="nav-link" data-toggle="modal" data-target="#modal-add-application-campaign">
                                <i className="nav-icon far fa-plus-square" />
                                <p>
                                    Nouvelle campagne
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <i className="nav-icon far fa-address-book" />
                                <p>
                                    Liste des Contacts
                                </p>
                            </Link>
                        </li>
                    </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
            {/* /.sidebar */}
            </aside>
        )
    }
}
