import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './Auth'
import { CampainContext } from './CampainsContext'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const campainContext = useContext(CampainContext)

    console.log(campainContext)

    return (
        <Route 
            {...rest}
            render={props => {
                if(Auth.isAuthenticated()) {
                    return <Component {...props}/> 
                } else {

                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }               
            }}
        />
    )
}