import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../Auth'
import { PROXY_URL } from '../../../config'
import AddCampainModal from '../AddCampainModal'


export class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fullName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            fullNameError: null,
            emailError: null,
            passwordError: null,
            passwordConfirmationError: null
        }
    }

    onChangeFullName = (_event) => {
        const fullNameValue = _event.target.value
        this.setState({fullName: fullNameValue})

        if(fullNameValue.length > 5) {

            if(fullNameValue.length < 25) {
                const regex = /^[A-Za-z0-9 ]+$/

                if(regex.test(fullNameValue)){
                    this.setState({ fullNameError: null })
                } else {
                    this.setState({ fullNameError: 'Votre prénom contient des caractères spéciaux.' })
                } 
            } else {
                this.setState({fullNameError: 'Votre nom et prénoms sont trop longs.'})
            }
        } else {
            this.setState({fullNameError: 'Votre nom et prénoms sont trop courts.'})
        }

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

    onChangePasswordConfirmation = (_event) => {
        const passwordConfirmationValue = _event.target.value
        this.setState({passwordConfirmation: passwordConfirmationValue})

        if(passwordConfirmationValue === this.state.password){
            this.setState({ passwordConfirmationError: null })
        } else {
            this.setState({ passwordConfirmationError: 'Les mots de passe ne correspondent pas' })
        }
    }

    onClickButtonRegister = (_event) => {

        if(this.state.fullName.length > 4 && this.state.email.length > 4 && this.state.password.length > 4 && this.state.passwordConfirmation.length > 4) {
            
            if(this.state.fullNameError == null && this.state.emailError == null && this.state.passwordError == null && this.state.passwordConfirmationError == null) {
                console.log('click')

                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify({ fullName: this.state.fullName, email: this.state.email, password: this.state.password })
                }

                fetch(`${PROXY_URL}/api/register.php`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if(data.status == 'success') {
                        this.login()
                    } else {

                    }
                })
                .catch(err => console.error("Error:", err))
            }
        }
    }

    login = () => {
        Auth.login(this.state.email, this.state.password,

            //Success Callback
            (_campainList) => {
                $("#modal-add-application-campaign").modal('show')
            },
            //Error Callback
            (_errorMessage) => {
                //this.setState({errorMessage: _errorMessage})
            },
        )
    }

    render() {
        return (
            <div className="hold-transition register-page">
                <AddCampainModal allowClosing={false}/>
                <div className="register-box">
                    <div className="register-logo">
                        <img src="/dist/img/AdminLTELogo.png" alt="Dasha Logotype" className="brand-image-login"/>
                    </div>
                    <div className="card">
                        <div className="card-body register-card-body">
                        <p className="login-box-msg">Créer un compte</p>
                        <form action="../../index.html" method="post">
                            <div className="input-group mb-3">
                                <input 
                                    type="text" value={this.state.fullName} 
                                    className={`form-control ${this.state.fullNameError != null ? "is-invalid" : this.state.fullName.length > 4 ? "is-valid" : ""}`}
                                    placeholder="Nom et prénom" onChange={this.onChangeFullName}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                                {
                                    this.state.fullNameError != null && (
                                        <div className="invalid-feedback">
                                            {this.state.fullNameError}
                                        </div>
                                    )
                                } 
                            </div>
                            <div className="input-group mb-3">
                            <input 
                                type="email" value={this.state.email} 
                                className={`form-control ${this.state.emailError != null ? "is-invalid" : this.state.email.length > 4 ? "is-valid" : ""}`}
                                placeholder="Email" onChange={this.onChangeEmail}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                            </div>
                            </div>
                            <div className="input-group mb-3">
                            <input 
                                type="password" value={this.state.password} 
                                className={`form-control ${this.state.passwordError != null ? "is-invalid" : this.state.password.length > 4 ? "is-valid" : ""}`}
                                placeholder="Mot de passe" onChange={this.onChangePassword}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock" />
                                </div>
                            </div>
                            </div>
                            <div className="input-group mb-3">
                            <input 
                                type="password" value={this.state.passwordConfirmation} 
                                className={`form-control ${this.state.passwordConfirmationError != null ? "is-invalid" : this.state.passwordConfirmation.length > 1 ? "is-valid" : ""}`}
                                placeholder="Mot de passe" onChange={this.onChangePasswordConfirmation}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock" />
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                                <label htmlFor="agreeTerms">
                                    J'accepte les <a href="fakeUrl">Conditions</a>
                                </label>
                                </div>
                            </div>
                            {/* /.col */}
                            </div>
                        </form>
                        <div className="social-auth-links text-center">
                            <button type="submit" className="btn btn-primary btn-block mb-3" onClick={ this.onClickButtonRegister }>S'enregistrer</button>
                            <p>- OU -</p>
                            <a href="fakeUrl" className="btn btn-block btn-primary linkedin-button">
                            <i className="fab fa-linkedin mr-2" />
                                Se connecter avec linkedin
                            </a>
                        </div>
                        <Link to="/login" className="text-center">J'ai déjà un compte</Link>
                        </div>
                        {/* /.form-box */}
                    </div>{/* /.card */}
                </div>
        </div>
        )
    }
}

export default RegisterPage
