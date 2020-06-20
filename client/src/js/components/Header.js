import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.history.location.pathname == '/login' || this.props.history.location.pathname == '/register') {
            return null
        } 
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="fakeUrl" role="button"><i className="fas fa-bars" /></a>
                </li>
                {/* <li className="nav-item d-none d-sm-inline-block">
                <a href="index3.html" className="nav-link">Accueil</a>
                </li> */}
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
                    <i className="far fa-bell" />
                    {/* <span className="badge badge-warning navbar-badge">15</span> */}
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left: 'inherit', right: 0}}>
                    {/* <span className="dropdown-item dropdown-header">15 Notifications</span>
                    <div className="dropdown-divider" />
                    <a href="fakeUrl" className="dropdown-item">
                    <i className="fas fa-envelope mr-2" /> 4 new messages
                    <span className="float-right text-muted text-sm">3 mins</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="fakeUrl" className="dropdown-item">
                    <i className="fas fa-users mr-2" /> 8 friend requests
                    <span className="float-right text-muted text-sm">12 hours</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="fakeUrl" className="dropdown-item">
                    <i className="fas fa-file mr-2" /> 3 new reports
                    <span className="float-right text-muted text-sm">2 days</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="fakeUrl" className="dropdown-item dropdown-footer">Voir toutes les notifications</a> */}
                </div>
                </li>

            </ul>
            </nav>
        )
    }
}
