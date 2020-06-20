import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class CardApplicationsList extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <div className="card card-application-list">
                <div className="card-header border-transparent">
                    <h3 className="card-title">Vos candidatures </h3>
                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-toggle="modal" data-target="#modal-add-application">
                                <i className="fas fa-plus" />
                        </button>
                    </div>
                </div>
                {/* /.card-header */}
                <div className="card-body p-0" style={{display: 'block'}}>
                    <div className="table-responsive">
                    <table className="table m-0">
                        <thead>
                        <tr>
                            <th>Entreprise</th>
                            <th>Avancement</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                
                            this.props.applications.map((application) => {
                                return(
                                    <tr key={application.id}>
                                        <td className="card-application-list__company">
                                            <div className="card-application-list__company__logotype-box">
                                                <img src={application.logotype} alt={"logo" + application.company}/>
                                            </div>
                                            <span className="card-application-list__company__name"> {application.company} </span>
                                        </td>
                                        <td><span className={"badge badge-" + application.lastTimelineStep.color}>{application.lastTimelineStep.title}</span></td>
                                        <td>
                                            <Link className="" to={`/application/${application.id}`}>
                                                <i className="far fa-eye" />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    {/* /.table-responsive */}
                </div>
                {/* /.card-body */}
            </div>
        )
    }
}

export default CardApplicationsList
