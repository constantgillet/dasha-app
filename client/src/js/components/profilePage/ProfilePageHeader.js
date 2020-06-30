import React, { Component } from 'react'
import ButtonLogout from './ButtonLogout'

export class ProfilePageHeader extends Component {
    render() {
        return (
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <div className="d-flex">
                                <h1 className="m-0 page-title">Votre profile</h1>
                            </div>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <div className="breadcrumb float-sm-right">
                                <div className="btn-group dropleft">
                                    <ButtonLogout/>
                                </div>
                            </div>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
        )
    }
}

export default ProfilePageHeader
