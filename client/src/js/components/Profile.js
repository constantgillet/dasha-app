class Profile {
    
    constructor() {
        this.fullName = localStorage.getItem('fullName')
        this.email = localStorage.getItem('email')
        this.avatarSource = null
        this.token = localStorage.getItem('token')
    }
    setFullName = (fullName) => {
        localStorage.setItem('fullName', fullName)
        this.fullName = fullName
    }

    setEmail = (email) => {
        localStorage.setItem('email', email)
        this.email = email
    }

    setToken = (token) => {
        localStorage.setItem('token', token)
        this.token = token
    }
}

export default new Profile()