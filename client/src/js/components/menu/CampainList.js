import React, { Component } from 'react'
import { CampainContext } from '../CampainsContext';

export class CampainList extends Component {
    constructor(props){
        super(props)
    }

    componentDidUpdate() {
        console.log($)
    }

    
    render() {
        return (
            <ul className="nav nav-treeview">
                <CampainContext.Consumer>
                    {
                        value => value.campains.map((campain, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <a href="/campainPage" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>{campain.name}</p>
                                    </a>
                                </li>
                            )
                        })
                    }
                </CampainContext.Consumer>
            </ul>
        )
    }
}

export default CampainList
