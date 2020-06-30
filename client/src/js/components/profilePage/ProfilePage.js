import React, { Component } from 'react'
import Profile from '../Profile'
import ProfilePageHeader from './ProfilePageHeader'

export class ProfilePage extends Component {
    render() {
        return (
            <div>
                <div className="content-wrapper">
                    <ProfilePageHeader/>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <section className="col-lg-4">
                                    <div className="card card-profile">
                                        <div className="card-header border-transparent">
                                            <h3 className="card-title">Votre profile </h3>
                                            <div className="card-tools"><button type="button" className="btn btn-tool" onClick={this.logout}><i className="fas fa-edit"/></button></div>
                                        </div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img className="img-circle" src="/dist/img/avatar.png"/>
                                            </div>
                                            <h3 className="text-center card-profile__fullName">{Profile.fullName}</h3>
                                            <p className="text-center card-profile__email"><i className="fa fa-envelope-square mr-2" />{Profile.email}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            

        )
    }
}

export default ProfilePage
