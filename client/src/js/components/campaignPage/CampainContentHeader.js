import React, { Component } from 'react'
import { CampainContext } from '../CampainsContext'

export default class CampainContentHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campainId: this.props.campainId
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({campainId: nextProps.campainId})
    }

    render() {
        return (
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 page-title">Candidatures</h1>
                            <ol className="breadcrumb">
                            <CampainContext.Consumer>
                            {
                                value => value.campains.map((campain, index) => {
                                    if (campain.id == this.state.campainId) {
                                       return (
                                        <li className="breadcrumb-item header-campain-page__campain-name">{campain.name}</li>     
                                        ) 
                                    }
                                })
                            }
                            </CampainContext.Consumer>
                                
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
