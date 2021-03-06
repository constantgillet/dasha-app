import React, { Component } from 'react'
import Auth from '../Auth'
import { CampainContext } from '../CampainsContext'
import { Link } from 'react-router-dom'
import AddCampainModal from '../AddCampainModal'

export class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            errorMessage: null,
            isSending: false
        }

        this.tokenLogin()
    }

    componentDidMount() {
        document.title = 'Se connecter'
    }

    onChangeEmail = (_event) => {

        const emailValue = _event.target.value
        this.setState({email: emailValue})

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(regex.test(emailValue)){
            this.setState({ emailError: null })
        } else {
            this.setState({ emailError: 'Votre email nest pas valide' })
        } 

    }

    onChangePassword = (_event) => {
        const passwordValue = _event.target.value
        this.setState({password: passwordValue})

        if(passwordValue.length > 5){
            this.setState({ passwordError: null })
        } else {
            this.setState({ passwordError: 'Votre mot de passe est trop court.' })
        }
    }

    onLoginButonClick = () => {

        if(this.state.emailError == null && this.state.passwordError == null && this.state.isSending == false) {

            this.setState({isSending: true})

            Auth.login(this.state.email, this.state.password,

                //Success Callback
                (_campainList) => {

                    this.setState({isSending: false})

                    if(_campainList.length > 0) {
                        this.updateCampain(_campainList)
                        this.props.history.push(`/campain/${_campainList[0].id}`) 
                    } else {
                        $("#modal-add-application-campaign").modal('show')
                    }
                },

                //Error Callback
                (_errorMessage) => {

                    this.setState({isSending: false})

                    this.setState({errorMessage: _errorMessage})
                },
            )
        }
    }
    updateCampain = (campainList) => {
        this.context.replaceCampains(campainList)
    }

    tokenLogin = () => {
        Auth.tokenLogin(

            //Success Callback
            (_campainList) => {

                if(_campainList.length > 0) {
                    this.updateCampain(_campainList)
                    this.props.history.push(`/campain/${_campainList[0].id}`) 
                } else {
                    $("#modal-add-application-campaign").modal('show')
                }
            },

            //Error Callback
            (_errorMessage) => {
                this.setState({errorMessage: _errorMessage})
            },
        )
    }

    render() {
        return (
            <div className="hold-transition login-page">
                <AddCampainModal allowClosing={false}/>
                <div className="login-box">
                    <div className="login-logo">
                        <img src="/dist/img/AdminLTELogo.png" alt="Dasha Logotype" className="brand-image-login"/>
                    </div>
                    {/* /.login-logo */}
                    <div className="card">
                        <div className="card-body login-card-body">
                        <p className="login-box-msg">Se connecter pour accéder à l'outils</p>
                        <form action="../../index3.html" method="post">
                            <div className="input-group mb-3">
                            <input type="email" className={`form-control ${this.state.emailError != null ? "is-invalid" : this.state.email.length > 4 ? "is-valid" : ""}`}
                                value={this.state.email} placeholder="Email" onChange={this.onChangeEmail} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-envelope" />
                                </div>
                            </div>
                            </div>
                            <div className="input-group mb-3">
                            <input type="password" className={`form-control ${this.state.passwordError != null ? "is-invalid" : this.state.password.length > 4 ? "is-valid" : ""}`}
                                value={this.state.password} placeholder="Mot de passe" onChange={this.onChangePassword} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock" />
                                </div>
                            </div>
                            </div>
                            {
                                this.state.errorMessage != null && (
                                    <p className="text-danger">{this.state.errorMessage}</p>
                                )
                            } 
                        </form>
                        <div className="social-auth-links text-center mb-3">
                            <button type="submit" className="btn btn-primary btn-block mb-3" onClick={ this.onLoginButonClick }>Se connecter</button>
                            <p>- OU -</p>
                            <button className="btn btn-block btn-primary linkedin-button">
                            <i className="fab fa-linkedin mr-2" /> Se connecter avec linkedin
                            </button>
                        </div>
                        {/* /.social-auth-links */}
                        <p className="mb-1">
                            <Link to="forgot-password.html">J'ai oublié mon mot de passe</Link>
                        </p>
                        <p className="mb-0">
                            <Link to="/register" className="text-center">Créer un compte</Link>
                        </p>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                </div>
                {/* /.login-box */}
            </div>
        )
    }
}

LoginPage.contextType = CampainContext

export default LoginPage
