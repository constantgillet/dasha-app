import React, { Component } from 'react'

import Header from '../Header'
import Menu from '../menu/Menu'
import Footer from '../Footer'
import AddCampainModal from '../AddCampainModal'
import Profile from '../Profile'
import ApplicationContentHeader from './ApplicationContentHeader'
import TimelineCard from './TimelineCard'
import { PROXY_URL } from '../../../config'


export class ApplicationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            application: {
                campain: { id: 23, name: 'Campagne stage 2020' },
                company: 'Facebook',
                logotype: 'https://logo.clearbit.com/facebook.com'
            }

            
        }
        this.applicationId = this.props.match.params.id
    }

    componentDidMount() {
        this.getApplication()
    }

    getApplication = () => {
        fetch(`${PROXY_URL}/api/getApplicationInfos.php?application=${this.applicationId}&token=${Profile.token}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({ 
                    application: {
                        ...this.state.application,
                        campain: { 
                            id: result.campain.id,
                            name: result.campain.name
                        },
                        company: result.application.company,
                        logotype: result.application.logotype
                    } 
                })
                document.title = `Candidature ${this.state.application.company} - Dasha App`
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
                    <ApplicationContentHeader application={this.state.application}/>
                    {/* /.content-header */}
                    {/* Main content */}
                    {/* /.content */}
                    <section className="content">
                        <div className="container-fluid">
                            
                            {/* Main row*/}
                            <div className="row">
                                {/**left col */}
                                <section className="col-lg-8">
                                    <TimelineCard applicationId={this.applicationId}/>                                
                                </section>
                                <div className="col-lg-4 col-12">
                                    
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

export default ApplicationPage


