import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ApplicationContentHeader extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <div className="d-flex">
                                <h1 className="m-0 page-title application-content-header__title">{this.props.application.company}</h1>
                                <img src={this.props.application.logotype} className="application-content-header__logotype"/>
                            </div>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item application-content-header__campain-name"><Link to={`/campain/${this.props.application.campain.id}`}>{this.props.application.campain.name}</Link></li>
                                <li className="breadcrumb-item active application-content-header__application-name">{this.props.application.company}</li>                     
                            </ol>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <div className="breadcrumb float-sm-right">
                                <div className="btn-group dropleft">
                                    <button type="button" className="btn btn-primary">Actions</button>
                                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-hover dropdown-icon" data-toggle="dropdown">
                                        <span className="sr-only">Toggle Dropdown</span>
                                        <div className="dropdown-menu" role="menu">
                                        <a className="dropdown-item" href="fakeUrl">Ajouter une todo list</a>
                                        <a className="dropdown-item" href="fakeUrl">Ajouter des documents</a>
                                        <a className="dropdown-item" href="fakeUrl">Ajouter des notes</a>
                                        <div className="dropdown-divider" />
                                        <a className="dropdown-item" href="fakeUrl">Supprimer</a>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
        )
    }
}
