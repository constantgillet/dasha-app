import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        if(this.props.history.location.pathname == '/login' || this.props.history.location.pathname == '/register') {
            return null
        }

        console.log('Footer render')
        
        return (
            <div>
                {/* /.content-wrapper */}
                <footer className="main-footer">
                    <strong>Copyright © 2020 <a href="http://dasha-app.com">dasha-app.com</a>. </strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 0.0.1
                    </div>
                </footer>
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>
                {/* /.control-sidebar */}
            </div>
        )
    }
}
