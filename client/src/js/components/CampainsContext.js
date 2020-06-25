import React from 'react'

export const CampainContext = React.createContext()

export class CampainContextProvider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            campains: [],
            replaceCampains: this.replaceCampains
        }
    }

    replaceCampains = (_campains) => {
        this.setState({ campains: _campains })
    }

    render() {
        return (
          <CampainContext.Provider value={this.state}>
            {this.props.children}
          </CampainContext.Provider>
        )
    }
}
