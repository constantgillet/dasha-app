import React, { Component } from 'react'
import { CampainContext } from '../CampainsContext'
import '../../plugins/adminlte.js'
import { Link } from 'react-router-dom'

export class CampainList extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const trees = $('[data-widget="treeview"]')
        trees.Treeview('init') 
    }

    
    
    render() {
        return (
            <ul className="nav nav-treeview">
                <CampainContext.Consumer>
                    {
                        value => value.campains.map((campain, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link"to={`/campain/${campain.id}`}>
                                        <p>{campain.name}</p>
                                    </Link>
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
