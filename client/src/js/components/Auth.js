import Profile from './Profile'
import { PROXY_URL } from '../../config'

class Auth {
    constructor() {
        this.authenticated = false
        this.checkLoginInterval = null
        this.popup = null
    }

    getURL = () => {
        const redirectUri = `/login`
        const linkedInAuthenLink = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'clientId'}&redirect_uri=${window.location.origin + redirectUri}`
    }

    login = (_email, _password, callbackSuccess, callbackError, updateCampain) => {

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ email: _email, password: _password})
        }

        fetch(`${PROXY_URL}/api/login.php`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data.status === 'success'){
                this.authenticated = true
                Profile.setEmail(data.email)
                Profile.setFullName(data.fullName)
                Profile.setToken(data.token)
                callbackSuccess(data.campains)
            } else {
                callbackError(data.status_message)
            }  
        })
        .catch(err => console.error("Error:", err))
    }

    //To log if the user has a token
    tokenLogin = (callbackSuccess, callbackError) => {

        if (Profile.token !== null) {
        
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({ token: Profile.token})
            }

            fetch(`${PROXY_URL}/api/tokenLogin.php`, requestOptions)
            .then(res => res.json())
            .then(data => {

                if(data.status === 'success'){
                    this.authenticated = true
                    Profile.setEmail(data.email)
                    Profile.setFullName(data.fullName)
                    Profile.setToken(data.token)
                    callbackSuccess(data.campains)
                } else {
                    Profile.removeToken()
                    callbackError(data.status_message)
                }  
            })
            .catch(err => console.error("Error:", err))
        }
    }

    loginLinkedin = (callback) => {
        console.log(this.popup)

        if(this.popup != null) {
            this.popup.close()
        }

        this.popup = window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${ 'hqzhd' }&redirect_uri=${'redirectUri'}`, '_blank', 'width=600,height=600')

        window.removeEventListener('message', this.receiveMessage, false)
        window.addEventListener('message', this.receiveMessage, false)

        // this.authenticated = true
        // this.checkLoginInterval = window.setInterval(this.checkLogin, 3000)
        // callback()
    }

    logout = (callback) => {
        this.authenticated = false
        
        Profile.destroyProfile()
  
        callback()       
    }

    isAuthenticated() {
        return this.authenticated
    }

    checkLogin() {
        fetch('/api/checkLogin')
        .then(res => res.json())
        .then(data => {
            if(data.response == true) {
                this.authenticated = true
            } else {
                this.authenticated = false
            }
        },
        (error) => {     
           console.error(error)       
        })
    }
}

export default new Auth()