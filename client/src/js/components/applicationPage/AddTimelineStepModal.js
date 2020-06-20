import React, { Component } from 'react'
import Profile from '../Profile'
import toastr from 'toastr'
import $ from 'jquery'
import { PROXY_URL } from '../../../config'

export class AddTimelineStepModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSending: false,
            stepName: '',
            stepNameError: null,
            dayToNotify: '',
            selectedColor: 'primary'
        }
        
        this.colors = [
            {value: 'primary', name: 'violet'},
            {value: 'secondary', name: 'gris'},
            {value: 'success', name: 'vert'},
            {value: 'info', name: 'bleu'},
            {value: 'danger', name: 'rouge'}
        ]
    }

    onChangeInputStepName = (_event) => {
        const newStepName = _event.target.value
        this.setState({stepName: newStepName})

        if(newStepName.length > 3) {
            if(newStepName.length < 30) {
                this.setState({stepNameError: null})
            } else {
                this.setState({stepNameError: 'Le nom est trop long.'})
            }
        } else {
            this.setState({stepNameError: 'Le nom est trop court.'})
        }

    }

    onChangeDaysToNotifyInput = (_event) => {
        const newDaysToNotifyInput = _event.target.value

        //If it's a number
        if(!isNaN(newDaysToNotifyInput) && newDaysToNotifyInput.length < 3 ) {
            this.setState({dayToNotify: newDaysToNotifyInput})
        }
    }

    onClickColorButton = (_event) => {
        const colorId = _event.currentTarget.dataset.id

        this.setState({
            selectedColor: this.colors[colorId].value
        })
    }

    onClickButtonAdd = () => {
        
        if(this.state.stepNameError === null && this.state.stepName.length > 3 && this.state.isSending === false) {
            this.addStep()
        }
    }

    //Function to add the step
    addStep = () => {
        this.setState({ isSending: true })

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ token: Profile.token, applicationId: this.props.applicationId, title: this.state.stepName, color: this.state.selectedColor, daysToNotify: this.state.dayToNotify })
        }

        fetch(`${PROXY_URL}/api/addTimelineStep.php`, requestOptions)
        .then(res => res.json())
        .then(data => {
            this.setState({isSending: false})
            if(data.status === 'success') {
                $('#modal-add-timeline-step').modal('hide')
                this.props.getTimelineData()
                toastr.success('L\'étape a été ajouté.')
            } else {
                console.error("Error:", data.status_message)
            }
        })
        .catch(err => console.error("Error:", err))
    }

    render() {
        return (
            <div className="modal fade modal-add-timeline-step" id="modal-add-timeline-step" style={{display: 'none'}} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Ajouter une étape</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="stepName">Nom de l'étape:</label>
                                <input className={`form-control ${this.state.stepNameError != null ? "is-invalid" : this.state.stepName.length > 3 ? "is-valid" : ""}`} value={this.state.stepName} id="stepName" onChange={this.onChangeInputStepName}/>
                                {
                                    this.state.stepNameError != null && (
                                        <div className="invalid-feedback">
                                            {this.state.stepNameError}
                                        </div>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="stepName">Couleur l'étape:</label>
                                <div>
                                    {
                                        this.colors.map((color, index) => {
                                            return(
                                                <input key={index} type="button" 
                                                    className={`bg-${color.value} modal-add-timeline-step__color-button ${ this.state.selectedColor === color.value ? 'modal-add-timeline-step__color-button--selected' : '' }`} 
                                                    data-id={index} onMouseUp={this.onClickColorButton}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <label className="col-form-label" htmlFor="input-days-notify">Rappel dans</label>
                                <input type="text" id="input-days-notify" value={this.state.dayToNotify} placeholder="29" className="form-control modal-add-timeline-step__input-days-notify" onChange={this.onChangeDaysToNotifyInput}/>
                                <label className="col-form-label" htmlFor="input-days-notify">jours.</label>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Annuler</button>
                            <button type="button" onClick={this.onClickButtonAdd} className="btn btn-primary">{ this.state.isSending === true && (<i className="fa fa-spinner fa-spin mr-2" />) }Ajouter</button>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
        )
    }
}

export default AddTimelineStepModal
