import React, { Component } from 'react'

export class Error404Page extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content">
                    <div className="error-page">
                        <h2 className="headline text-primary"> 404</h2>
                        <div className="error-content">
                        <h3><i className="fas fa-exclamation-triangle text-primary" /> La page n'a pas été trouvée !</h3>
                        <p>
                            Le contenu auquel vous essayez d'accéder n'est pas excessible.
                            Vous pouvez <a href="../../index.html">retourner à ma dernière campagne</a> afin d'accéder à vos dernières candidatures.
                        </p>
                        </div>
                        {/* /.error-content */}
                    </div>
                    {/* /.error-page */}
                </section>
            </div>
        )
    }
}

export default Error404Page
