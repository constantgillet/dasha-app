import React, { Component } from 'react'
import Auth from '../Auth'
import toastr from 'toastr'
import { Redirect } from 'react-router-dom'

export class ButtonLogout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navicateToLogin: false
        }
    }

    logout = (_event) => {
        Auth.logout(this.redirect)
        toastr.success('Vous êtes déconnecté(e)')
    }

    redirect = () => {
        this.setState({navicateToLogin: true})
    }
    render() {
        if (this.state.navicateToLogin !== false) {
            return <Redirect to={'/login'} />
        }

        return (
            <button type="button" className="btn btn-primary" onClick={this.logout}><i className="fa fa-sign-out-alt mr-2" /> Se déconnecter</button>
        )
    }
}

export default ButtonLogout
