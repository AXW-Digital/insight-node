import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SliderDist, SliderPrice } from '../parts/RangeSlider'

class SettingsCard extends Component {
    render() {
        return (
            <div>
                <div className="card profile-card my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">{this.props.cardTitle}</h5>

                        <Tabs defaultActiveKey="home" id="settings-tabs" variant='pills' className='blue'>
                            <Tab eventKey="home" title="Profiili">
                                <div className="tab-pane body active" id="profile-tab">
                                    <div className='row clearfix'>
                                        <div className='col-12 setting-col'>
                                            <small className="text-muted"> Menutestit </small>
                                            <hr />
                                        </div>
                                        <div className='col-12 '>
                                            <SliderDist />
                                        </div>
                                        <div className='col-12 '>
                                            <SliderPrice />
                                        </div>
                                        <div className='col-12 setting-col'>
                                            <small className="text-muted"> Sähköposti-ilmoitukset </small>
                                            <hr />
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" className="custom-control-input" id="checkMail" />
                                                <label className="custom-control-label" for="checkMail">Menutestit</label>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" className="custom-control-input" id="checkMailKysely" />
                                                <label className="custom-control-label" for="checkMailKysely">Kyselyt</label>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" className="custom-control-input" id="checkMailNews" />
                                                <label className="custom-control-label" for="checkMailNews">Newsletter</label>
                                            </div>
                                        </div>
                                        <div className='col-12 setting-col-n'>
                                            <hr />
                                        </div>
                                        <div className='col-md-3 ml-auto'>
                                            <a href="/signin" class="btn btn-lg btn-block text-uppercase btn-update-settings">Päivitä</a>
                                        </div>

                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="info" title="Tiedot">
                                <div className="tab-pane body active" id="info-tab">
                                    <div className='row clearfix'>
                                        <div className='col-12 setting-col'>
                                            <small className="text-muted ">Perustiedot: </small>
                                            <hr />
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input type="text" id="inputForeName" className="form-control" placeholder="." />
                                                <label htmlFor="inputForeName">Etunimi</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input type="text" id="inputSurName" className="form-control" placeholder="." />
                                                <label htmlFor="inputSurName">Sukunimi</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input type="text" id="inputEmail" className="form-control" placeholder="." />
                                                <label htmlFor="inputEmail">Sähköposti</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input type="text" id="inputPhoneNumber" className="form-control" placeholder="." />
                                                <label htmlFor="inputPhoneNumber">Puhelinmuero</label>
                                            </div>
                                        </div>
                                        <div className='col-12 setting-col-n'>
                                            <small className="text-muted setting-col-n">Paikkatiedot: </small>
                                            <hr />
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input type="text" id="inputAddress" className="form-control" placeholder="." />
                                                <label htmlFor="inputAddress">Osoite</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-2 col-md-12'>
                                            <div className="form-label-group">
                                                <input type="text" id="inputAddrNum" className="form-control" placeholder="." />
                                                <label htmlFor="inputAddrNum">Numero</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-4 col-md-12'>
                                            <div className="form-label-group">
                                                <input type="text" id="inputCity" className="form-control" placeholder="." />
                                                <label htmlFor="inputCity">Paikkakunta</label>
                                            </div>
                                        </div>
                                        <div className='col-md-3 ml-auto mt-3'>
                                            <a href="/signin" class="btn btn-lg btn-block text-uppercase btn-update-settings">Päivitä</a>
                                        </div>

                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="security" title="Turvallisuus">
                                <div className="tab-pane body active" id="security-tab">
                                    <div className='row clearfix'>
                                        <div className='col-12 setting-col'>
                                            <small className="text-muted ">Salasanhallinta: </small>
                                            <hr />
                                        </div>
                                        <div className='col-12'>
                                            <div className="form-label-group">
                                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                                <label for="inputPassword">Nykyinen salasana</label>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="form-label-group">
                                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                                <label for="inputPassword">Uusi salasana</label>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="form-label-group">
                                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                                <label for="inputPassword">Salasana uudelleen</label>
                                            </div>
                                        </div>
                                        <div className='col-md-3 mb-3 ml-auto mt-3'>
                                            <a href="/signin" class="btn btn-lg btn-block text-uppercase btn-update-settings">Päivitä</a>
                                        </div>
                                        <div className='col-12 setting-col'>
                                            <small className="text-muted ">Käyttäjähallinta: </small>
                                            <hr />
                                        </div>
                                        <div className='col-md-9'>
                                            <div className="form-label-group">
                                                <div className='font-weight-bold'>
                                                    Poista käyttäjä
                                                </div>
                                                Jos poistat käyttäjän, et voi enää palata ja menetät kaikki kertyneet kupongit ja bonukset
                                            </div>
                                        </div>
                                        <div className = 'col-md-3 ml-auto'>
                                        <a href="/signin" class="btn btn-lg btn-block text-uppercase btn-danger">Poista</a>
                                        </div>


                                    </div>
                                </div>
                            </Tab>
                        </Tabs>


                    </div>
                </div>

            </div>
        );
    }
}

export default SettingsCard;