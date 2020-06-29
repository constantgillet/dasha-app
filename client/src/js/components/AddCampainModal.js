import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import toastr from 'toastr'
import Profile from './Profile'
import $ from 'jquery'
import { PROXY_URL } from '../../config'
import { CampainContext } from './CampainsContext'

export class AddCampainModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campainName: '',
            campainNameError: null,
            navicateToCampain: false,
            isSending: false
        }
        this.context = null
    }

    onClickAddCampain = () => {
        console.log(this.context)

        if(this.state.campainNameError == null && this.state.isSending == false) {
            this.setState({isSending: true })
            this.addCampain()
        }
    }

    addCampain = () => {

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ token: Profile.token, campainName: this.state.campainName })
        }

        fetch(`${PROXY_URL}/api/addCampain.php`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status === 'success') {

                toastr.success('Vous avez ajouté une campagne')

                this.setState({isSending: false })

                $('#modal-add-application-campaign').modal('hide')
                this.addCampainToContext({id: data.campain_id, name: this.state.campainName})
                console.log(' 1 Modal render')
                this.setState({navicateToCampain: data.campain_id})
                this.setState({navicateToCampain: false, campainName: '', campainNameError: null})
            } else {

            }
        })
        .catch(err => console.error("Error:", err))
    }

    addCampainToContext = (newCampain) => {
        const lastCampainsList = this.context.campains
        const newCampainsList = [newCampain]

        lastCampainsList.forEach(campain => {
            newCampainsList.push(campain)
        })

        this.context.replaceCampains(newCampainsList)
    }

    onChangeCampainNameInput = (_event) => {
        const campainNameValue = _event.target.value
        this.setState({campainName: campainNameValue})

        if (campainNameValue.length > 5) {
            
            if (campainNameValue.length < 20) {
                this.setState({campainNameError: null}) 
            } else {
                this.setState({campainNameError: 'Le nom de la campagne est trop long'}) 
            }
        } else {
            this.setState({campainNameError: 'Le nom de la campagne est trop court.'}) 
        }
    }

    render() {

        if (this.state.navicateToCampain !== false) {
            return <Redirect to={`/campain/${this.state.navicateToCampain}`} />
        }

        console.log('campain modal render')
        return (
            <div className="modal fade" id="modal-add-application-campaign" style={{display: 'none'}} aria-hidden="true">
                <CampainContext.Consumer>
                {
                    value => {
                        this.context = value
                    }
                }
                </CampainContext.Consumer>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Ajouter une campagne</h4>
                            {  
                                this.props.allowClosing === undefined || this.props.allowClosing === true ? (
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button> 
                                ) : ( null )
                            }
                            
                        </div>
                        <div className="modal-body">
                            <p>Comment souhaite tu appeler cette campagne ?</p>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="inputCampainName">Nom de la campagne</label>
                                <input type="text" className={`form-control ${this.state.campainNameError != null ? "is-invalid" : this.state.campainName.length > 4 ? "is-valid" : ""}`}
                                    value={this.state.campainName} id="inputCampainName" 
                                    placeholder="Nom de la campagne" autoComplete="off" 
                                    style={{cursor: 'pointer'}} onChange={this.onChangeCampainNameInput} 
                                />
                                {
                                    this.state.campainNameError != null && (
                                        <div className="invalid-feedback">
                                            {this.state.campainNameError}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">   
                            { this.props.allowClosing == undefined || this.props.allowClosing == true ? ( <button type="button" className="btn btn-default" data-dismiss="modal">Annuler</button> ) : ( null ) }
                            <button type="button" className="btn btn-primary" onClick={this.onClickAddCampain}>{ this.state.isSending == true && (<i className="fa fa-spinner fa-spin mr-2" />) } Ajouter</button>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
        )
    }
}

export default AddCampainModal
