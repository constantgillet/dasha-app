import React, { Component } from 'react'
import Profile from '../Profile'
import toastr from 'toastr'
import AddTimelineStepModal from './AddTimelineStepModal'
import { PROXY_URL } from '../../../config'

export class TimelineCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timelineSteps: []
        }
        this.timeout = null

    }

    
    componentDidMount() {
        this.getTimelineData()
    }

    componentDidUpdate() {
        document.querySelectorAll('[data-autoresize]').forEach((element) => {
            element.style.boxSizing = 'border-box'
            const offset = element.offsetHeight - element.clientHeight;
              element.style.height = 'auto'
              element.style.height = element.scrollHeight + offset + 'px';            
          })
    }

    addAutoResize = () => {
        document.querySelectorAll('[data-autoresize]').forEach((element) => {
          element.style.boxSizing = 'border-box'
          const offset = element.offsetHeight - element.clientHeight;
          element.addEventListener('input', (event) => {
            event.target.style.height = 'auto'
            event.target.style.height = event.target.scrollHeight + offset + 'px';
          })
          element.removeAttribute('data-autoresize')
        })
    }

    getTimelineData() {
        fetch(`${PROXY_URL}/api/getTimelineData.php?application=${this.props.applicationId}&token=${Profile.token}`)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result)
                this.setState({timelineSteps: result.timeline})
                //console.log(this.state.timelineSteps)
                this.addAutoResize()
            },
            // Catch errors
            (error) => {
                console.error(error)
            }
        )
    }

    //Change the state of the text
    onChangeText = (_event) => {
        const textId = _event.currentTarget.dataset.id
        const lastArray = this.state.timelineSteps
        lastArray[textId].text = _event.target.value

        this.setState({
            timelineStep: lastArray
        })

        //Get when the use is not writing
        if(this.timeout) clearTimeout(this.timeout)
        
        this.timeout = setTimeout(() => {
            this.saveText(textId)
        }, 1500)
    }

    saveText(_textId) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ token: Profile.token, timelineStep: this.state.timelineSteps[_textId].id, text: this.state.timelineSteps[_textId].text})
        }

        fetch(`${PROXY_URL}/api/updateTimelineText.php`, requestOptions)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            if(data.status == 'success') {
                toastr.success('Les commentaires ont été sauvegardés.')
            } else {
                console.error(data.status_message)
            }
        })
        .catch(err => console.error("Error:", err))      
    }

    render() {
        return (
            <div className="card card-timeline">
                <div className="card-header border-transparent">
                    <h3 className="card-title">Timeline de vos démarches</h3>
                    <div className="card-tools">
                        <AddTimelineStepModal applicationId={this.props.applicationId} getTimelineData={() => {this.getTimelineData()}}/>
                        <button type="button" className="btn btn-tool" data-toggle="modal" data-target="#modal-add-timeline-step"><i className="fas fa-plus"></i></button>
                    </div>
                </div>

                <div className="card-body">
                    <div className="timeline">
                        
                        {
                            //We map the timelineStep
                            this.state.timelineSteps.map((timelineStep, index) => {

                               
                                return(
                                    <div key={index}>
                                        <i className={'fas fa-envelope bg-' + timelineStep.color } />
                                        <div className="timeline-item">
                                        <span className="time"><i className="fas fa-clock" /> {timelineStep.date}</span>
                                        <h3 className="timeline-header">{timelineStep.title}</h3>
                                        
                                        <div className="timeline-body">
                                            <textarea value={timelineStep.text} onChange={this.onChangeText} data-id={index} className="timeline__step__text" data-autoresize rows="1"/>  
                                        </div>
                                    
                                        {
                                            timelineStep.notifyDate != null ? (
                                                <div className="timeline-footer">
                                                    <a className="btn btn-info btn-xs"><i className="fas fa-clock mr-1" />Rappel le 22 septembre 2020</a>
                                                </div>
                                            ) : (
                                                <div className="timeline-footer">
                                                    <a className="btn btn-secondary btn-xs"><i className="fas fa-plus mr-1" />Ajouter un rappel</a>
                                                </div> 
                                            )
                                        }
                                        </div>
                                    </div>
                                )
                                
                            })
                        }
                        <div>
                            <i className="fas fa-clock bg-gray" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimelineCard
