import React, { Component } from 'react'

export default class AvatarCard extends Component {
    render() {
        return (
            <div>
               <div className="card profile-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-5 col-md-3 col-12">
                                <div className="profile-image mr-md-auto ml-sm-auto"> <img src="/img/burgerking.jpeg" alt=""/> </div>
                            </div>
                            <div className="col-xl-7 col-md-9 col-12">
                                <h4 className="mt-3 mt-5-sm mb-3 mr-auto"><strong>John</strong> Doe</h4>
                                <span className="job_post">Food enthusiast</span>
                                <p>Helsinki</p>
                            </div>
                                            
                        </div>
                    </div>                    
                </div>
            </div>
        )
    }
}
