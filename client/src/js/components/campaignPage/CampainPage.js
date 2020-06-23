import React, { Component } from 'react'

import Header from '../Header'
import Menu from '../menu/Menu'
import Footer from '../Footer'
import CampainContentHeader from './CampainContentHeader'
import AddApplicationModal from './AddApplicationModal'
import AddCampainModal from '../AddCampainModal'
import CardApplicationsList from './CardApplicationsList'
import Profile from '../Profile'
import { PROXY_URL } from '../../../config'

export class IndexPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            applications: []
        }

        this.campainId = this.props.match.params.id
    }

    componentDidMount() {
        document.title = 'Candidatures'
        this.getApplications()
    }

    //If we change the props (the url)
    componentWillReceiveProps(nextProps) {
        this.campainId = nextProps.match.params.id
        this.getApplications()
    }

    getApplications = () => {
        fetch(`${PROXY_URL}/api/getApplicationsList.php?campain=${this.campainId}&token=${Profile.token}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({applications: result.applications})
            },
    
            // Catch errors
            (error) => {
                console.error(error)
            }
        )
    }

    render() {
        return (
            <div>
                <AddCampainModal/>
                <div className="content-wrapper" style={{minHeight: 823}}>
                    {/* Content Header (Page header) */}
                    <CampainContentHeader campainId={this.campainId}/>
                    {/* /.content-header */}
                    {/* Main content */}
                    {/* /.content */}
                    <section className="content">
                        <div className="container-fluid">
                            <AddApplicationModal campainId={this.campainId} updateApplicationsState={this.getApplications}/>
                            {/* Main row*/}
                            <div className="row">
                                {/**left col */}
                                <section className="col-lg-8">

                                    {/**Card candidatures list */}
                                    <CardApplicationsList applications={this.state.applications}/>

                                </section>
                                <div className="col-lg-4 col-12">
                                    {/* small box */}
                                    <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{this.state.applications.length}<sup style={{fontSize: 20}}></sup></h3>
                                        <p>Candidatures</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-stats-bars" />
                                    </div>
                                    <div className="small-box-footer" data-toggle="modal" data-target="#modal-add-application" style={{cursor: 'pointer'}}>Ajouter une candidature <i className="fas fa-arrow-circle-right" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default IndexPage


