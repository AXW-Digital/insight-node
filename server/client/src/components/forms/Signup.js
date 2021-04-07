import React, { Component } from 'react';

class Signin extends Component {
    render() {
        return (
            <div className='container-fluid d-flex vh-100 vw-100 sign-bg m-0 px-0 pb-5'>
                <div className="container">
                    <div className="row sign-bg">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <div className="d-flex flex-row-reverse">
                                    <a 
                                    href="/">
                                    <i className="bx bx-exit bx-sm bx-sign"></i>
                                    </a>
                                    </div>
                                    <h5 className="card-title text-center">Rekisteröidy</h5>
                                    <form className="form-signin">
                                        <div className="form-label-group">
                                            <input type="text" id="inputName" className="form-control" placeholder="Etunimi" required autofocus />
                                            <label for="inputName">Etunimi</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input type="text" id="inputSName" className="form-control" placeholder="Sukunimi" required autofocus />
                                            <label for="inputSName">Sukunimi</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                                            <label for="inputEmail">Sähköposti</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                            <label for="inputPassword">Salasana</label>
                                        </div>


                                        <button className="btn btn-lg btn-block text-uppercase btn-login mt-5" type="submit">Rekisteröidy</button>
                                        <div className='row mt-4 mb-3'>
                                            <div className="col"><hr /></div>
                                            <div className='col align-items-center align-middle my-auto text-nowrap alt-sign text-center'>tai rekisteröidy</div>
                                            <div className="col"><hr /></div>
                                        </div>
                                        <div className='row justify-content-between ml-xl-4 mr-xl-4 ml-2 mr-2'>
                                        <a href="/home"> <i className="fab fa-facebook-f btn-some align-items-center justify-content-center"/></a>
                                        <a href="/home"> <i  className="fab fa-google btn-some align-items-center justify-content-center"/></a>
                                        <a href="/home"> <i  className="fab fa-linkedin btn-some align-items-center justify-content-center"/></a>
                                        <a href="/home"> <i  className="fab fa-twitter btn-some align-items-center justify-content-center"/></a>
                                        </div>
                                        <hr className='my-4' />
                                        <div className='row mt-1'>
                                            <div className='col text-center text-nowrap'>Oletko jo käyttäjä?</div>
                                            <div className='col text-center'>
                                                <a href='/home' className='link-primary'>Kirjaudu</a>
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