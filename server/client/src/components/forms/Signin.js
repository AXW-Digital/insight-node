/* eslint-disable */
 
import React, { Component } from 'react';
import {
    FacebookLoginButton,
    GoogleLoginButton,
    TwitterLoginButton,
    LinkedInLoginButton
} from "react-social-login-buttons";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }


    render() {

        const handleGoogleClick = () => {
            window.location = '/auth/google'
        }

        const handleFacebookClick = () => {
            window.location = '/auth/facebook'
        }

        const handleClick = () => {alert('Tämä ominaisuus tulossa pian!')}

        return (
            <div className='container-fluid d-flex vh-100 vw-100 sign-bg m-0 px-0 pb-5'>
                <div className="container signin">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <div className="d-flex flex-row-reverse">
                                        <a
                                            href="/">
                                            <i className="bx bx-exit bx-sm bx-sign"></i>
                                        </a>
                                    </div>
                                    <h5 className="card-title text-center">Kirjaudu</h5>
                                    <form className="form-signin">
                                        {/* <div className="form-label-group">
                                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                                            <label for="inputEmail">Sähköposti</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                            <label for="inputPassword">Salasana</label>
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" for="customCheck1">Muista minut</label>
                                        </div>
                                        <button className="btn btn-lg btn-block text-uppercase btn-login" type="submit">Kirjaudu</button>
                                        <div className='row mt-4 mb-3'>
                                            <div className="col"><hr /></div>
                                            <div className='col align-items-center align-middle my-auto text-nowrap alt-sign text-center'>tai kirjaudu</div>
                                            <div className="col"><hr /></div>
                                        </div> */}
                                        {/* <div className='row justify-content-between ml-xl-4 mr-xl-4 ml-0 mr-0'>
                                            <a href="/home"> <i className="fab fa-facebook-f btn-some align-items-center justify-content-center"/></a>
                                            <a href="/auth/google"> <i  className="fab fa-google btn-some align-items-center justify-content-center"/></a>
                                            <a href="/home"> <i  className="fab fa-linkedin btn-some align-items-center justify-content-center"/></a>
                                            <a href="/home"> <i  className="fab fa-twitter btn-some align-items-center justify-content-center"/></a>
                                        </div> */}
                                        <FacebookLoginButton onClick={handleFacebookClick} className='my-2' />
                                        <GoogleLoginButton onClick={handleGoogleClick} className='my-2'/>
                                        <TwitterLoginButton onClick={handleClick} className='my-2'/>
                                        <LinkedInLoginButton onClick={handleClick} className='my-2'/>
                                        <hr className='my-4' />
                                        <div className='row mt-1'>
                                            <div className='col text-center text-nowrap'>Ei käyttäjätunnusta?</div>
                                            <div className='col text-center'>
                                                <a href='/signup' className='link-primary'>Rekisteröidy</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Signin;