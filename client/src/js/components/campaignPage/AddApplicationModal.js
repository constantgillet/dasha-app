import React, { Component } from 'react'
import toastr from 'toastr'
import $ from 'jquery'

import Profile from '../Profile'
import { PROXY_URL } from '../../../config'

export class AddApplicationModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyName: '',
            companyNameError: null,
            companies: [],
            isSending: false
        }
        this.logoTypeSelected = null
        this.navicateToApplication = null
    }

    onChangeCompanyName = (_event) => {
        const _campanyName = _event.target.value
        this.setState({companyName: _campanyName})
        this.logoTypeSelected = null
        this.requestLogotypes(_campanyName)

        if(_campanyName.length > 4) {
            if(_campanyName.length < 20) {
                this.setState({companyNameError: null})
            } else {
                this.setState({companyNameError: 'Le nom est trop long.'})
            }
        } else {
            this.setState({companyNameError: 'Le nom est trop court.'})
        }
    }

    requestLogotypes = (_campanyName) => {
        fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${_campanyName}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    companies: result
                })
            },
            // On treat errors
            (error) => {
                console.log(error)
            }
        )
    }

    onClickLogotype = (_event) => {
        const selected = _event.currentTarget

        if(this.logoTypeSelected != null)
            this.logoTypeSelected.classList.remove('add-application-modal__logotypes-list__logotype-box--selected')
        
        if(this.logoTypeSelected == selected) {
            selected.classList.remove('add-application-modal__logotypes-list__logotype-box--selected')
            this.logoTypeSelected = null
        } else {
            selected.classList.add('add-application-modal__logotypes-list__logotype-box--selected')
            this.logoTypeSelected = selected
        } 
    }

    onClickAdd = () => {
        if(this.setState.companyNameError == null && this.props.campainId && this.state.isSending == false) {
            let logotypeSource

            if(this.logoTypeSelected == null) {
                logotypeSource = '/images/company_logo.jpg'
            } else {
                logotypeSource = this.logoTypeSelected.firstElementChild.src
            }

            this.setState({isSending: true })

            console.log({ token: Profile.token, campain: this.props.campainId, companyName: this.state.companyName, logotypeSource: logotypeSource })
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({ token: Profile.token, campainId: this.props.campainId, companyName: this.state.companyName, logotypeSource: logotypeSource })
            }
    
            fetch(`${PROXY_URL}/api/addApplication.php`, requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({isSending: false })
                console.log(data)
                if(data.status == 'success') {
                    //this.setState({navicateToApplication: data.application_id})
                    toastr.success(data.status_message)
                    this.props.updateApplicationsState()
                    $('#modal-add-application').modal('hide')
                } else {
                    toastr.error(data.status_message)
                }
            })
            .catch(err => console.error("Error:", err))
        }
    }

    render() {
        return (
            <div>
                <div className="modal fade add-application-modal" id="modal-add-application" style={{display: 'none'}} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Ajouter une candidature</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Chez quelle entreprise ?</p>
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="companyName">Nom de l'entreprise:</label>
                                    <input className="form-control" value={this.state.companyName} id="companyName" onChange={this.onChangeCompanyName}/>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="inputCampainName">Chosir un logo:</label>
                                    
                                        {this.state.companies.length ? (
                                            <div className="add-application-modal__logotypes-list">
                                                {/* Render the list of items */}
                                                {this.state.companies.map((companyInfo, index) => {
                                                    return(
                                                        <div key={index} className="add-application-modal__logotypes-list__logotype-box" onClick={this.onClickLogotype}>
                                                            <img src={companyInfo.logo}/>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div>
                                                
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Annuler</button>
                                <button type="button" onClick={this.onClickAdd} className="btn btn-primary">{ this.state.isSending == true && (<i className="fa fa-spinner fa-spin mr-2" />) }Ajouter</button>
                            </div>
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>

                {/* <button type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-add-application">
                    Launch Default Modal
                </button> */}
            </div>
        )
    }
}

export default AddApplicationModal
