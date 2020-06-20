import React, { Component } from 'react'

export default class ContentHeader extends Component {
    render() {
        return (
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 page-title">Candidatures</h1>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">Candidature 2020 stage</li>    
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
